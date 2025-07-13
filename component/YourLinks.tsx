"use client";

import { useEffect, useState } from "react";

type Link = {
  id: string;
  title: string;
  url: string;
};

type User = {
  id: string;
  name: string;
  bio: string;
  links: Link[];
};


export default function YourLinks() {
  const [user, setUser] = useState<User | null>();

  function getPlatformIcon(url: string) {
    if(url.includes("github.com")) {
      return "/github.svg"
    }
    else if(url.includes("x.com")) {
      return "/x.svg"
    }
    else if(url.includes("linkedin.com")) {
      return "/linkedin.svg"
    }
    else if(url.includes("medium.com")) {
      return "/medium.svg"
    }
    else if(url.includes("discord.com")) {
      return "/discord.svg"
    }
  }

  function getUrlTitle(url: string) {
    if(url.includes("github.com")) {
      return "Check out my projects on GitHub"
    }
    else if(url.includes("x.com")) {
      return "Follow me on X"
    }
    else if(url.includes("linkedin.com")) {
      return "Connect with me on LinkedIn"
    }
    else if(url.includes("medium.com")) {
      return "Read my blogs on Medium"
    }
    else if(url.includes("discord.com")) {
      return "Join my Discord community"
    }
  }

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("/api/auth/page-data");

      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="bg-gradient-to-b from-purple-100 via-white to-blue-100 flex flex-col justify-center items-center min-h-screen font-sans">
      <div className="rounded-full w-28 h-28 mb-4 border-1 border-purple-300 shadow-lg">
        <img
          src="/profile.svg"
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="text-gray-700 text-lg font-bold">{user && user.name}</div>
      <div className="text-gray-600 text-sm font-bold mb-5">
        {user && user.bio}
      </div>
      {user?.links.map((link) => (
        <a
          key={link.id}
          href={link.url}
          target="_blank"
          className="flex items-center bg-white border border-gray-400 rounded-xl shadow-sm w-full max-w-md p-2 mb-4 hover:bg-purple-100"
        >
          <div className="h-10 w-10">
            <img src={getPlatformIcon(link.url)} alt="Platform icon"></img>
          </div>
          <div className="text-black text-center w-full">
            {getUrlTitle(link.url)}
          </div>
        </a>
      ))}
    </div>
  );
}
