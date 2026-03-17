import { Textarea } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useEffect, useRef, useState } from "react"
import {
  type TranslationRequest,
  type TranslationResponse,
  TranslationService,
} from "@/client"
import type { ApiError } from "@/client/core/ApiError"
import { TranslationStatusSchema } from "@/client/schemas.gen"
import useCustomToast from "@/hooks/useCustomToast"
import { useMessageSocket } from "@/hooks/useMessageSocket"
import { handleError } from "@/utils"
import RightSection from "./RightSection"

interface InputBarProps {
  chatId: string | undefined
  setStreamingContent: (value: string) => void
  setStreamingMessageId: (id: string | null) => void
  setMessageType: (value: string) => void
  setIsStreaming: (value: boolean) => void
}

const InputBar: React.FC<InputBarProps> = ({
  chatId,
  setStreamingContent,
  setStreamingMessageId,
  setMessageType,
  setIsStreaming,
}) => {
  const queryClient = useQueryClient()
  const { showErrorToast } = useCustomToast()
  const [newMessageId, setNewMessageId] = useState("")
  const pendingChatRef = useRef<{
    sessionId: string
    assistantMessageId: string
    model_name: string
  } | null>(null)

  const sendMessage = useMutation<
    TranslationResponse,
    ApiError,
    TranslationRequest
  >({
    mutationFn: async (data: TranslationRequest) => {
      translationForm.reset()
      const res = await TranslationService.translate({
        requestBody: data,
      })
      return res
    },
    onSuccess: () => {
      translationForm.setFieldValue("src", "")
    },
    onError: (err: ApiError) => {
      const body = err.body as { detail?: string } | undefined
      const message = body?.detail ?? "An error occurred"
      showErrorToast(message)
      handleError(err)
    },
    onSettled: () => {
      queryClient.refetchQueries({ queryKey: ["messages", chatId] })
    },
  })

  const translationForm = useForm<TranslationRequest>({
    initialValues: {
      src: "",
      target: null,
      status: TranslationStatusSchema.enum[0],
    },
  })

  const handleSubmit = async (values: TranslationRequest) => {
    try {
      const res = await sendMessage.mutateAsync(values)
      const sessionId = chatId || res.id
      setNewMessageId(res.id)
      pendingChatRef.current = {
        sessionId,
        assistantMessageId: res.id,
        model_name: "default",
      }
      await queryClient.refetchQueries({
        queryKey: ["messages", sessionId],
      })
    } catch (err) {
      console.error("Error sending message or streaming:", err)
    }
  }

  const { streamingMessage, isStreaming, messageType } = useMessageSocket({
    messageId: newMessageId,
    pendingChatRef,
    onMessageComplete: () => {
      queryClient.invalidateQueries({ queryKey: ["session", chatId] })
    },
  })

  useEffect(() => {
    setStreamingContent(streamingMessage)
  }, [streamingMessage, setStreamingContent])

  useEffect(() => {
    if (newMessageId) {
      setStreamingMessageId(newMessageId)
    }
  }, [newMessageId, setStreamingMessageId])

  useEffect(() => {
    if (messageType) {
      setMessageType(messageType)
    }
  }, [messageType, setMessageType])

  useEffect(() => {
    setIsStreaming(isStreaming)
  }, [isStreaming, setIsStreaming])

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmit(translationForm.getValues())
      }}
    >
      <Textarea
        placeholder="Ask Anything"
        radius="xl"
        autosize
        w="100%"
        size="lg"
        rightSection={
          <RightSection
            sendMessage={sendMessage}
            translationForm={translationForm}
          />
        }
        {...translationForm.getInputProps("src")}
      />
    </form>
  )
}

export default InputBar
