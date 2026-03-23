import { Button } from "@mantine/core"
import { FaSquare } from "react-icons/fa"
import { FiArrowRight } from "react-icons/fi"
import { useTranslationContext } from "@/contexts/TranslationContext"

const TranslateButton: React.FC = () => {
  const { src, isSubmitting, isStreaming, isValid, handleSubmit } =
    useTranslationContext()

  if (!src || !isValid) return null

  return (
    <Button
      onClick={handleSubmit}
      disabled={isStreaming || isSubmitting}
      radius="xl"
      size="md"
      bg={isSubmitting || isStreaming ? "gray" : "#6366f1"}
      style={{
        transition: "all 0.2s ease",
      }}
    >
      {isSubmitting || isStreaming ? (
        <FaSquare size={20} color="white" />
      ) : (
        <FiArrowRight size={20} color="white" />
      )}
    </Button>
  )
}

export default TranslateButton
