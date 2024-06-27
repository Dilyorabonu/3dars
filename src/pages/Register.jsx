import { Form, Link, useActionData } from "react-router-dom";

import { useRegister } from "../hooks/useRegister";
import { useEffect } from "react";
import { FormInput } from "../components";

export const loader = async ({ request }) => {
  let formData = await request.formData();
  let email = formData.get("email");
  let password = formData.get("password");
  let displayName = formData.get("displayName");
  let photoURL = formData.get("photoURL");

  return { email, password, displayName, photoURL };
};

function Register() {
  const userData = useActionData();
  const { registerWithEmail, isPending } = useRegister();

  useEffect(() => {
    if (userData) {
      registerWithEmail(
        userData.email,
        userData.password,
        userData.displayName,
        userData.photoURL
      );
    }
  }, [userData]);
  return (
    <div className="grid place-items-center min-h-screen">
      <Form
        method="post"
        className="flex flex-col items-center gap-4 card bg-base-100 w-96 shadow-xl p-5"
      >
        <h1 className="text-4xl font-semibold">Register</h1>
        <FormInput type="text" name="displayName" labelText="displayName" />
        <FormInput type="url" name="PhotoUrl" labelText="PhotoUrl" />
        <FormInput type="email" name="email" labelText="email" />
        <FormInput type="password" name="password" labelText="password" />

        <div className="w-full">
          {!isPending && (
            <button className="btn btn-primary btn-block">Login</button>
          )}
          {isPending && (
            <button disabled className="btn btn-primary btn-block">
              Loading...
            </button>
          )}
        </div>

        <div className="text-center">
          Alredy registered ?{" "}
          <Link className="link link-primary" to="/login">
            Login
          </Link>
        </div>
      </Form>
    </div>
  );
}

export default Register;
