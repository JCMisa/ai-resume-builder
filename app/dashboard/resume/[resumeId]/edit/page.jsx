"use client";

import React, { useEffect, useState } from "react";
import FormSection from "./_components/FormSection";
import ResumePreview from "./_components/ResumePreview";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { dummy } from "@/data/dummy";
import { toast } from "sonner";
import { db } from "@/utils/db";
import { UserResume } from "@/utils/schema";
import { desc, eq } from "drizzle-orm";

const EditResume = ({ params }) => {
  const [resumeInfo, setResumeInfo] = useState(dummy);
  const [loading, setLoading] = useState(false);

  const getResumeInfo = async () => {
    const resp = await db
      .select()
      .from(UserResume)
      .where(eq(UserResume.resumeId, params.resumeId));

    console.log("page resume info: ", resp[0]); // get the resp which is the record in the database
  };

  useEffect(() => {
    setResumeInfo(dummy);
    resumeInfo && getResumeInfo();
  }, []);

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className="flex flex-col sm:flex-row p-10 gap-10">
        {/* form section */}
        <FormSection resumeId={params.resumeId} />

        {/* preview section */}
        <ResumePreview />

        {/* <button onClick={getUserResume}>show user resume</button> */}
      </div>
    </ResumeInfoContext.Provider>
  );
};

export default EditResume;
