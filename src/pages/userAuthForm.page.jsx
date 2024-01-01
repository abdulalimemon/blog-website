import { useRef } from "react";
import InputBox from "../components/input.component";
import googleIcon from "../imgs/google.png";
import { Link } from "react-router-dom";
import AnimationWrapper from "../common/page-animation";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";

const UserAuthForm = ({ type }) => {
  const authForm = useRef();

  const userAuthThroughServer = (serverRoute, formData) => {
    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + serverRoute, formData)
      .then(({ data }) => {
        
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let serverRoute = (type = "sign-in" ? "/signin" : "/signup");

    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

    // form Data
    let form = new FormData(authForm.current);
    let formData = {};

    for (let [key, value] of form.entries()) {
      formData[key] = value;
    }

    let { fullname, email, password } = formData;

    // validating form data

    if (fullname) {
      if (fullname.length < 3) {
        return toast.error("Full name must be 3 letter long.");
      }
    }

    if (!email.length) {
      return toast.error("Enter email");
    }

    if (!emailRegex.test(email)) {
      return toast.error("Email is invalid.");
    }

    if (!passwordRegex.test(password)) {
      return toast.error(
        "Password should be 6 to 20 character long with a numeric, 1 lowercase and 1 uppercase letters."
      );
    }

    userAuthThroughServer(serverRoute, formData);
  };
  return (
    <>
      <AnimationWrapper keyValue={type}>
        <section className="h-cover flex items-center justify-center ">
          <Toaster />
          <form className="w-[90%] max-w-[400px]" ref={authForm}>
            <h2 className="text-4xl font-gelasio capitalize text-center mb-24">
              {type == "sign-in" ? "Welcome Back" : "Join us Today"}
            </h2>

            {type != "sign-in" ? (
              <InputBox
                name="fullname"
                type="text"
                id=""
                placeholder="Full Name"
                icon="fi-rr-user"
              />
            ) : (
              ""
            )}

            <InputBox
              name="email"
              type="email"
              id=""
              placeholder="Email"
              icon="fi-rr-envelope"
            />

            <InputBox
              name="password"
              type="password"
              id=""
              placeholder="Password"
              icon="fi-rr-fingerprint"
            />

            <button
              className="btn-dark center mt-14 w-full"
              type="submit"
              onClick={handleSubmit}
            >
              {type == "sign-in" ? "Sign In" : "Sign Up"}
            </button>

            <div className=" relative w-full flex items-center gap-2 my-10 uppercase text-black font-bold">
              <hr className="w-1/2 border-black opacity-10" />
              <p className="text-black opacity-40">or</p>
              <hr className="w-1/2 border-black opacity-10" />
            </div>

            <button className="btn-dark w-full flex items-center justify-center gap-5 ">
              <img
                src={googleIcon}
                alt="continue with google"
                className="w-5"
              />
              continue with google
            </button>

            {type == "sign-in" ? (
              <p className="mt-6 text-dark-grey text-xl text-center">
                Dont have an account?{" "}
                <Link
                  to="/signup"
                  className=" underline text-black text-xl ml-1"
                >
                  Join us today.
                </Link>
              </p>
            ) : (
              <p className="mt-6 text-dark-grey text-xl text-center">
                Already a member?{" "}
                <Link
                  to="/signin"
                  className=" underline text-black text-xl ml-1"
                >
                  Sign in here.
                </Link>
              </p>
            )}
          </form>
        </section>
      </AnimationWrapper>
    </>
  );
};

export default UserAuthForm;
