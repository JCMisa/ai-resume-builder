"use client";

import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useContext } from "react";
import PersonalDetailPreview from "./preview/PersonalDetailPreview";
import SummaryPreview from "./preview/SummaryPreview";
import SkillsPreview from "./preview/SkillsPreview";
import ExperiencePreview from "./preview/ExperiencePreview";
import EducationPreview from "./preview/EducationPreview";

const ResumePreview = () => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  return (
    <div
      className="shadow-lg h-full p-14 border-t-[20px] min-w-[70%]"
      style={{ borderColor: resumeInfo?.themeColor }}
    >
      {/* name and role */}
      <h2
        className="text-[2rem] text-center"
        style={{ color: resumeInfo?.themeColor }}
      >
        {resumeInfo?.firstName.toUpperCase()}{" "}
        {resumeInfo?.lastName.toUpperCase()}
      </h2>
      <h2 className="text-center text-sm text-gray-600">
        {resumeInfo?.jobTitle.toUpperCase()}
      </h2>

      {/* solid line break */}
      <hr
        className="border-[1.5px] m-2"
        style={{ borderColor: resumeInfo?.themeColor }}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 mt-4">
        <div className="flex flex-col gap-10 mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2">
            {/* Contact Details */}
            <PersonalDetailPreview resumeInfo={resumeInfo} />
          </div>

          {/* dashed line break */}
          <hr
            className="border-[1.5px] border-dashed mr-10"
            style={{ borderColor: resumeInfo?.themeColor }}
          />

          {/* Skills */}
          <SkillsPreview resumeInfo={resumeInfo} />

          {/* dashed line break */}
          <hr
            className="border-[1.5px] border-dashed mr-10"
            style={{ borderColor: resumeInfo?.themeColor }}
          />

          {/* Education */}
          <EducationPreview resumeInfo={resumeInfo} />
        </div>

        <div className="flex flex-col gap-10 mt-4">
          {/* Summary */}
          <SummaryPreview resumeInfo={resumeInfo} />

          {/* dashed line break */}
          <hr
            className="border-[1.5px] border-dashed mr-10"
            style={{ borderColor: resumeInfo?.themeColor }}
          />

          {/* Professional Experience */}
          <ExperiencePreview resumeInfo={resumeInfo} />
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
