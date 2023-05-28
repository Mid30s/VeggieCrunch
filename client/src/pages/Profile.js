import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../utils/queries";
import Auth from "../utils/auth";

const Profile = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const loggedInUser = Auth.getProfile();
    if (loggedInUser) {
      setUserId(loggedInUser._id);
      console.log("Logged in user:", loggedInUser); // log the entire user data
    }
  }, []);

  const { loading, error, data } = useQuery(GET_USER, {
    variables: { userId },
    skip: !userId, // skip the query if userId is not set yet
  });

  console.log("Loading:", loading);
  console.log("Error:", error);
  console.log("Data:", data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data?.user) return <p>No user found</p>;

  return (
    <div>
      <h1>Profile</h1>
      <h2>{data.user.username}'s Profile</h2>
      <p>Email: {data.user.email}</p>
      <p>Role: {data.user.role}</p>
      <p>Full Name: {data.user.fullName}</p>
      <p>Address: {data.user.address}</p>
      <p>Phone: {data.user.phone}</p>
    </div>
  );
};

export default Profile;
