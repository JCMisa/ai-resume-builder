"use client";

import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { Dot } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";

const SkillsPreview = ({ resumeInfo }) => {
  const [skills, setSkills] = useState();

  useEffect(() => {
    // setSkills(JSON.parse(resumeInfo?.skills));
    // console.log("skills preview resumeInfo: ", skills);
    setSkills(JSON.parse(resumeInfo?.skills));
    console.log("skills preview resumeInfo: ", skills);
  }, [resumeInfo]);

  return (
    <div className="text-gray-600">
      <div className="flex justify-between">
        {/* skills */}
        <div className="flex flex-col gap-2">
          <h2
            className="text-md font-medium"
            style={{ color: resumeInfo?.themeColor }}
          >
            SKILLS
          </h2>
          <div className="">
            {Array.isArray(skills) &&
              skills.map((skill, index) => (
                <div
                  key={index}
                  className="text-xs flex justify-between items-center gap-2"
                >
                  <p className="flex items-center">
                    <Dot /> {skill?.name}
                  </p>
                  <div className="h-2 bg-gray-200 w-[120px]">
                    <div
                      className={`h-2 ${
                        !resumeInfo?.themeColor ? "bg-red-400" : ""
                      }`}
                      style={{
                        backgroundColor: resumeInfo?.themeColor,
                        width: skill?.rating * 20 + "%", // multiply by 20 because the stars return a value of 1 to 5 only
                      }}
                    ></div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsPreview;
