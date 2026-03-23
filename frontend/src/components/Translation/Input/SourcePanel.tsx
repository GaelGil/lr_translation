import { ActionIcon, Box, Paper, Text, Textarea, Tooltip } from "@mantine/core"
import { FiX } from "react-icons/fi"
import { useTranslationContext } from "@/contexts/TranslationContext"

const SourcePanel: React.FC = () => {
  const { src, setSrc, clearAll, isStreaming, isSubmitting } =
    useTranslationContext()

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
        <Text size="sm" c="dimmed" fw={500}>
          Spanish
        </Text>
        {src && !isStreaming && !isSubmitting && (
          <Tooltip label="Clear">
            <ActionIcon
              variant="subtle"
              color="gray"
              onClick={clearAll}
              size="sm"
            >
              <FiX size={16} />
            </ActionIcon>
          </Tooltip>
        )}
      </Box>
      <Textarea
        placeholder="Enter text to translate..."
        variant="unstyled"
        autosize
        minRows={6}
        maxRows={12}
        disabled={isStreaming || isSubmitting}
        value={src}
        onChange={(e) => setSrc(e.target.value)}
        style={{ flex: 1 }}
      />
    </Paper>
  )
}

export default SourcePanel
