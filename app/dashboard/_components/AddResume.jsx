"use client";

import { PlusSquare } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/utils/db";
import { UserResume } from "@/utils/schema";
import { useUser } from "@clerk/clerk-react";
import moment from "moment";

const AddResume = () => {
  const { user } = useUser();

  const [openDialog, setOpenDialog] = useState(false);
  const [resumeTitle, setResumeTitle] = useState();

  const onCreate = async () => {
    console.log(user);

    // const resp = await db
    //   .insert(UserResume)
    //   .values({
    //     resumeId: uuidv4(),
    //     title: resumeTitle,
    //     userEmail: user?.primaryEmailAddress?.emailAddress,
    //     userName: user?.fullName,
    //     createdAt: moment().format("DD-MM-yyyy"),
    //   })
    //   .returning({ resumeId: UserResume.resumeId });

    // console.log("Inserted ID: ", resp);

    // if (resp) {
    //   setOpenDialog(false);
    //   router.push(`/dashboard/interview/${resp[0]?.mockId}`);
    // }
  };

  return (
    <div>
      <div
        className="p-14 py-24 border items-center flex justify-center bg-gray-300 rounded-lg mt-10 min-h-[280px] hover:scale-105 transition-all hover:shadow-md cursor-pointer border-dashed"
        onClick={() => setOpenDialog(true)}
      >
        <PlusSquare />
      </div>

      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Resume</DialogTitle>
            <DialogDescription>
              <p>Add a title for your new resume</p>
              <Input
                className="my-2"
                placeholder="Ex. Full Stack Resume"
                onChange={(e) => setResumeTitle(e.target.value)}
              />
            </DialogDescription>

            <div className="flex justify-end gap-5">
              <Button onClick={() => setOpenDialog(false)} variant="ghost">
                Cancel
              </Button>
              <Button disabled={!resumeTitle} onClick={() => onCreate()}>
                Create
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddResume;
