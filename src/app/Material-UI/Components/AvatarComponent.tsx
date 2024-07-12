import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import { UserTypes } from '@/app/common/UserFormData';
import axios from 'axios';
import { blue, deepOrange, green } from '@mui/material/colors';

export default function AvatarComponent() {
  const [Products, setProducts] = React.useState<UserTypes[]>([]);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const getProductInfo = async () => {
      try {
        const res = await axios.get("/api/products");
        console.log(res);
        console.log(res.data.data);
        setProducts(res.data.data);
        console.log("product", Products);
      } catch (error) {
        console.error("Failed to fetch product information", error);
        setError("Failed to fetch product information");
      }
    };
    getProductInfo();
  }, []);
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
      <AvatarGroup total={Products.length}>
        {Products.map((product, index) => (
      <Avatar key={index}  sx={{ bgcolor: blue[500] }}  alt={product.name} src={product.image} />
        ))}
    </AvatarGroup>
    </Box>
  );
}