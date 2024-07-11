import moment from "moment";
import { Rating } from "primereact/rating";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { addReviewAsync } from "@/redux/products/productSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import "@/app/globals.css";
import axios from "axios";
import { InputTextarea } from "primereact/inputtextarea";
import ReviewDataTable from "./ReviewComponent/ReviewDataTable";
import { z } from "zod"; // Import Zod
import { Message } from "primereact/message";

interface ReviewComponentProps {
  ProductReview: any;
  setReviewModalOff: () => void;
  setReviewModalOn: () => void;
  setProductReview: (product: any) => void;
  fetchData: () => void;
}

interface ReviewDataTypes {
  rating: number | null;
  comment: string;
  date: Date | string;
  reviewerName: string;
  reviewerEmail: string;
}

const ReviewSchema = z.object({
  rating: z
    .number()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must be at most 5"),
  comment: z.string().min(1, "Comment is required"),
  date: z.date(),
  reviewerName: z.string().min(1, "Reviewer name is required"),
  reviewerEmail: z.string().email("Invalid email address"),
});

const ReviewComponent: React.FC<ReviewComponentProps> = ({
  ProductReview,
  setReviewModalOff,
  setProductReview,
  fetchData,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [UserDetails, setUserDetails] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [newReview, setNewReview] = useState<ReviewDataTypes>({
    rating: null,
    comment: "",
    date: moment().format(),
    reviewerName: "",
    reviewerEmail: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewReview((prevReview: any) => ({
      ...prevReview,
      [name]: value,
    }));
  };

  const handleRatingChange = (e: any) => {
    setNewReview((prevReview: any) => ({
      ...prevReview,
      rating: e.value,
    }));
  };

  const handleAddReview = () => {
    const reviewData = {
      ...newReview,
      date: new Date(),
    };
    const result = ReviewSchema.safeParse(reviewData);

    if (!result.success) {
      const newErrors: { [key: string]: string } = {};
      result.error.errors.forEach((error) => {
        if (error.path.length > 0) {
          newErrors[error.path[0]] = error.message;
        }
      });
      setErrors(newErrors);
      return;
    }
    setErrors({});
    const { reviewerName, reviewerEmail, comment, rating } = result.data;
    const review = {
      reviewerName,
      reviewerEmail,
      comment,
      rating,
      date: new Date(),
    };
    const productId = ProductReview._id;

    if (productId) {
      dispatch(addReviewAsync({ productId, review }))
        .unwrap()
        .then((updatedProduct: any) => {
          console.log("Review added successfully:", updatedProduct);
          setReviewModalOff();
          setNewReview({
            reviewerName: "",
            reviewerEmail: "",
            comment: "",
            rating: null,
            date: new Date(),
          });
          fetchData();
          setProductReview(updatedProduct);
        })
        .catch((error) => {
          console.error("Failed to add review:", error);
        });
    } else {
      console.error("Product ID is not defined");
    }
  };

  useEffect(() => {
    const GetUserCredentials = async () => {
      try {
        const res = await axios.get("/api/admin/me");
        const user = res.data.data;
        setUserDetails(user);
        setNewReview((prevReview) => ({
          ...prevReview,
          reviewerName: user.username,
          reviewerEmail: user.email,
        }));
      } catch (error) {
        console.error("failed to fetch user credentials", error);
      }
    };
    GetUserCredentials();
  }, []);

  console.log("error", errors);
  return (
    <>
      <div className="container" style={{ padding: "10px 25px" }}>
        <strong
          className="mt-2"
          style={{ fontSize: "1.8rem", fontWeight: "600", color: "#1c6ab9" }}
        >
          {ProductReview.name}'s reviews
        </strong>
        <div className="" style={{ display: "flex" }}>
          <div className="mx-2 mt-2" style={{ width: "30%", height: "45%" }}>
            <div
              className="mx-2 my-1"
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <strong>Reviewer's name:</strong>
              <InputText
                variant="filled"
                name="reviewerName"
                placeholder="Your Name"
                value={UserDetails?.username}
                onChange={handleChange}
                className=" mb-3 px-2 py-1"
                style={{ pointerEvents: "none", opacity: "0.5" }}
              />
              {errors.reviewerName && (
                <Message
                  style={{
                    display: "flex",
                    justifyContent: "start",
                    width: "fit-content",
                  }}
                  severity="warn"
                  text={errors.reviewerName}
                />
              )}

              <strong>Reviewer's email:</strong>
              <InputText
                variant="filled"
                name="reviewerEmail"
                placeholder="Your Email"
                value={newReview.reviewerEmail}
                onChange={handleChange}
                className=" mb-3 px-2 py-1"
                style={{ pointerEvents: "none", opacity: "0.5" }}
              />
              {errors.reviewerEmail && (
                <Message
                  style={{
                    display: "flex",
                    justifyContent: "start",
                    width: "fit-content",
                  }}
                  severity="warn"
                  text={errors.reviewerEmail}
                />
              )}

              <strong>Description:</strong>
              <InputTextarea
                name="comment"
                placeholder="Provide description"
                value={newReview.comment || ""}
                onChange={handleChange}
                className=" mb-3 px-2 py-1"
                style={{ height: "8rem" }}
              />
              {errors.comment && (
                <Message
                  style={{
                    display: "flex",
                    justifyContent: "start",
                    width: "fit-content",
                  }}
                  className="text-start"
                  severity="warn"
                  text={errors.comment}
                />
              )}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Rating
                  value={newReview.rating || 0}
                  onChange={handleRatingChange}
                  cancel={false}
                  className="px-2 py-1"
                />
              </div>
              {errors.rating && (
                <Message
                  style={{
                    display: "flex",
                    justifyContent: "start",
                    width: "fit-content",
                  }}
                  severity="warn"
                  text={errors.rating}
                />
              )}
              <Button
                label="Add Review"
                onClick={handleAddReview}
                className=" mt-3 p-2"
                style={{ height: "3rem", borderRadius: "8px" }}
              />
            </div>
          </div>
          <div
            className="mx-2 mt-2"
            style={{ width: "70%", height: "44vh", overflow: "hidden scroll" }}
          >
            <ReviewDataTable ProductReview={ProductReview} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewComponent;
