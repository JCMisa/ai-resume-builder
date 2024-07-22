"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { db } from "@/utils/db";
import { UserResume } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { LoaderCircle, Trash } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

const Education = ({ resumeId, enableNext }) => {
  const [educationalList, setEducationalList] = useState([
    {
      universityName: "",
      degree: "",
      major: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ]);

  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  // useEffect(() => {
  //   resumeInfo && setEducationalList(JSON.parse(resumeInfo?.education));
  // }, []);

  const handleChange = (event, index) => {
    const newEntries = educationalList.slice(); // creates a shallow copy of the educationList array
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setEducationalList(newEntries);
  };

  const addNewEducation = () => {
    // this will copy the whole educationList previous values then replace all the properties with empty values which generates a new shallow copy of the object. This will let us to update the new record without updating/affecting the previous record
    setEducationalList([
      ...educationalList,
      {
        universityName: "",
        degree: "",
        major: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };

  const removeEducation = () => {
    setEducationalList((educationalList) => educationalList.slice(0, -1));
  };

  const onSave = async () => {
    setLoading(true);

    const stringEducation = JSON.stringify(educationalList);
    try {
      const resp = await db
        .update(UserResume)
        .set({ education: stringEducation })
        .where(eq(UserResume.resumeId, resumeId));

      if (resp) {
        toast(
          <p className="text-xs text-green-500">
            Education details saved successfully
          </p>
        );
        setLoading(false);
        enableNext(true); // if the form is saved, then enable the next button
      } else {
        toast(
          <p className="text-xs text-red-500">
            Failed to save education details
          </p>
        );
        setLoading(false);
      }
    } catch (error) {
      toast(
        <p className="text-xs text-red-500">
          Internal error occured while saving education details
        </p>
      );
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  // -------------------------------------------------------------

  // useEffect(() => {
  //   setResumeInfo({
  //     ...resumeInfo,
  //     education: educationalList,
  //   });
  // }, [educationalList]);

  // -------------------------------------------------------------

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Education</h2>
        <p className="text-sm">Add educational details</p>

        <div>
          {educationalList.map((item, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
                <div className="col-span-2">
                  <label className="text-xs font-bold">University Name</label>
                  <Input
                    defaultValue={item?.universityName}
                    name="universityName"
                    onChange={(event) => handleChange(event, index)}
                    className="border-gray-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold">Degree</label>
                  <Input
                    defaultValue={item?.degree}
                    name="degree"
                    onChange={(event) => handleChange(event, index)}
                    className="border-gray-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold">Major</label>
                  <Input
                    defaultValue={item?.major}
                    name="major"
                    onChange={(event) => handleChange(event, index)}
                    className="border-gray-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold">Start Date</label>
                  <Input
                    defaultValue={item?.startDate}
                    type="date"
                    name="startDate"
                    onChange={(event) => handleChange(event, index)}
                    className="border-gray-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold">End Date</label>
                  <Input
                    defaultValue={item?.endDate}
                    type="date"
                    name="endDate"
                    onChange={(event) => handleChange(event, index)}
                    className="border-gray-500"
                  />
                </div>

                <div className="col-span-2">
                  <label className="text-xs font-bold">Description</label>
                  <Textarea
                    defaultValue={item?.description}
                    name="description"
                    onChange={(event) => handleChange(event, index)}
                    className="border-gray-500 summary-textarea"
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
              onClick={addNewEducation}
              size="sm"
            >
              + Add More
            </Button>

            <Button
              variant="outline"
              className="border-red-500 text-red-500"
              onClick={removeEducation}
              size="sm"
            >
              <Trash width={14} height={14} /> Remove
            </Button>
          </div>
          <Button onClick={onSave} disable={loading}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Education;
