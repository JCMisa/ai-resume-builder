"use client";

import RichTextEditor from "@/components/custom/RichTextEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { db } from "@/utils/db";
import { UserResume } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { LoaderCircle, Trash } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

const formField = {
  //   id: uuidv4(),
  title: "",
  companyName: "",
  city: "",
  state: "",
  startDate: "",
  endDate: "",
  workSummary: "",
};

const Experience = ({ resumeId, enableNext }) => {
  const [experienceList, setExperienceList] = useState([formField]);
  const [loading, setLoading] = useState(false);

  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const handleChange = (index, event) => {
    const newEntries = experienceList.slice(); // creates a shallow copy of the experienceList array
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setExperienceList(newEntries);
  };

  //   ----------------------------------------------------------------

  const addNewExperience = () => {
    setExperienceList([
      ...experienceList,
      {
        title: "",
        companyName: "",
        city: "",
        state: "",
        startDate: "",
        endDate: "",
        workSummary: "",
      },
    ]);
  };

  const removeExperience = () => {
    setExperienceList((experienceList) => experienceList.slice(0, -1));
  };

  const handleRichTextEditor = (e, name, index) => {
    const newEntries = experienceList.slice();
    newEntries[index][name] = e.target.value;
    setExperienceList(newEntries);
  };

  //   ----------------------------------------------------------------

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      experience: experienceList,
    });
  }, [experienceList]);

  //   ----------------------------------------------------------------

  const onSave = async () => {
    setLoading(true);

    try {
      const resp = await db
        .update(UserResume)
        .set({ experience: JSON.stringify(experienceList) }) // store it first as string and when you want to access it, JSON.parse it first
        .where(eq(UserResume.resumeId, resumeId));

      if (resp) {
        toast(
          <p className="text-xs text-green-500">
            Experiences saved successfully
          </p>
        );
        enableNext(true);
        setLoading(false);
      } else {
        toast(
          <p className="text-xs text-red-500">Failed to save experiences</p>
        );
        setLoading(false);
      }
    } catch (error) {
      toast(
        <p className="text-xs text-red-500">
          Internal error occured while saving experiences
        </p>
      );
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const objectOfObjects = experienceList.reduce((acc, object) => {
    acc[object.title] = object; // Use the desired property (e.g., "id") as the key
    return acc;
  }, {});

  // const show = () => {
  //   console.log(JSON.parse(JSON.stringify(experienceList)));
  // };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Professional Experience</h2>
        <p className="text-sm">Add atleast 3 previous job experiences</p>

        <div className="my-3">
          {experienceList.map((item, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
                <div>
                  <label className="text-xs font-bold">Position Title</label>
                  <Input
                    name="title"
                    onChange={(e) => handleChange(index, e)}
                    className="border-gray-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold">Company Name</label>
                  <Input
                    name="companyName"
                    onChange={(e) => handleChange(index, e)}
                    className="border-gray-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold">City</label>
                  <Input
                    name="city"
                    onChange={(e) => handleChange(index, e)}
                    className="border-gray-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold">State/Province</label>
                  <Input
                    name="state"
                    onChange={(e) => handleChange(index, e)}
                    className="border-gray-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold">Start Date</label>
                  <Input
                    name="startDate"
                    type="date"
                    onChange={(e) => handleChange(index, e)}
                    className="border-gray-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold">End Date</label>
                  <Input
                    name="endDate"
                    type="date"
                    onChange={(e) => handleChange(index, e)}
                    className="border-gray-500"
                  />
                </div>

                {/* work summary */}
                <div className="col-span-2">
                  <RichTextEditor
                    className="summary-textarea"
                    index={index}
                    onRichTextEditorChange={(event) =>
                      handleRichTextEditor(event, "workSummary", index)
                    }
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between">
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="border-primary text-primary"
              onClick={addNewExperience}
              size="sm"
            >
              + Add More
            </Button>

            <Button
              variant="outline"
              className="border-red-500 text-red-500"
              onClick={removeExperience}
              size="sm"
            >
              <Trash width={14} height={14} /> Remove
            </Button>
          </div>
          <Button onClick={onSave} disabled={loading}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
        {/* <Button onClick={show}>Show experienceList</Button> */}
      </div>
    </div>
  );
};

export default Experience;
