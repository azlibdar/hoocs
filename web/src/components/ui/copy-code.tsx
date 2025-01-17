"use client";

import useCopyToClipboard from "@/hooks/useCopyToClipboard";
import { useEffect, useState } from "react";

interface CopyCodeProps {
  code: string;
}

const CopyCode = ({ code }: CopyCodeProps) => {
  const { copiedText, copyToClipboard } = useCopyToClipboard();
  const [buttonText, setButtonText] = useState("");

  const handleCopy = () => {
    copyToClipboard(code);
  };

  useEffect(() => {
    if (copiedText) {
      setButtonText("Copied");
      const id = setTimeout(() => {
        setButtonText("");
      }, 2000);

      return () => clearTimeout(id);
    }
  }, [copiedText]);

  return (
    <button className="text-xs py-1 px-2 bg-zinc-950 rounded-md text-zinc-300" onClick={handleCopy}>
      {buttonText || "Copy"}
    </button>
  );
};

export default CopyCode;
