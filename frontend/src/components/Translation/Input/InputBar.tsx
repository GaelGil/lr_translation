import { Textarea } from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

import { useMessageSocket } from "@/hooks/useMessageSocket";
import RightSection from "./RightSection";
import useTranslationForm from "@/hooks/useTranslationForm";

interface InputBarProps {
  chatId: string | undefined;
  setStreamingContent: (value: string) => void;
  setStreamingMessageId: (id: string | null) => void;
  setMessageType: (value: string) => void;
  setIsStreaming: (value: boolean) => void;
}

const InputBar: React.FC<InputBarProps> = ({
  chatId,
  setStreamingContent,
  setStreamingMessageId,
  setMessageType,
  setIsStreaming,
}) => {
  const queryClient = useQueryClient();
  const { handleSubmit, translationForm, translationId } = useTranslationForm();
  const pendingChatRef = useRef<{
    sessionId: string;
    assistantMessageId: string;
    model_name: string;
  } | null>(null);

  const { streamingMessage, isStreaming, messageType } = useMessageSocket({
    messageId: translationId,
    pendingChatRef,
    onMessageComplete: () => {
      queryClient.invalidateQueries({ queryKey: ["session", chatId] });
    },
  });

  useEffect(() => {
    setStreamingContent(streamingMessage);
  }, [streamingMessage, setStreamingContent]);

  useEffect(() => {
    if (translationId) {
      setStreamingMessageId(translationId);
    }
  }, [translationId, setStreamingMessageId]);

  useEffect(() => {
    if (messageType) {
      setMessageType(messageType);
    }
  }, [messageType, setMessageType]);

  useEffect(() => {
    setIsStreaming(isStreaming);
  }, [isStreaming, setIsStreaming]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(translationForm.getValues());
      }}
    >
      <Textarea
        placeholder="Ask Anything"
        radius="xl"
        autosize
        w="100%"
        size="lg"
        rightSection={<RightSection />}
        {...translationForm.getInputProps("src")}
      />
    </form>
  );
};

export default InputBar;
