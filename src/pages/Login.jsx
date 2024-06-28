import { Form, Link, useActionData } from "react-router-dom";

//components
import { FormInput } from "../components";

import { useLogin } from "../hooks/useLogin";
import { useEffect } from "react";

export const action = async ({ request }) => {
  let formData = await request.formData();
  let email = formData.get("email");
  let password = formData.get("password");

  return { email, password };
};

function Login() {
  const userData = useActionData();
  const { signInWithEmail, isPending } = useLogin();

  useEffect(() => {
    if (userData) {
      signInWithEmail(userData);
    }
  }, [userData]);
  return (
    <div className="grid place-items-center min-h-screen">
      <Form
        method="post"
        className="flex flex-col items-center gap-4 card bg-base-100 w-96 shadow-xl p-5"
      >
        <h1 className="text-4xl font-semibold">Login</h1>
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
          Do you not have accout yet?{" "}
          <Link className="link link-primary" to="/register">
            Register
          </Link>
        </div>
      </Form>
    </div>
  );
}

export default Login;
