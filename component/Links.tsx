"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Links() {
  const { data: session } = useSession();
  const router = useRouter();
  const [urls, setUrls] = useState(["", "", "", "", ""]);
  const [error, setError] = useState("");

  const handleChange = (index: number, value: string) => {
    const newUrls = [...urls];
    newUrls[index] = value;
    setUrls(newUrls);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ urls }),
      });

      if (res.ok) {
        router.push("/final-page");
      } else {
        const data = await res.json();
        setError(data.error || "Failed to save links");
      }
    } catch (e) {
      setError("Something went wrong");
      console.log(e);
    }
  };

  return (
    <div className="bg-gradient-to-b from-purple-100 via-white to-blue-100 flex flex-col justify-center items-center min-h-screen font-sans">
      <div className="w-full max-w-md">
        <h2 className="text-black font-bold text-5xl mb-10 text-center">
          Add your links
        </h2>

        <form onSubmit={handleSubmit}>
          {urls.map((url, index) => (
            <div key={index} className="flex items-center w-full mb-4">
              <div className="border-2 border-gray-300 rounded-xl p-3 mr-3 flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill=""
                  className="size-6"
                >
                  <path
                    fill-rule="evenodd"
                    d="M19.902 4.098a3.75 3.75 0 0 0-5.304 0l-4.5 4.5a3.75 3.75 0 0 0 1.035 6.037.75.75 0 0 1-.646 1.353 5.25 5.25 0 0 1-1.449-8.45l4.5-4.5a5.25 5.25 0 1 1 7.424 7.424l-1.757 1.757a.75.75 0 1 1-1.06-1.06l1.757-1.757a3.75 3.75 0 0 0 0-5.304Zm-7.389 4.267a.75.75 0 0 1 1-.353 5.25 5.25 0 0 1 1.449 8.45l-4.5 4.5a5.25 5.25 0 1 1-7.424-7.424l1.757-1.757a.75.75 0 1 1 1.06 1.06l-1.757 1.757a3.75 3.75 0 1 0 5.304 5.304l4.5-4.5a3.75 3.75 0 0 0-1.035-6.037.75.75 0 0 1-.354-1Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <input
                type="url"
                placeholder="url"
                value={url}
                onChange={(e) => handleChange(index, e.target.value)}
                className="border-2 rounded-lg border-gray-300 p-3 placeholder:text-gray-400 text-black w-full"
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full mt-7 bg-purple-700 text-white font-semibold rounded-3xl py-3 hover:bg-purple-800 transition"
          >
            Continue
          </button>

          {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
        </form>
      </div>
    </div>
  );
}
