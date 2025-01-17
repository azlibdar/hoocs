import { useCallback, useState } from "react";

const useCopyToClipboard = () => {
  const [copiedText, setCopiedText] = useState<string>("");

  const copyToClipboard = useCallback((value: string) => {
    const handleCopy = async () => {
      try {
        if (navigator?.clipboard?.writeText) {
          await navigator.clipboard.writeText(value);
        }
        setCopiedText(value);
      } catch (e) {
        console.error("Failed to copy text:", e);
      }
    };

    handleCopy();
  }, []);

  return { copiedText, copyToClipboard };
};

export default useCopyToClipboard;
