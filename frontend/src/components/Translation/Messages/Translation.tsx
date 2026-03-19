import { ActionIcon, Blockquote } from "@mantine/core";
import { useState } from "react";
import { FiCheck, FiCopy } from "react-icons/fi";
import { useTranslationContext } from "@/contexts/TranslationContext";

const PLACEHOLDER =
  "Life is like an npm install – you never know what you are going to get.";

const Translation: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const { streamingContent } = useTranslationContext();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(streamingContent || PLACEHOLDER);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const displayText = streamingContent || PLACEHOLDER;

  return (
    <Blockquote color="red" cite={null} icon={null}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {displayText}

        <ActionIcon variant="subtle" onClick={handleCopy} size="sm">
          {copied ? <FiCheck /> : <FiCopy />}
        </ActionIcon>
      </div>
    </Blockquote>
  );
};

export default Translation;
