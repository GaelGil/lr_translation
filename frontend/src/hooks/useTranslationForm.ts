import { useMutation } from "@tanstack/react-query";
import { useForm } from "@mantine/form";
import { useState } from "react";
import {
  type TranslationRequest,
  type TranslationResponse,
  TranslationService,
} from "@/client";
import { TranslationStatusSchema } from "@/client/schemas.gen";

import { type ApiError } from "@/client";
import { handleError } from "@/utils";
import useCustomToast from "@/hooks/useCustomToast";

const { showErrorToast } = useCustomToast();

const useTranslationForm = () => {
  const [translationId, setTranslationId] = useState<string>("");

  const translate = useMutation<
    TranslationResponse,
    ApiError,
    TranslationRequest
  >({
    mutationFn: async (data: TranslationRequest) => {
      translationForm.reset();
      const res = await TranslationService.translate({
        requestBody: data,
      });
      return res;
    },
    onSuccess: () => {
      translationForm.setFieldValue("src", "");
    },
    onError: (err: ApiError) => {
      const body = err.body as { detail?: string } | undefined;
      const message = body?.detail ?? "An error occurred";
      showErrorToast(message);
      handleError(err);
    },
  });

  const translationForm = useForm<TranslationRequest>({
    initialValues: {
      src: "",
      target: null,
      status: TranslationStatusSchema.enum[0],
    },
  });

  const handleSubmit = async (values: TranslationRequest) => {
    try {
      const res = await translate.mutateAsync(values);
      setTranslationId(res.id);
    } catch (err) {
      console.error("Error sending message or streaming:", err);
    }
  };
  return {
    handleSubmit,
    translationForm,
    translate,
    translationId,
  };
};

export default useTranslationForm;
