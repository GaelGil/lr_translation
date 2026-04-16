import { ActionIcon, Box, Textarea, Tooltip } from "@mantine/core";
import { FiX } from "react-icons/fi";

import { useTranslationContext } from "@/contexts/TranslationContext";
import RightSection from "./RightSection";

const InputBar: React.FC = () => {
  const { src, setSrc, handleSubmit, isStreaming, isSubmitting } =
    useTranslationContext();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      style={{ flex: 1, display: "flex", flexDirection: "column" }}
    >
      <Box
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <Textarea
          style={{ flex: 1 }}
          variant="unstyled"
          c="white"
          placeholder="Enter text to translate..."
          autosize
          minRows={6}
          maxRows={12}
          disabled={isStreaming || isSubmitting}
          value={src}
          onChange={(e) => setSrc(e.target.value)}
        />
        <Box
          style={{
            position: "absolute",
            bottom: 8,
            right: src && !isStreaming && !isSubmitting ? 40 : 8,
          }}
        >
          <RightSection />
        </Box>
        {src && !isStreaming && !isSubmitting && (
          <Box
            style={{
              position: "absolute",
              bottom: 8,
              right: 0,
            }}
          >
            <Tooltip label="Clear">
              <ActionIcon
                variant="subtle"
                color="gray"
                onClick={() => setSrc("")}
                size="sm"
              >
                <FiX size={16} color="red" />
              </ActionIcon>
            </Tooltip>
          </Box>
        )}
      </Box>
    </form>
  );
};

export default InputBar;
