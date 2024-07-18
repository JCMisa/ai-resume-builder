"use client";

import { db } from "@/utils/db";
import { UserResume } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import ResumeItem from "./ResumeItem";

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
      console.log("List of Resumes: ", resp);
      setUserResumeList(resp);
    } catch (error) {
      console.log("Error while fetching resume list: ", error);
    }
  };

  useEffect(() => {
    user && getResumeList();
  }, [user]); // evertime user information change, the getResumeList will execute

  return (
    <div>
      {userResumeList &&
        userResumeList.map((resume) => (
          <ResumeItem key={resume?.id} resume={resume} />
        ))}
    </div>
  );
};

export default ResumeList;
