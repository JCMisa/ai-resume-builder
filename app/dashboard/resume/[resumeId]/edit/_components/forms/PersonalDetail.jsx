import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useContext } from "react";

const PersonalDetail = () => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const handleInputChange = (e) => {};

  const onSave = (e) => {};

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Personal Detail</h2>
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
          <Button type="submit">Save</Button>
        </div>
      </form>
    </div>
  );
};

export default PersonalDetail;
