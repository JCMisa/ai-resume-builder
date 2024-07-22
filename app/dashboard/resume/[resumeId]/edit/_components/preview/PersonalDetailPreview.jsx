import { Dot, Globe, Mail, MapPin, PhoneCall } from "lucide-react";
import React from "react";

const PersonalDetailPreview = ({ resumeInfo }) => {
  return (
    <>
      <div className="text-gray-600">
        <div className="flex justify-between">
          {/* contacts */}
          <div className="flex flex-col gap-2">
            <h2
              className="text-md font-medium"
              style={{ color: resumeInfo?.themeColor }}
            >
              CONTACT
            </h2>
            <h2 className="text-start font-normal text-xs flex justify-start items-center gap-2">
              <PhoneCall width={14} height={14} /> {resumeInfo?.phone}
            </h2>
            <h2 className="text-start font-normal text-xs flex justify-start items-center gap-2">
              <Mail width={14} height={14} /> {resumeInfo?.email}
            </h2>
            <h2 className="text-start font-normal text-xs flex justify-start items-center gap-2">
              <Globe width={14} height={14} /> {resumeInfo?.website}
            </h2>
            <h2 className="text-start font-normal text-xs flex justify-start items-center gap-2">
              <MapPin width={14} height={14} /> {resumeInfo?.address}
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalDetailPreview;
