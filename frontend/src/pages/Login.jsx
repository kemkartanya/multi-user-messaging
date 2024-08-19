import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const [userr, setUserr] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setUserr({ ...userr, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/v1/users", userr);
      console.log(data);
      localStorage.setItem("user", JSON.stringify(data));

      if (
        user?.username ||
        data?.username ||
        JSON.parse(localStorage.getItem("user"))?.username
      ) {
        window.location.href = "/inbox";
      }
    } catch (error) {
      console.error(error?.error);
      toast.error(error?.error);
    }
  };

  return (
    <div>
      <div className="text-xl my-12">Let's Chat !!</div>

      <Toaster />

      <form onSubmit={handleLogin} className="flex flex-col gap-6 items-center">
        <label className="input input-bordered flex items-center gap-2">
          Username
          <input
            name="username"
            value={userr?.username}
            type="text"
            onChange={handleChange}
            className="grow"
            placeholder="Daisy"
          />
        </label>

        <label className="input input-bordered flex items-center gap-2">
          Password
          <input
            name="password"
            value={userr?.password}
            type="password"
            onChange={handleChange}
            className="grow"
            placeholder="daisy@site"
          />
        </label>

        <button type="submit" className="btn bg-[#646cffaa] px-12">
          Sign in
        </button>
      </form>
    </div>
  );
};

export default Login;
