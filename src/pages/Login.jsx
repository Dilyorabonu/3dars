//icons
import { IoLogoGoogle, IoIosLogIn } from "react-icons/io";

import { Form, Link, useActionData } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

//components
import { FormInput } from "../components";

import { useLogin } from "../hooks/useLogin";
import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import { useGoogle } from "../hooks/useGoogle";

function themeFromLocalStorage() {
  return localStorage.getItem("theme") || "winter";
}

export const action = async ({ request }) => {
  let formData = await request.formData();
  let email = formData.get("email");
  let password = formData.get("password");

  return { email, password };
};

function Login() {
  const [forgetPassword, setForgetPassword] = useState(true);
  const [errorStatus, setErrorStatus] = useState({
    email: "",
    password: "",
  });

  const userData = useActionData();
  const { signInWithEmail, isPending } = useLogin();

  const [theme, setTheme] = useState(themeFromLocalStorage());

  const handleTheme = () => {
    const newTheme = theme == "winter" ? "dracula" : "winter";
    setTheme(newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    if (userData) {
      const state = userData?.email.trim() && userData.password?.trim();
      if (state) {
        signInWithEmail(userData.email, userData.password);
      }

      if (setForgetPassword && !state) {
        toast.error("Please, enter all of them!");
      }

      if (!userData.email.trim()) {
        setErrorStatus((prev) => {
          return { ...prev, email: "input-error" };
        });
      }

      if (!userData.password?.trim()) {
        setErrorStatus((prev) => {
          return { ...prev, password: "input-error" };
        });
      }

      if (!forgetPassword && userData) {
        sendPasswordResetEmail(auth, userData.email.trim())
          .then(() => {
            toast.success("Link send");
            setForgetPassword(true);
            setErrorStatus({
              email: "",
              password: "",
            });
          })
          .catch((error) => {
            const errorMessage = error.message;
            toast.error(errorMessage);
          });
      }
    }
  }, [userData]);

  let { handleGoogle } = useGoogle();
  return (
    <>
      <video
        autoPlay
        loop
        muted
        className=" bg-cover h-screen absolute -z-10 opacity-70 object-cover w-full "
        src="/bg-registor.mp4"
      ></video>
      <div className="grid">
        <div className="grid place-items-center min-h-screen">
          <Form
            method="post"
            className="flex flex-col items-center gap-4 card bg-base-100 w-96 shadow-xl p-5"
          >
            <h1 className="text-4xl font-semibold">Login</h1>
            <FormInput
              type="email"
              name="email"
              labelText="email"
              status={errorStatus.email}
              placeholder="example@gmail.com"
            />
            {forgetPassword && (
              <FormInput
                type="password"
                name="password"
                labelText="password"
                status={errorStatus.password}
                placeholder="*******"
              />
            )}

            <div className="w-full">
              <div className="text-end">
                <Link
                  onClick={() => setForgetPassword(!forgetPassword)}
                  type="btn"
                  className="link link-secondary"
                >
                  Forgot password?
                </Link>
              </div>
              {!isPending && (
                <button className="my-2 btn btn-secondary btn-block">
                  <IoIosLogIn />
                  {forgetPassword ? "Submit" : "Send link"}
                </button>
              )}
              {isPending && (
                <button disabled className="btn btn-secondary btn-block">
                  <IoIosLogIn />
                  Loading...
                </button>
              )}
              <div class="my-1 border-b text-center">
                <div class="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                  Or sign up with e-mail
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  handleGoogle();
                }}
                className="btn btn-secondary btn-block mt-2"
              >
                <IoLogoGoogle />
                Sign up
              </button>
            </div>
            <div className="text-center">
              Don't have an account?{" "}
              <Link className="link link-secondary" to="/register">
                Register
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

export default Login;
