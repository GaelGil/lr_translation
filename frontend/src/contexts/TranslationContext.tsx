import { useForm } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  type ApiError,
  type TranslationRequest,
  type TranslationResponse,
  TranslationService,
} from "@/client";
import { TranslationStatusSchema } from "@/client/schemas.gen";
import useCustomToast from "@/hooks/useCustomToast";
import { useTranslationSocket } from "@/hooks/useTransaltionSocket";
import { handleError } from "@/utils";

interface TranslationContextValue {
  src: string;
  target: string | null;
  setSrc: (value: string) => void;
  setTarget: (value: string | null) => void;
  handleSubmit: () => Promise<void>;
  translationId: string | null;
  isSubmitting: boolean;
  isValid: boolean;
  streamingContent: string;
  isStreaming: boolean;
  clearAll: () => void;
}

const TranslationContext = createContext<TranslationContextValue | null>(null);

export const useTranslationContext = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error(
      "useTranslationContext must be used within TranslationProvider",
    );
  }
  return context;
};

interface TranslationProviderProps {
  children: React.ReactNode;
}

export const TranslationProvider: React.FC<TranslationProviderProps> = ({
  children,
}) => {
  const [translationId, setTranslationId] = useState<string | null>(null);
  const [streamingContent, setStreamingContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { showErrorToast } = useCustomToast();

  const pendingChatRef = useRef<{
    sessionId: string;
    assistantMessageId: string;
    model_name: string;
  } | null>(null);

  const { isStreaming, streamingMessage } = useTranslationSocket({
    messageId: translationId,
    pendingChatRef,
  });

  useEffect(() => {
    setStreamingContent(streamingMessage);
  }, [streamingMessage]);

  const form = useForm<TranslationRequest>({
    initialValues: {
      src: "",
      translation: null,
      status: TranslationStatusSchema.enum[0],
    },
  });

  const translateMutation = useMutation<
    TranslationResponse,
    ApiError,
    TranslationRequest
  >({
    mutationFn: async (data: TranslationRequest) => {
      const res = await TranslationService.translate({
        requestBody: data,
      });
      return res;
    },
    onSuccess: () => {
      form.reset();
    },
    onError: (err: ApiError) => {
      const body = err.body as { detail?: string } | undefined;
      const message = body?.detail ?? "An error occurred";
      showErrorToast(message);
      handleError(err);
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });

  const handleSubmit = useCallback(async () => {
    if (!form.isValid()) return;
    if (!form.values.src.trim()) return;

    setIsSubmitting(true);
    setStreamingContent("");

    try {
      const res = await translateMutation.mutateAsync(form.values);
      setTranslationId(res.id);
    } catch (err) {
      console.error("Error submitting translation:", err);
      setIsSubmitting(false);
    }
  }, [form, translateMutation]);

  const setSrc = useCallback(
    (value: string) => {
      form.setFieldValue("src", value);
      if (value.trim()) {
        setStreamingContent("");
      }
    },
    [form],
  );

  const setTarget = useCallback(
    (value: string | null) => {
      form.setFieldValue("target", value);
    },
    [form],
  );

  const clearAll = useCallback(() => {
    form.setFieldValue("src", "");
    setStreamingContent("");
    setTranslationId(null);
  }, [form]);

  const value: TranslationContextValue = {
    src: form.values.src,
    target: form.values.translation,
    setSrc,
    setTarget,
    handleSubmit,
    translationId,
    isSubmitting,
    isValid: form.isValid(),
    streamingContent,
    isStreaming,
    clearAll,
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
};
