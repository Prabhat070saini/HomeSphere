import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function About() {
  const currentUser = useSelector((state) => state.user.currentUser);

  return <div>{currentUser.email}</div>;
}
