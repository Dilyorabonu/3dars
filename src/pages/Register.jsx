import { Form, Link, useActionData } from "react-router-dom";

import { useRegister } from "../hooks/useRegister";
import { useEffect, useState } from "react";
import { FormInput } from "../components";

import toast from "react-hot-toast";

export const action = async ({ request }) => {
  let formData = await request.formData();
  let email = formData.get("email");
  let password = formData.get("password");
  let displayName = formData.get("displayName");
  let photoURL = formData.get("photoURL");

  return { email, password, displayName, photoURL };
};

function Register() {
  const [errorStatus, setErrorStatus] = useState({
    name: "",
    photoURL: "",
    email: "",
    password: "",
  });

  const userData = useActionData();
  const { registerWithEmail, isPending } = useRegister();

  useEffect(() => {
    if (userData) {

      if (
        userData.displayName &&
        userData.email &&
        userData.password &&
        userData.photoURL
      ) {
        registerWithEmail(userData);
      } else {
        toast.error("Please, enter all of them!");
      }

      if (userData.displayName == "") {
        setErrorStatus((prev) => {
          return { ...prev, name: "input-error" };
        });
      } else {
        setErrorStatus((prev) => {
          return { ...prev, name: "" };
        });
      }

      if (userData.password == "") {
        setErrorStatus((prev) => {
          return { ...prev, password: "input-error" };
        });
      } else {
        setErrorStatus((prev) => {
          return { ...prev, password: "" };
        });
      }

      if (userData.photoURL == "") {
        setErrorStatus((prev) => {
          return { ...prev, photoURL: "input-error" };
        });
      } else {
        setErrorStatus((prev) => {
          return { ...prev, photoURL: "" };
        });
      }

      if (userData.email == "") {
        setErrorStatus((prev) => {
          return { ...prev, email: "input-error" };
        });
      } else {
        setErrorStatus((prev) => {
          return { ...prev, email: "" };
        });
      }
    }
  }, [userData]);
  return (
    <div className="grid place-items-center min-h-screen">
      <Form
        method="post"
        className="flex flex-col items-center gap-4 card bg-base-100 w-96 shadow-xl p-5"
      >
        <h1 className="text-4xl font-semibold">Register</h1>
        <FormInput
          type="text"
          name="displayName"
          labelText="displayName"
          error={errorStatus.name}
        />
        <FormInput
          type="url"
          name="photoURL"
          labelText="PhotoUrl"
          error={errorStatus.photoURL}
        />
        <FormInput
          type="email"
          name="email"
          labelText="email"
          error={errorStatus.email}
        />
        <FormInput
          type="password"
          name="password"
          labelText="password"
          error={errorStatus.password}
        />

        <div className="w-full">
          {!isPending && (
            <button className="btn btn-primary btn-block">Submit</button>
          )}
          {isPending && (
            <button disabled className="btn btn-primary btn-block">
              Loading...
            </button>
          )}
        </div>

        <div className="text-center">
          Alredy registered?{" "}
          <Link className="link link-primary" to="/login">
            Login
          </Link>
        </div>
      </Form>
    </div>
  );
}

export default Register;
