"use client";

import Header from "@/app/dashboard/_components/Header";
import ResumePreview from "@/app/dashboard/resume/[resumeId]/edit/_components/ResumePreview";
import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { db } from "@/utils/db";
import { UserResume } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { RWebShare } from "react-web-share";
import { toast } from "sonner";

const ViewResume = ({ params }) => {
  const [resumeInfo, setResumeInfo] = useState();

  const getResumeInfo = async () => {
    try {
      const resp = await db
        .select()
        .from(UserResume)
        .where(eq(UserResume?.resumeId, params.resumeId));

      if (resp) {
        console.log("my-resume resp: ", resp);
        setResumeInfo(resp[0]);
        toast(
          <p className="text-xs text-green-500 font-bold">
            Resume Information Fetched Sucessfully
          </p>
        );
      } else {
        toast(
          <p className="text-xs text-red-500 font-bold">
            Error while fetching resume information
          </p>
        );
      }
    } catch (error) {
      toast(
        <p className="text-xs text-red-500 font-bold">
          Internal error occured while fetching resume information
        </p>
      );
    }
  };

  // download the resume
  const handleDownload = () => {
    window.print();
  };

  useEffect(() => {
    getResumeInfo();
  }, []);

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div id="no-print">
        <Header />
        <div className="my-10 mx-10 md:mx-20 lg:mx-36">
          <div className="flex flex-col items-center justify-center">
            <img src="/success.gif" alt="success" className="text-center" />
            <h2 className="text-center text-2xl font-bold logo-text">
              Congratulations! You've built a powerful resume!
            </h2>
            <p className="text-center text-gray-500">
              Now you are ready to download or share your resume
            </p>
          </div>

          <div className="flex justify-center gap-5 items-center my-10">
            <Button className="min-w-36" onClick={handleDownload}>
              Download
            </Button>

            <RWebShare
              data={{
                text: "Hello everyone, this is my resume please open URL to view",
                url: `${process.env.NEXT_BASE_URL}/view`,
                title: `${resumeInfo?.firstName} ${resumeInfo?.lastName}'s Resume`,
              }}
              onClick={() =>
                toast(
                  <p className="text-xs text-green-500 font-bold">
                    Shared Successfully
                  </p>
                )
              }
            >
              <Button className="min-w-36">Share</Button>
            </RWebShare>
          </div>
        </div>
      </div>

      <div id="print-area">
        <ResumePreview />
      </div>
    </ResumeInfoContext.Provider>
  );
};

export default ViewResume;
