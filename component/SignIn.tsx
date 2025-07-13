"use client"

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      const result = await signIn("credentials", { 
        email, 
        password, 
        callbackUrl: "/profile",
        redirect: true,
      });
      
      if (result?.error) {
        setError("Sign in failed after registration");
      }
    } else {
      const data = await res.json();
      setError(data.error || "Sign up failed");
    }
  };

  return (
    <div className="bg-gray-50 flex flex-col items-center justify-center min-h-screen font-sans">
      <div className="text-4xl font-bold text-center text-black mb-10">
        Create your account
      </div>
      <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-md">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Email address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border-2 border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-500 text-black"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            ></input>
          </div>
          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full border-2 border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-500 text-black"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            ></input>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </form>
        {error && <div className="text-red-600"> { error } </div>}

        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300" />
          <div className="mx-3 text-gray-500 text-sm">Or continue with</div>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <button className="w-full flex items-center justify-center border border-gray-300 py-2 rounded-md  hover:bg-gray-100 transition"
        onClick={() => signIn("google", { callbackUrl: "/profile" })}>
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="Google"
            className="w-5 h-6 mr-2"
          />
          <div className="text-gray-500"> Sign up with Google</div>
        </button>
      </div>
    </div>
  );
}
