"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { db } from "@/utils/db";
import { chatSession } from "@/utils/GeminiAiModal";
import { UserResume } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Brain, LoaderCircle } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

const Summary = ({ resumeId, enableNext }) => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [summaryInput, setSummaryInput] = useState();
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiGeneratedSummaryList, setAiGeneratedSummaryList] = useState([]);

  useEffect(() => {
    summaryInput &&
      setResumeInfo({
        ...resumeInfo,
        summary: summaryInput,
      });
  }, [summaryInput]);

  //   useEffect(() => {
  //     resumeInfo?.skills.map((skill) => {
  //       console.log(skill.name + ", ");
  //     });
  //   }, []);

  const generateSummaryFromAi = async () => {
    setAiLoading(true);
    const prompt = `Job Title: ${
      resumeInfo?.jobTitle
    }, Skills: ${resumeInfo?.skills.map(
      (skill) => skill.name
    )}, based on the given job title and skills please generate 3 JSON objects, representing personal summaries for a resume, each with "experienceLevel" (Fresher, Mid-Level, Experienced) and "summary" (concise impactful 4 to 6 sentences summary text) properties`;

    const result = await chatSession.sendMessage(prompt);

    setAiGeneratedSummaryList(JSON.parse([result.response.text()]));
    console.log("generated summary: ", JSON.parse([result.response.text()]));
    setAiLoading(false);
  };

  const onSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const resp = await db
        .update(UserResume)
        .set({ summary: summaryInput })
        .where(eq(UserResume.resumeId, resumeId));

      if (resp) {
        // if saving the summary in database is successfull
        toast("Personal summary saved successfully");
        enableNext(true);
        setLoading(false);
      } else {
        toast("Failed to save personal summary");
        setLoading(false);
      }
    } catch (error) {
      toast("Error saving personal summary");
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Profile Summary</h2>
        <p className="text-sm">
          Add personal summary that will best describe you
        </p>

        <form className="mt-7" onSubmit={onSave}>
          <div className="flex justify-between items-end">
            <label className="text-xs">Add Summary</label>
            <Button
              variant="outline"
              size="sm"
              className="border-primary text-primary flex gap-2 items-center"
              type="button"
              onClick={generateSummaryFromAi}
              disabled={aiLoading}
            >
              {aiLoading ? (
                <Brain width={15} height={15} className="animate-pulse" />
              ) : (
                <>
                  <Brain width={15} height={15} />
                  Generate with AI
                </>
              )}
            </Button>
          </div>
          <Textarea
            className="mt-5 border-gray-500 summary-textarea"
            required
            onChange={(e) => setSummaryInput(e.target.value)}
          />
          <div className="mt-2 flex justify-end">
            <Button disabled={loading} type="submit">
              {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
            </Button>
          </div>
        </form>
      </div>

      <div>
        <h2 className="font-bold text-lg">
          {aiGeneratedSummaryList && "AI Suggestion"}
        </h2>
        {Array.isArray(aiGeneratedSummaryList) &&
          aiGeneratedSummaryList.map((item, index) => (
            <div key={index}>
              <h2 className="font-bold my-1">Level: {item.experienceLevel}</h2>
              <p className="text-xs">{item.summary}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Summary;
