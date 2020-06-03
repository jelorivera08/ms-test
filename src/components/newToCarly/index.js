import React, { useState } from "react";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import { Divider, Input, Button } from "semantic-ui-react";
import axios from "axios";
import { API } from "./constants";

export default ({ setTabIndex }) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    error: "",
  });

  const signup = async (credentials) => {
    try {
      const res = await axios.post(API, {
        id: credentials.username,
        pw: credentials.password,
      });

      console.log(res.data.userName);
    } catch (err) {
      setCredentials({ ...credentials, error: err });
    }
  };

  const responseGoogle = (googleUser) => {
    var profile = googleUser.getBasicProfile();

    signup({
      username: profile.getId(),
      password: profile.getEmail() + profile.getId(),
    });
  };

  const responseFacebook = (facebookUser) => {
    signup({
      ...credentials,
      username: facebookUser.userID,
      password: facebookUser.email + facebookUser.userID,
    });
  };

  const handleSubmit = () => {
    if (credentials.username.length <= 0) {
      setCredentials({
        ...credentials,
        error: "Username field is required.",
      });
    } else if (credentials.password.length <= 0) {
      setCredentials({
        ...credentials,
        error: "Password field is required.",
      });
    } else {
      setCredentials({
        ...credentials,
        error: "",
      });

      signup(credentials);
    }
  };

  return (
    <div>
      <div>
        <div className="text-left text-xl font-bold">Sign in with </div>
        <GoogleLogin
          className="w-full justify-center my-4"
          clientId="700376790680-v5ddllfdo7liiat17s5sv7dg5l910bud.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
        <div>
          <FacebookLogin
            icon="fa-facebook"
            appId="254072025818553"
            textButton={<div className="ml-4 capitalize">Login</div>}
            buttonStyle={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
            disableMobileRedirect={true}
            fields="name,email,picture"
            callback={responseFacebook}
          />
        </div>
        <div className="text-gray-500 text-xs mt-4">
          We will never share any of your data or post anything on your behalf
        </div>
        <Divider />
        <div className="text-lg text-left mt-4 font-semibold">
          Or sign up with your email
        </div>

        <div>
          <div className="text-left mt-4">
            <div className="my-2">Email address</div>
            <Input
              onChange={(e, { value }) =>
                setCredentials({
                  ...credentials,
                  username: value,
                })
              }
              className="w-full"
              placeholder="Email"
            />
          </div>

          <div className="text-left mt-2">
            <div className="my-2">Password</div>
            <Input
              onChange={(e, { value }) =>
                setCredentials({
                  ...credentials,
                  password: value,
                })
              }
              className="w-full"
              type="password"
              placeholder="*********"
            />
          </div>

          {credentials.error && (
            <div className="mt-2 text-left text-xs text-red-500">
              {credentials.error}
            </div>
          )}

          <div className="text-gray-500 text-justify text-xs mt-2">
            By signing up, you agree to Carly's website{" "}
            <span
              onClick={() => alert("Terms & Conditions")}
              className="underline text-purple-500 cursor-pointer"
            >
              Terms & Conditions
            </span>{" "}
            and
            <span
              onClick={() => alert("Privacy Policy")}
              className="underline text-purple-500 cursor-pointer"
            >
              {" "}
              Privacy Policy
            </span>
            .
          </div>

          <div className="flex justify-around mt-4 items-center">
            <Button
              onClick={handleSubmit}
              className="text-white w-2/5"
              style={{
                backgroundColor: "#a491d3",
              }}
            >
              Sign up
            </Button>

            <div className="text-sm">
              Already have an account?{" "}
              <span
                onClick={() => setTabIndex(1)}
                className="underline cursor-pointer  text-purple-500 "
              >
                Log in
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
