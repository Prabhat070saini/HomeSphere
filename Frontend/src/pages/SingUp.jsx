import React, { useState } from "react";
import { NavLink } from "react-router-dom";
export default function SingUp() {
  const [formData, setFormData] = useState({});
  const handlechange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7"> Sing Up</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            className="border p-3  rounded-lg"
            id="username"
            autoComplete="off"
            onChange={handlechange}
          />
          <input
            autoComplete="off"
            type="email"
            placeholder="Ex@example.com"
            className="border p-3  rounded-lg"
            id="email"
            onChange={handlechange}
          />

          <input
            type="password"
            placeholder="Password"
            className="border p-3  rounded-lg"
            id="password"
            onChange={handlechange}
            width={1000}
          />
          <input
            type="password"
            placeholder="confirm Password"
            className="border p-3  rounded-lg"
            id="confirmPassword"
            onChange={handlechange}
          />

          <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
            SignUp
          </button>
        </div>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have a account?</p>
        <NavLink to="/sing-in">
          <span className="text-blue-500">Singin</span>
        </NavLink>
      </div>
    </div>
  );
}
