import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HomeLayout from "../../layouts/HomeLayout";

const SignIn = () => {
  const navigate = useNavigate();

  const url = `/login-email`;
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  function submit(e) {
    e.preventDefault();
    axios
      .post(url, {
        email: data.email,
        password: data.password,
      },{
        headers:{
          'X-Authorization':'CxD6Am0jGol8Bh21ZjB9Gjbm3jyI9w4ZeHJAmYHdfdP4bCClNn7euVxXcGm1dvYs'
        }
      })

      .then((res) => {
        console.log(res.data);

        if (res.data.status === 401) {
          alert(res.data.message);
          navigate("/Signin");
        } else {
          alert("Login Succesfully");
          localStorage.setItem("name", res.data.user?.name);
          localStorage.setItem("email", res.data.user?.email);
          localStorage.setItem("phone", res.data.user?.phone);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("id", res.data.user?.id);
          navigate("/");
        }
      });
  }

  function handle(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
    console.log(newdata);
  }

  return (
    <>
      <HomeLayout>
        <div className="container" style={{ marginTop: "7rem" }}>
          <form onSubmit={(e) => submit(e)}>
            <input
              onChange={(e) => handle(e)}
              id="email"
              value={data.email}
              placeholder="Enter Your Email Id"
            ></input>
            <input
              onChange={(e) => handle(e)}
              id="password"
              value={data.password}
              placeholder="Enter Your Password"
            ></input>
            <button
              className="btn"
              style={{
                backgroundColor: "#FE9E2D",
                color: "#ffffff",
                padding: "0.6rem",
              }}
            >
              Submit
            </button>
          </form>
        </div>
      </HomeLayout>
    </>
  );
};

export default SignIn;
