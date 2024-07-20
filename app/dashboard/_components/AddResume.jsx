"use client";

import { Loader2, PlusSquare } from "lucide-react";
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
import { useRouter } from "next/navigation";

const AddResume = () => {
  const { user } = useUser();
  const router = useRouter();

  const [openDialog, setOpenDialog] = useState(false);
  const [resumeTitle, setResumeTitle] = useState();
  const [loading, setLoading] = useState(false);

  const onCreate = async () => {
    try {
      setLoading(true);
      const resp = await db
        .insert(UserResume)
        .values({
          resumeId: uuidv4(),
          title: resumeTitle,
          userEmail: user?.primaryEmailAddress?.emailAddress,
          userName: user?.fullName,
          createdAt: moment().format("DD-MM-yyyy"),
        })
        .returning({ resumeId: UserResume.resumeId });

      if (resp) {
        setOpenDialog(false);
        setLoading(false);
        router.push(`/dashboard/resume/${resp[0]?.resumeId}/edit`);
      }
    } catch (error) {
      console.error("Error creating resume: ", error);
      setLoading(false);
    } finally {
      setLoading(false);
      setOpenDialog(false);
    }
  };

  return (
    <div>
      <div
        className="p-14 py-24 border items-center flex justify-center bg-gray-300 rounded-lg mt-10 min-h-[280px] max-h-[280px] sm:min-w-[220px] sm:max-w-[220px] min-w-full hover:scale-105 transition-all hover:shadow-md cursor-pointer border-dashed"
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
              <Button
                disabled={!resumeTitle || loading}
                onClick={() => onCreate()}
              >
                {loading ? <Loader2 className="animate-spin" /> : "Create"}
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddResume;
