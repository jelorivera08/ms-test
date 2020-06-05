import "./index.css";
import React, { useState } from "react";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { Divider, Input, Button, Icon } from "semantic-ui-react";
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
        <div className="text-left text-xl font-bold">Continue with... </div>

        <div className="flex justify-between mt-4">
          <FacebookLogin
            appId="254072025818553"
            disableMobileRedirect={true}
            fields="name,email,picture"
            callback={responseFacebook}
            render={(renderProps) => (
              <button
                className="fb-button flex px-4 py-4 align-center w-1/2 justify-center mr-2 border border-gray-500"
                style={{ height: "2.5rem" }}
                onClick={renderProps.onClick}
              >
                <div>
                  <Icon name="facebook" color="blue" />
                </div>
                <div className="ml-2 font-bold text-black">FACEBOOK</div>
              </button>
            )}
          />

          <GoogleLogin
            className="w-1/2 ml-2 justify-center font-bold border border-gray-500"
            clientId="700376790680-v5ddllfdo7liiat17s5sv7dg5l910bud.apps.googleusercontent.com"
            buttonText={<div className="font-bold text-black"> GOOGLE</div>}
            onSuccess={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
        </div>
        <div className="text-gray-600 text-left text-sm mt-4">
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
            />
          </div>

          <div className="text-left mt-2">
            <div className="my-2">Create password</div>
            <Input
              onChange={(e, { value }) =>
                setCredentials({
                  ...credentials,
                  password: value,
                })
              }
              className="w-full"
              type="password"
            />
          </div>

          {credentials.error && (
            <div className="mt-2 text-left text-xs text-red-500">
              {credentials.error}
            </div>
          )}

          <div className="text-gray-700 text-justify text-xs my-8">
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
