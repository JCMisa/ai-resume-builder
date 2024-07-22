"use client";

import { db } from "@/utils/db";
import { UserResume } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import ResumeItem from "./ResumeItem";
import { toast } from "sonner";

const ResumeList = () => {
  const { user } = useUser();

  const [userResumeList, setUserResumeList] = useState([]);

  const getResumeList = async () => {
    try {
      const resp = await db
        .select()
        .from(UserResume)
        .where(
          eq(UserResume.userEmail, user?.primaryEmailAddress?.emailAddress)
        ) // to make sure that the fetched resumes are only those resumes created by the current logged in user
        .orderBy(desc(UserResume.id));
      setUserResumeList(resp);
    } catch (error) {
      toast(
        <p className="text-xs text-red-500">
          Internal error occured while fetching your resume
        </p>
      );
    }
  };

  useEffect(() => {
    user && getResumeList();
  }, [user]); // evertime user information change, the getResumeList will execute

  return (
    <div className="flex flex-col sm:flex-row gap-5">
      {userResumeList &&
        userResumeList.map((resume) => (
          <ResumeItem key={resume?.id} resume={resume} />
        ))}
    </div>
  );
};

export default ResumeList;
