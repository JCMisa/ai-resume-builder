"use client";

import React, { useEffect, useState } from "react";
import FormSection from "./_components/FormSection";
import ResumePreview from "./_components/ResumePreview";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { dummy } from "@/data/dummy";
import { toast } from "sonner";
import { db } from "@/utils/db";
import { UserResume } from "@/utils/schema";
import { desc, eq } from "drizzle-orm";
import SkillsPreview from "./_components/preview/SkillsPreview";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

const EditResume = ({ params }) => {
  const [resumeInfo, setResumeInfo] = useState(null);

  const getData = async () => {
    try {
      const resp = await db
        .select()
        .from(UserResume)
        .where(eq(UserResume?.resumeId, params.resumeId));
      setResumeInfo(resp[0]);
      toast(
        <p className="text-green-500 text-xs font-bold">
          Resume information fetched successfully
        </p>
      );
    } catch (error) {
      toast(
        <p className="text-red-500 text-xs font-bold">
          Internal error occured while fetching resume information
        </p>
      );
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await db
          .select()
          .from(UserResume)
          .where(eq(UserResume?.resumeId, params.resumeId));
        setResumeInfo(resp[0]);
        toast(
          <p className="text-green-500 text-xs font-bold">
            Resume information fetched successfully
          </p>
        );
      } catch (error) {
        toast(
          <p className="text-red-500 text-xs font-bold">
            Internal error occurred while fetching resume information
          </p>
        );
      }
    };

    fetchData();
    getData();
  }, [params.resumeId]);

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className="flex flex-col sm:flex-row p-10 gap-10">
        {/* form section */}
        <FormSection resumeId={params.resumeId} />

        {/* preview section */}
        <ResumePreview />

        <Button onClick={getData} className="fixed bottom-3 left-3">
          Show Changes
        </Button>
      </div>
    </ResumeInfoContext.Provider>
  );
};

export default EditResume;
