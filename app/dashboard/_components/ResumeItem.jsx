"use client";

import { useUser } from "@clerk/nextjs";
import { Notebook } from "lucide-react";
import Link from "next/link";
import React from "react";

const ResumeItem = ({ resume }) => {
  const { user } = useUser();
  return (
    <Link href={`/dashboard/resume/${resume.resumeId}/edit`}>
      <div
        className="p-14 bg-gradient-to-b from-pink-100 via-purple-200 to-blue-200 flex items-center justify-center rounded-lg border-t-4 hover:shadow-md shadow-primary mt-10 min-h-[280px] max-h-[280px] sm:min-w-[220px] sm:max-w-[220px] min-w-full hover:scale-105 transition-all cursor-pointer relative"
        style={{ borderColor: resume?.themeColor }}
      >
        <p className="text-xs absolute top-3 right-3 w-38 bg-white/50 backdrop-blur-sm backdrop-filter overflow-hidden rounded-lg px-1 py-2">
          <span className="logo-text font-bold">
            {resume.userName.toString().slice(0, 12)}...
          </span>
          's resume
        </p>
        <div className="absolute top-3 left-3">
          <img
            src={user.imageUrl}
            alt="user-icon"
            width={30}
            height={30}
            className="rounded-full"
          />
        </div>
        {/* <Notebook /> */}
        <img
          src="/notebook.png"
          alt="notebook"
          width={60}
          height={60}
          className="animate-bounce"
        />
        <h1 className="text-start max-w-full text-xs font-bold absolute bottom-2 left-2">
          {resume.title.slice(0, 30)}
          {resume.title.length > 30 && "..."}
        </h1>
      </div>
    </Link>
  );
};

export default ResumeItem;
