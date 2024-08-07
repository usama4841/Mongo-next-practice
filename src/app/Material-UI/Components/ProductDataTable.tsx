/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect, useMemo } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import axios from "axios";
import "@/app/CSS/custom.css";
import SkeletonBodyComponent from "./SkeletonComponent";
import ProductLayout from "./ProductLayout";

interface MediaProps {
  loading?: boolean;
}

const Media = ({ loading = true }: MediaProps) => {
  const [products, setProducts] = useState<any>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProductInfo = async () => {
      try {
        const res = await axios.get("/api/products");
        setProducts(res.data.data);
      } catch (error) {
        console.error("Failed to fetch product information", error);
        setError("Failed to fetch product information");
      }
    };
    getProductInfo();
  }, []);

  const memoizedProducts = useMemo(() => products, [products]);

  return (
    <>
      <Typography gutterBottom variant="h3">
        Products
      </Typography>
      <Grid
        container
        spacing={{ xs: 2, md: 4 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {loading
          ? Array.from(new Array(4)).map((_, index) => (
              <Grid item key={index} xs={12} sm={12} md={3} lg={3}>
                <SkeletonBodyComponent />
              </Grid>
            ))
          : memoizedProducts.length > 0
          ? memoizedProducts.map((product: any) => (
              <Grid
                item
                key={product._id}
                container
                xs={12}
                sm={6}
                md={4}
                lg={3}
                xl={3}
                className="my-1"
              >
                <ProductLayout product={product} />
              </Grid>
            ))
          : null}
        {error && (
          <Typography variant="body1" color="error" align="center">
            {error}
          </Typography>
        )}
      </Grid>
    </>
  );
};

export default function ProductDataTable() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Box sx={{ overflow: "hidden" }}>
        <Media loading={loading} />
      </Box>
    </>
  );
}
