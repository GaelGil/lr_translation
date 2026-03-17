import { Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import {
  type TranslationRequest,
  type TranslationResponse,
  TranslationService,
} from "@/client";
import type { ApiError } from "@/client/core/ApiError";
import { TranslationStatusSchema } from "@/client/schemas.gen";
import useCustomToast from "@/hooks/useCustomToast";
import { useMessageSocket } from "@/hooks/useMessageSocket";
import { handleError } from "@/utils";
import RightSection from "./RightSection";

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
  const { showErrorToast } = useCustomToast();
  const [newMessageId, setNewMessageId] = useState("");
  const pendingChatRef = useRef<{
    sessionId: string;
    assistantMessageId: string;
    model_name: string;
  } | null>(null);

  const { streamingMessage, isStreaming, messageType } = useMessageSocket({
    messageId: newMessageId,
    pendingChatRef,
    onMessageComplete: () => {
      queryClient.invalidateQueries({ queryKey: ["session", chatId] });
    },
  });

  useEffect(() => {
    setStreamingContent(streamingMessage);
  }, [streamingMessage, setStreamingContent]);

  useEffect(() => {
    if (newMessageId) {
      setStreamingMessageId(newMessageId);
    }
  }, [newMessageId, setStreamingMessageId]);

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
        rightSection={
          <RightSection
            sendMessage={sendMessage}
            translationForm={translationForm}
          />
        }
        {...translationForm.getInputProps("src")}
      />
    </form>
  );
};

export default InputBar;
