import React from "react";
import toast from "react-hot-toast";
import { Form, useNavigation } from "react-router-dom";


export const action = async ({ request }) => {
   const formData = await request.formData();
   const data = Object.fromEntries(formData);
 console.log(data);
 
   try {
     await customFetch.post("/auth/login", data);
     toast.success("Login successful");
     return redirect("/dashboard");
   } catch (error) {
     toast.error(error?.response?.data?.msg);
     return error;
   }
 };


const Login = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-4 rounded-md shadow-md w-96">
        <h4 className="text-3xl font-bold mb-4 text-center">Login</h4>
        <Form method="post">
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              className="w-full p-2 pl-10 text-sm text-gray-700 border-2 border-slate-400 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              className="w-full p-2 pl-10 text-sm text-gray-700 border-2 border-slate-400 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full"
            disabled={isSubmitting}
          >
            Login
          </button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
