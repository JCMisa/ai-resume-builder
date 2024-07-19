import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { db } from "@/utils/db";
import { UserResume } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { LoaderCircle } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";

const PersonalDetail = ({ resumeId, enableNext }) => {
  // resumeId is the id at the params of /dashboard/resume passed as props
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    jobTitle: "",
    phone: "",
    email: "",
  });

  const handleInputChange = (e) => {
    enableNext(false); // if the input field is changing then disable the next button

    const { name, value } = e.target;

    setResumeInfo({
      ...resumeInfo, // updating the properties inside resumeInfo to the value of input fields
      [name]: value,
    });

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    console.log(formData);
  };

  // useEffect(() => {
  //   console.log(formData);
  // }, []);

  const onSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // to update the record, you should update a property 1 by 1
      const firstNameUpd = await db
        .update(UserResume)
        .set({ firstName: formData?.firstName })
        .where(eq(UserResume?.resumeId, resumeId)); // update the firstName property of a record where resumeId is equal to the resumeId in params

      const lastNameUpd = await db
        .update(UserResume)
        .set({ lastName: formData?.lastName })
        .where(eq(UserResume?.resumeId, resumeId));

      const addressUpd = await db
        .update(UserResume)
        .set({ address: formData?.address })
        .where(eq(UserResume?.resumeId, resumeId));

      const jobTitleUpd = await db
        .update(UserResume)
        .set({ jobTitle: formData?.jobTitle })
        .where(eq(UserResume?.resumeId, resumeId));

      const phoneUpd = await db
        .update(UserResume)
        .set({ phone: formData?.phone })
        .where(eq(UserResume?.resumeId, resumeId));

      const emailUpd = await db
        .update(UserResume)
        .set({ email: formData?.email })
        .where(eq(UserResume?.resumeId, resumeId));

      console.log(
        "updated resume: ",
        firstNameUpd,
        lastNameUpd,
        addressUpd,
        jobTitleUpd,
        phoneUpd,
        emailUpd
      );
      setLoading(false);
      enableNext(true); // if the form is saved, then enable the next button
    } catch (error) {
      console.log("Error updating resume: ", error);
    }
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Personal Details</h2>
      <p>Get started with the basic information</p>

      <form onSubmit={onSave}>
        <div className="grid grid-cols-2 mt-5 gap-3">
          <div>
            <label className="text-sm">First Name</label>
            <Input name="firstName" onChange={handleInputChange} required />
          </div>
          <div>
            <label className="text-sm">Last Name</label>
            <Input name="lastName" onChange={handleInputChange} required />
          </div>

          <div className="col-span-2">
            <label className="text-sm">Job Title</label>
            <Input name="jobTitle" onChange={handleInputChange} required />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Address</label>
            <Input name="address" onChange={handleInputChange} required />
          </div>

          <div>
            <label className="text-sm">Phone</label>
            <Input name="phone" onChange={handleInputChange} required />
          </div>
          <div>
            <label className="text-sm">Email</label>
            <Input name="email" onChange={handleInputChange} required />
          </div>
        </div>

        <div className="mt-3 flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PersonalDetail;
