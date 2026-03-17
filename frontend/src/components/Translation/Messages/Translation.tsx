import { Blockquote, ActionIcon } from "@mantine/core";
import { FiCopy, FiCheck } from "react-icons/fi";
import { useState } from "react";
const Translation = () => {
  const [copied, setCopied] = useState(false);
  const text =
    "Life is like an npm install – you never know what you are going to get.";
  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <Blockquote color="red" cite={null} icon={null}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {text}
        <ActionIcon variant="subtle" onClick={handleCopy} size="sm">
          {copied ? <FiCheck /> : <FiCopy />}
        </ActionIcon>
      </div>
    </Blockquote>
  );
};
export default Translation;
