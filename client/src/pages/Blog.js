import React from "react";
import {
  Typography,
  Container,
  Box,
  Grid,
  Card,
  CardContent,
} from "@mui/material";

const BlogPage = () => {
  const blogPosts = [
    {
      title: "Benefits of Eating Vegetables",
      content:
        "Eating vegetables provides essential vitamins, minerals, and fiber. They are low in calories and high in nutrients, making them great for maintaining a healthy weight and reducing the risk of chronic diseases.",
      image: "/images/benefits-of-eating-vegetables.jpg",
    },
    {
      title: "Easy and Delicious Veggie Recipes",
      content:
        "Discover a variety of easy and delicious vegetarian recipes that incorporate a wide range of vegetables. From salads and stir-fries to soups and roasted dishes, there are endless possibilities for creating tasty meals with veggies.",
      image: "/images/veggie-recipes.jpg",
    },
    {
      title: "Tips for Incorporating More Veggies into Your Diet",
      content:
        "If you want to increase your vegetable intake, try incorporating them into your meals in creative ways. You can add veggies to smoothies, make zucchini noodles, or even swap meat with plant-based alternatives in your favorite dishes.",
      image: "/images/incorporating-veggies.jpg",
    },
  ];

  return (
    <Container
      maxWidth="false"
      sx={{
        p: 1,
        m: 0,
        pl: { sm: 0 },
        pr: { sm: 0 },
        background: "linear-gradient(to right, #dad299, #b0dab9)",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", sm: "90%" },
          margin: "auto",
          marginTop: "2%",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            marginBottom: 4,
            textAlign: "center",
            color: "#7E5A44",
          }}
        >
          Healthy Eating Blog
        </Typography>
        <Grid container spacing={4}>
          {blogPosts.map((post, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  boxShadow: 2,
                  transition: "box-shadow 0.3s ease-in-out",
                  "&:hover": {
                    boxShadow: 4,
                  },
                }}
              >
                <img
                  src={process.env.PUBLIC_URL + post.image}
                  alt={post.title}
                  style={{ width: "100%", height: "auto" }}
                />

                <CardContent sx={{ minHeight: 120 }}>
                  <Typography variant="h6" gutterBottom>
                    {post.title}
                  </Typography>
                  <Typography variant="body2">{post.content}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default BlogPage;
