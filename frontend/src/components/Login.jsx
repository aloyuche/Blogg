import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { client } from "../clients";
import { GoogleLogin } from "react-google-login";
import { FcGoogle } from "react-icons/fc";
import { gapi } from "gapi-script";
import Share from "../asset/share.mp4";

const Login = () => {
  const navigate = useNavigate();
  const responseGoogle = (response) => {
    console.log(response);
    localStorage.setItem("user", JSON.stringify(response.profileObj));

    const { name, googleId, imageUrl } = response.profileObj;

    const doc = {
      _id: googleId,
      _type: "user",
      userName: name,
      image: imageUrl,
    };
    client.createIfNotExists(doc).then(() => {
      navigate("/", { replace: true });
    });
  };
  const clientId =
    "419761767609-064i8gul4ua4vhtufjgimpviupantjpc.apps.googleusercontent.com";
  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.auth2.init({ clientId: clientId });
    });
  });
  return (
    <div className="flex items-center justify-start flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          src={Share}
          type="video/mp4"
          loop
          muted
          controls={false}
          autoPlay
          className="w-full h-full object-cover"
        />
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="p-5">
            <img
              src={
                "https://res.cloudinary.com/cheloytec/image/upload/v1665333620/online-shop/MyLogo_rsmioy.png"
              }
              alt="Logo"
              width={"200"}
              height="auto"
            />
          </div>
          <div className="shadow-2xl">
            <GoogleLogin
              render={(renderProps) => (
                <button
                  type="button"
                  className="bg-mainColor flex justify-center items-center p-3 rounded-lg outline-none cursor-pointer"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <FcGoogle className="mr-4" /> Sign in with Google
                </button>
              )}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy="single-host-origin"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
