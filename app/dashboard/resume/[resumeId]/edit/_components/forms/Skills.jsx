"use client";

import { Input } from "@/components/ui/input";
import React, { useContext, useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { LoaderCircle, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { db } from "@/utils/db";
import { UserResume } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { toast } from "sonner";

const Skills = ({ resumeId, enableNext }) => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);
  const [skillsList, setSkillsList] = useState([
    {
      name: "",
      rating: 0,
    },
  ]);

  const handleChange = (index, name, value) => {
    const newEntries = skillsList.slice();
    newEntries[index][name] = value;
    setSkillsList(newEntries);
  };

  const addNewSkill = () => {
    setSkillsList([
      ...skillsList,
      {
        name: "",
        rating: 0,
      },
    ]);
  };

  const removeSkill = () => {
    setSkillsList((skillsList) => skillsList.slice(0, -1));
  };

  const onSave = async () => {
    setLoading(true);

    const stringSkills = JSON.stringify(skillsList);
    try {
      const resp = await db
        .update(UserResume)
        .set({ skills: stringSkills })
        .where(eq(UserResume.resumeId, resumeId));

      if (resp) {
        toast(
          <p className="text-xs text-green-500">Skills saved successfully</p>
        );
        enableNext(true);
        setLoading(false);
      } else {
        toast(<p className="text-xs text-red-500">Failed to save skills</p>);
        setLoading(false);
      }
    } catch (error) {
      toast(
        <p className="text-xs text-red-500">
          Internal error occured while saving the skills
        </p>
      );
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      skills: skillsList,
    });
  }, [skillsList]);

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Skills</h2>
        <p className="text-sm">Add your top skills</p>

        <div>
          {skillsList.map((item, index) => (
            <div
              key={index}
              className="flex justify-between mb-2 gap-3 border rounded-lg p-3"
            >
              <div>
                <label className="text-xs font-bold">Skill</label>
                <Input
                  name="name"
                  onChange={(e) => handleChange(index, "name", e.target.value)}
                  className="border-gray-500 w-full"
                />
              </div>

              <Rating
                style={{ maxWidth: 120 }}
                value={item.rating}
                onChange={(v) => handleChange(index, "rating", v)}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-between">
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="border-primary text-primary"
              onClick={addNewSkill}
              size="sm"
            >
              + Add More
            </Button>

            <Button
              variant="outline"
              className="border-red-500 text-red-500"
              onClick={removeSkill}
              size="sm"
            >
              <Trash width={14} height={14} /> Remove
            </Button>
          </div>
          <Button onClick={onSave} disabled={loading}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Skills;
