"use client";

import React, { useEffect, useState } from "react";
import FormSection from "./_components/FormSection";
import ResumePreview from "./_components/ResumePreview";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { dummy } from "@/data/dummy";

const EditResume = ({ params }) => {
  const [resumeInfo, setResumeInfo] = useState();

  useEffect(() => {
    setResumeInfo(dummy);
  }, []);

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className="flex flex-col sm:flex-row p-10 gap-10">
        {/* form section */}
        <FormSection resumeId={params.resumeId} />

        {/* preview section */}
        <ResumePreview />
      </div>
    </ResumeInfoContext.Provider>
  );
};

export default EditResume;
