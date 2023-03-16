import React, { useState } from "react";
import HomeLayout from "../../layouts/HomeLayout";
import axios from "axios";

const SignUp = () => {
  const url = `/register`;
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  function submit(e) {
    e.preventDefault();
    axios
      .post(
        url,
        {
          name: data.name,
          email: data.email,
          password: data.password,
        },
        {
          headers: {
            "X-Authorization":
              "CxD6Am0jGol8Bh21ZjB9Gjbm3jyI9w4ZeHJAmYHdfdP4bCClNn7euVxXcGm1dvYs",
          },
        }
      )

      .then((res) => {
        console.log(res.data);
        alert(res.data.message);
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
        <div className="container" style={{ marginTop: "10rem" }}>
          <form onSubmit={(e) => submit(e)}>
            <input
              onChange={(e) => handle(e)}
              id="name"
              value={data.name}
              placeholder="Enter Your Name"
            ></input>
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
            <input
              onChange={(e) => handle(e)}
              placeholder="Conform Password"
            ></input>
            <button className="btn">submit</button>
          </form>
        </div>
      </HomeLayout>
    </>
  );
};

export default SignUp;
