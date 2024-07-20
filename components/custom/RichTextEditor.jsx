"use client";

import React, { useContext, useState } from "react";
import {
  BtnBold,
  BtnBulletList,
  BtnClearFormatting,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnStrikeThrough,
  BtnStyles,
  BtnUnderline,
  Editor,
  EditorProvider,
  HtmlButton,
  Separator,
  Toolbar,
} from "react-simple-wysiwyg";
import { Button } from "../ui/button";
import { Brain } from "lucide-react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { toast } from "sonner";
import { chatSession } from "@/utils/GeminiAiModal";

const RichTextEditor = ({ onRichTextEditorChange, index }) => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const [value, setValue] = useState();
  const [aiLoading, setAiLoading] = useState(false);

  const generateSummaryFromAi = async () => {
    setAiLoading(true);
    if (!resumeInfo?.experience[index].title) {
      toast("Please add position title");
      return;
    }

    const PROMPT =
      "Position title: {positionTitle}, based on position title give me 5-7 bullet points for my experience in my resume, give me result in HTML format";

    const prompt = PROMPT.replace(
      "{positionTitle}",
      resumeInfo.experience[index].title
    );

    const result = await chatSession.sendMessage(prompt);

    const resp = result.response.text();
    setValue(resp.replace("[", "").replace("]", ""));
    setAiLoading(false);
  };

  return (
    <div>
      <div className="flex justify-between items-end my-2">
        <label className="text-xs">Work Summary</label>
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
      <EditorProvider>
        <Editor
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onRichTextEditorChange(e);
          }}
        >
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
};

export default RichTextEditor;
