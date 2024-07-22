import React, { useContext, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { LayoutGrid } from "lucide-react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { db } from "@/utils/db";
import { UserResume } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { toast } from "sonner";

const ThemeColor = ({ resumeId }) => {
  const colors = [
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#FF33A1",
    "#A133FF",
    "#33FFA1",
    "#FF7133",
    "#71FF33",
    "#7133FF",
    "#FF3371",
    "#33FF71",
    "#3371FF",
    "#A1FF33",
    "#33A1FF",
    "#FF5733",
    "#5733FF",
    "#33FF5A",
    "#5A33FF",
    "#FF335A",
    "#335AFF",
  ];

  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [selectedColor, setSelectedColor] = useState();

  const onColorSelect = async (color) => {
    setSelectedColor(color);
    setResumeInfo({
      ...resumeInfo,
      themeColor: color,
    });

    try {
      const resp = await db
        .update(UserResume)
        .set({ themeColor: color })
        .where(eq(UserResume?.resumeId, resumeId));

      if (resp) {
        toast(
          <p className="text-xs font-bold text-green-500">
            Theme color updated successfully
          </p>
        );
      }
    } catch (error) {
      toast(
        <p className="text-xs font-bold text-red-500">
          Internal error occured while updating theme color
        </p>
      );
    }
  };

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            size="sm"
            className="flex gap-2 bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 hover:shadow-md shadow-primary hover:scale-105 transition-all cursor-pointer"
          >
            <LayoutGrid />
            Theme
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <h2 className="mb-2 text-sm font-bold">Select Theme Color</h2>
          <div className="grid grid-cols-5 gap-2">
            {colors.map((item, index) => (
              <div
                onClick={() => onColorSelect(item)}
                key={index}
                style={{ background: item }}
                className={`${
                  selectedColor == item && "border border-black"
                } h-5 w-5 rounded-full cursor-pointer border hover:border-black transition-all`}
              ></div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ThemeColor;
