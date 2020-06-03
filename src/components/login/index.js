import React from "react";
import "./login.css";
import { Input, Button } from "semantic-ui-react";

const Login = () => {
  return (
    <div>
      <div className="text-left text-xl font-semibold mt-4">
        Hello! Log in with your credentials.
      </div>
      <div className="text-left mt-4">
        <div className="my-2">Email address</div>
        <Input className="w-full" placeholder="Email" />
      </div>

      <div className="text-left mt-2">
        <div className="my-2">Password</div>
        <Input className="w-full" type="password" placeholder="*********" />
      </div>

      <div className="mt-4 flex">
        <Button
          className="text-white w-2/5"
          style={{
            backgroundColor: "#a491d3",
          }}
        >
          Log in
        </Button>
      </div>
    </div>
  );
};

export default Login;
