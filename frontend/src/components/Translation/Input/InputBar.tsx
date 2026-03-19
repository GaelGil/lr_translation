import { Textarea } from "@mantine/core"

import { useTranslationContext } from "@/contexts/TranslationContext"
import RightSection from "./RightSection"

const InputBar: React.FC = () => {
  const { src, setSrc, handleSubmit } = useTranslationContext()

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmit()
      }}
    >
      <Textarea
        placeholder="Ask Anything"
        radius="xl"
        autosize
        w="100%"
        size="lg"
        rightSection={<RightSection />}
        value={src}
        onChange={(e) => setSrc(e.target.value)}
      />
    </form>
  )
}

export default InputBar
