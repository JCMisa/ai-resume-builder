import { Dot } from "lucide-react";
import React from "react";

const ExperiencePreview = ({ resumeInfo }) => {
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

          {resumeInfo?.experiences.map((exp) => (
            <h2
              key={exp.id}
              className="text-start font-normal text-xs flex flex-col justify-start items-start gap-2"
            >
              <h2 className="text-xs font-bold">{exp?.title}</h2>
              <div className="flex justify-between gap-52">
                <h2 className="text-xs font-normal">{exp?.companyName}</h2>
                <h2 className="text-xs font-normal">
                  {exp?.startDate} - {exp?.endDate}
                </h2>
              </div>
              <div className="text-start items-center text-xs flex justify-between gap-2">
                - {exp?.workSummary}
              </div>
            </h2>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExperiencePreview;