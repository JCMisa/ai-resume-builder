import React from "react";

const SummaryPreview = ({ resumeInfo }) => {
  return (
    <div className="flex justify-start text-gray-600">
      <div>
        <h2
          className="text-md font-medium"
          style={{ color: resumeInfo?.themeColor }}
        >
          PROFILE
        </h2>
        <h2 className="font-normal text-xs flex justify-start">
          {resumeInfo?.summary}
        </h2>
      </div>
    </div>
  );
};

export default SummaryPreview;
