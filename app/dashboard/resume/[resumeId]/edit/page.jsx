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
import SkillsPreview from "./_components/preview/SkillsPreview";

const EditResume = ({ params }) => {
  const [resumeInfo, setResumeInfo] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //setResumeInfo(dummy);
    getResumeInfo();
  }, [params]);

  const getResumeInfo = async () => {
    const resp = await db
      .select()
      .from(UserResume)
      .where(eq(UserResume?.resumeId, params.resumeId));

    if (resp) {
      setResumeInfo(resp[0]);
      console.log("resume info state: ", resumeInfo);
    }

    // console.log("page resume info: ", resp[0]); // get the resp which is the record in the database
    // console.log("page resume skills: ", resp[0].skills); // get the stringified array skills property
    // const parsedSkills = JSON.parse(resp[0].skills); // parce the skills stringified version
    // console.log("page resume skills parced: ", parsedSkills); // it will log the parced skills
    // console.log(
    //   ("page resume skills parced index 0 name: ", parsedSkills[0].name) // it should return spring boot
    // );
  };

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
