import {
  ActionIcon,
  Box,
  Paper,
  Select,
  Textarea,
  Tooltip,
} from "@mantine/core"
import { useState } from "react"
import { FiCheck, FiCopy } from "react-icons/fi"
import { useTranslationContext } from "@/contexts/TranslationContext"

const PLACEHOLDER =
  "Life is like an npm install – you never know what you are going to get."

const TargetPanel: React.FC = () => {
  const [copied, setCopied] = useState(false)
  const { streamingContent, target, setTarget, isStreaming, isSubmitting } =
    useTranslationContext()

  const handleCopy = async () => {
    await navigator.clipboard.writeText(streamingContent || PLACEHOLDER)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const displayText = streamingContent || PLACEHOLDER
  const hasContent = streamingContent.length > 0

  return (
    <Paper
      p="md"
      radius="lg"
      style={{
        backgroundColor: "#1a1a1a",
        border: "1px solid #333",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "8px",
        }}
      >
        <Select
          placeholder="Select language"
          data={["English", "Na"]}
          value={target}
          onChange={setTarget}
          size="xs"
          w={120}
          styles={{
            input: {
              backgroundColor: "transparent",
              border: "none",
              color: "#888",
            },
          }}
        />
        {hasContent && !isStreaming && (
          <Tooltip label={copied ? "Copied!" : "Copy"}>
            <ActionIcon
              variant="subtle"
              color={copied ? "green" : "gray"}
              onClick={handleCopy}
              size="sm"
            >
              {copied ? <FiCheck size={16} /> : <FiCopy size={16} />}
            </ActionIcon>
          </Tooltip>
        )}
      </Box>
      <Textarea
        placeholder={isStreaming ? "Translating..." : PLACEHOLDER}
        variant="unstyled"
        autosize
        minRows={6}
        maxRows={12}
        readOnly
        disabled={isStreaming || isSubmitting}
        value={isStreaming || isSubmitting ? "" : displayText}
        style={{ flex: 1, cursor: "default" }}
        styles={{
          input: {
            color: hasContent ? "#fff" : "#555",
          },
        }}
      />
    </Paper>
  )
}

export default TargetPanel
