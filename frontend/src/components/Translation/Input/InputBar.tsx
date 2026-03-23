import { Textarea } from "@mantine/core"

import { useTranslationContext } from "@/contexts/TranslationContext"
import RightSection from "./RightSection"

const InputBar: React.FC = () => {
  const { src, setSrc, handleSubmit, isStreaming, isSubmitting } =
    useTranslationContext()

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmit()
      }}
    >
      <Textarea
        style={{ flex: 1 }}
        // variant="unstyled"
        placeholder={isStreaming ? "Translating..." : "Ask Anything"}
        radius="xl"
        minRows={4}
        maxRows={8}
        autosize
        w="100%"
        size="lg"
        disabled={isStreaming || isSubmitting}
        rightSection={<RightSection />}
        value={src}
        onChange={(e) => setSrc(e.target.value)}
      />
    </form>
  )
}

export default InputBar
