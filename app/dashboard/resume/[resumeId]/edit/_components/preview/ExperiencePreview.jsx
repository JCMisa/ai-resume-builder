import { Dot } from "lucide-react";
import React, { useEffect, useState } from "react";

const ExperiencePreview = ({ resumeInfo }) => {
  const [experience, setExperience] = useState();

  useEffect(() => {
    setExperience(JSON.parse(resumeInfo?.experience));
    console.log("experience preview resumeInfo: ", experience);
  }, [resumeInfo]);

  return (
    <div className="text-gray-600">
      <div className="flex justify-between">
        {/* experience */}
        <div className="flex flex-col gap-2">
          <h2
            className="text-md font-medium"
            style={{ color: resumeInfo?.themeColor }}
          >
            WORK EXPERIENCE
          </h2>

          {Array.isArray(experience) &&
            experience.map((exp, index) => (
              <div
                key={index}
                className={`text-start font-normal text-xs flex flex-col justify-start items-start gap-2 ${
                  index !== 0 ? "mt-5" : "mt-2"
                }`}
              >
                <h2 className="text-xs font-bold">{exp?.title}</h2>
                <div className="flex justify-between gap-40">
                  <h2 className="text-xs font-normal">{exp?.companyName}</h2>
                  <h2 className="text-xs font-normal">
                    ({exp?.startDate}) - (
                    {exp.currentlyWorking ? "PRESENT" : exp.endDate})
                  </h2>
                </div>
                <div
                  dangerouslySetInnerHTML={{ __html: exp?.workSummary }}
                  className="text-start items-center text-xs flex justify-between gap-2"
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ExperiencePreview;
