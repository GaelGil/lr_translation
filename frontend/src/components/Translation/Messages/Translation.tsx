import { ActionIcon, Box, Textarea, Tooltip } from "@mantine/core"
import { useState } from "react"
import { FiCheck, FiCopy } from "react-icons/fi"
import { useTranslationContext } from "@/contexts/TranslationContext"

const PLACEHOLDER =
  "Life is like an npm install – you never know what you are going to get."

const Translation: React.FC = () => {
  const [copied, setCopied] = useState(false)
  const { streamingContent, isStreaming, isSubmitting } =
    useTranslationContext()

  const handleCopy = async () => {
    await navigator.clipboard.writeText(streamingContent || PLACEHOLDER)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const displayText = streamingContent || PLACEHOLDER
  const hasContent = streamingContent.length > 0

  return (
    <Box
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
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
      {hasContent && !isStreaming && (
        <Box
          style={{
            position: "absolute",
            bottom: 8,
            right: 8,
          }}
        >
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
        </Box>
      )}
    </Box>
  )
}

export default Translation
