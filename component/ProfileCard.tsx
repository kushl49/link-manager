"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddProfileDetails() {
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");

  const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted!"); // Debug log
    
    const res = await fetch("api/auth/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ displayName, bio }),
    });

    if (res.ok) {
      console.log("Success! Redirecting..."); // Debug log
      router.push("/add-links");
    } else {
      const data = await res.json();
      console.error(data.error);
    }
  };

  return (
    <div className="bg-gradient-to-b from-purple-100 via-white to-blue-100 flex flex-col items-center justify-center font-sans min-h-screen">
      <div className="text-5xl font-bold text-black mb-10">
        Add profile details
      </div>
      <div className="rounded-full w-35 h-35 mb-10">
        <img
          src="/profile.svg"
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>
      <form onSubmit={handleSubmit} className="w-110">
        <div>
          <input
            type="text"
            placeholder="Display Name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full border-2 border-gray-300 rounded-md p-2 my-2 placeholder:text-gray-400 text-black"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full border-2 border-gray-300 rounded-md p-2 pb-10 mb-10 placeholder:text-gray-400 text-black"
          />
        </div>
        <button 
          type="submit"
          onClick={() => console.log("Button clicked!")}
          className="w-full bg-purple-700 text-white rounded-3xl py-3 hover:bg-purple-800 transition"
        >
          Continue
        </button>
      </form>
    </div>
  );
}
