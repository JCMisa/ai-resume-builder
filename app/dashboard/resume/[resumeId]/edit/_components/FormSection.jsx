import React, { useState } from "react";
import PersonalDetail from "./forms/PersonalDetail";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, LayoutGrid } from "lucide-react";
import Summary from "./forms/Summary";
import Experience from "./forms/Experience";
import Education from "./forms/Education";
import Skills from "./forms/Skills";

const FormSection = ({ resumeId }) => {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext, setEnableNext] = useState(false);

  return (
    <div className="min-w-[30%]">
      <div className="flex justify-between items-center">
        <Button variant="outline" size="sm" className="flex gap-2">
          {" "}
          <LayoutGrid /> Theme{" "}
        </Button>
        <div className="flex gap-2">
          {activeFormIndex > 1 && (
            <Button
              size="sm"
              onClick={() => setActiveFormIndex(activeFormIndex - 1)}
            >
              {" "}
              <ArrowLeft />{" "}
            </Button>
          )}
          {activeFormIndex < 5 && (
            <Button
              disabled={!enableNext} // only enable next button if the form is saved
              className="flex gap-2"
              size="sm"
              onClick={() => setActiveFormIndex(activeFormIndex + 1)}
            >
              {" "}
              Next <ArrowRight />{" "}
            </Button>
          )}
        </div>
      </div>
      {/* Personal Detail */}
      {activeFormIndex === 1 ? (
        <PersonalDetail
          resumeId={resumeId}
          enableNext={(v) => setEnableNext(v)}
        /> // pass the enableNext state to this component as props
      ) : null}

      {/* summary */}
      {activeFormIndex === 2 ? (
        <Summary resumeId={resumeId} enableNext={(v) => setEnableNext(v)} />
      ) : null}

      {/* experience */}
      {activeFormIndex === 3 ? (
        <Experience resumeId={resumeId} enableNext={(v) => setEnableNext(v)} />
      ) : null}

      {/* education */}
      {activeFormIndex === 4 ? (
        <Education resumeId={resumeId} enableNext={(v) => setEnableNext(v)} />
      ) : null}

      {/* skills */}
      {activeFormIndex === 5 ? (
        <Skills resumeId={resumeId} enableNext={(v) => setEnableNext(v)} />
      ) : null}
    </div>
  );
};

export default FormSection;
