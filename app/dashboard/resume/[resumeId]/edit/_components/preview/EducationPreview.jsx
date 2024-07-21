"use client";

import React, { useEffect, useState } from "react";

const EducationPreview = ({ resumeInfo }) => {
  const [education, setEducation] = useState();

  useEffect(() => {
    setEducation(JSON.parse(resumeInfo?.education));
    console.log("education preview resumeInfo: ", education);
  }, [resumeInfo]);

  return (
    <div className="text-gray-600 max-w-[340px]">
      <div className="flex justify-between">
        {/* education */}
        <div className="flex flex-col gap-2">
          <h2
            className="text-md font-medium"
            style={{ color: resumeInfo?.themeColor }}
          >
            EDUCATION
          </h2>
          {Array.isArray(education) &&
            education.map((educ, index) => (
              <div
                key={index}
                className={`flex flex-col gap-2 ${index !== 0 ? "mt-5" : ""}`}
              >
                <h2 className="font-bold text-xs">
                  {educ?.degree} {educ.degree && "in"} {educ?.major}
                </h2>
                <h2 className="font-bold text-md">{educ?.universityName}</h2>
                <h2 className="text-xs">
                  ({educ?.startDate}) - ({educ?.endDate})
                </h2>
                <h2 className="text-xs">{educ?.description}</h2>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default EducationPreview;
