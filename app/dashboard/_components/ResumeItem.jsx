"use client";

import { useUser } from "@clerk/nextjs";
import {
  Download,
  Eye,
  LoaderCircle,
  MoreVertical,
  Notebook,
  Pen,
  Trash,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { db } from "@/utils/db";
import { UserResume } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { toast } from "sonner";

const ResumeItem = ({ resume, refreshData }) => {
  const { user } = useUser();
  const router = useRouter();
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDelete = async () => {
    setLoading(true);
    try {
      const resp = await db
        .delete(UserResume)
        .where(eq(UserResume?.resumeId, resume?.resumeId));

      if (resp) {
        refreshData();
        toast(
          <p className="text-xs font-bold text-green-500">
            Resume with id {resume?.resumeId} deleted successfully
          </p>
        );
        setOpenAlert(false);
      } else {
        toast(
          <p className="text-xs font-bold text-red-500">
            Error while deleting record with id {resume?.resumeId}
          </p>
        );
        setLoading(false);
      }
    } catch (error) {
      toast(
        <p className="text-xs font-bold text-red-500">
          Internal error occured while deleting the resume
        </p>
      );
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="p-14 bg-gradient-to-b from-pink-100 via-purple-200 to-blue-200 flex items-center justify-center rounded-lg hover:shadow-md shadow-primary mt-10 min-h-[280px] max-h-[280px] sm:min-w-[220px] sm:max-w-[220px] min-w-full hover:scale-105 transition-all cursor-pointer relative"
      style={{ borderColor: resume?.themeColor }}
    >
      <p className="text-xs absolute top-3 right-3 w-38 bg-white/50 backdrop-blur-sm backdrop-filter overflow-hidden rounded-lg px-1 py-2">
        <span className="logo-text font-bold">
          {resume?.firstName
            ? resume?.firstName.toString().slice(0, 12)
            : "Unknown"}
          ...
        </span>
        's resume
      </p>
      <div className="absolute top-3 left-3">
        <img
          src={user.imageUrl}
          alt="user-icon"
          width={30}
          height={30}
          className="rounded-full"
        />
      </div>
      {/* <Notebook /> */}
      <img
        src="/notebook.png"
        alt="notebook"
        width={60}
        height={60}
        className="animate-bounce"
      />

      <h1
        className="text-start max-w-full text-xs font-bold absolute bottom-2 left-2"
        style={{ color: resume?.themeColor }}
      >
        {resume.title.slice(0, 30)}
        {resume.title.length > 30 && "..."}
      </h1>

      <div className="absolute bottom-2 right-2 hover:scale-90 transition-all z-50">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical className="h-4 w-4 cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuSeparator />
            <Link href={`/dashboard/resume/${resume?.resumeId}/edit`}>
              <DropdownMenuItem className="cursor-pointer flex gap-2">
                <Pen width={14} height={14} /> Edit
              </DropdownMenuItem>
            </Link>

            <Link href={`/my-resume/${resume?.resumeId}/view`}>
              <DropdownMenuItem className="cursor-pointer flex gap-2">
                <Eye width={14} height={14} />
                View
              </DropdownMenuItem>
            </Link>

            <Link href={`/my-resume/${resume?.resumeId}/view`}>
              <DropdownMenuItem className="cursor-pointer flex gap-2">
                <Download width={14} height={14} />
                Download
              </DropdownMenuItem>
            </Link>

            <DropdownMenuItem
              className="cursor-pointer flex gap-2"
              onClick={() => setOpenAlert(true)}
            >
              <Trash width={14} height={14} />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <AlertDialog open={openAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setOpenAlert(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction disabled={loading} onClick={onDelete}>
                {loading ? <LoaderCircle className="animate-spin" /> : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default ResumeItem;
