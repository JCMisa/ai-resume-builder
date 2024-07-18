import { Dot } from "lucide-react";
import React from "react";

const SkillsPreview = ({ resumeInfo }) => {
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
          {resumeInfo?.skills.map((skill) => (
            <h2
              key={skill.id}
              className="text-center font-normal text-xs flex justify-start items-center gap-2"
            >
              <Dot /> {skill.name} --- {skill.rating}%
            </h2>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsPreview;
