import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router";


const Protected = ({ children, role = "buyer" }) => {

  const user = useSelector(state => state.auth.user)
  const loading = useSelector(state => state.auth.loading)
  const navigate = useNavigate()

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return <Navigate to="/login" />
  }

  if (user.role !== role) {
    return <Navigate to="/" />
  }

  return children
};

export default Protected;
