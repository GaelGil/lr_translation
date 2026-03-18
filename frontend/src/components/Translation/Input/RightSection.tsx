import { Box, Button } from "@mantine/core";
import { FaSquare } from "react-icons/fa";
import { FiArrowUp } from "react-icons/fi";
import useTranslationForm from "@/hooks/useTranslationForm";

import type { TranslationRequest } from "@/client";

// interface RightSectionProps {
//   sendMessage: { isPending: boolean }
//   translationForm: {
//     values: TranslationRequest
//     isValid: () => boolean
//   }
// }

const RightSection = () => {
  const { handleSubmit, translationForm, translate, translationId } =
    useTranslationForm();
  if (!translationForm.values.src || translate.isPending) return null;

  return (
    <Box>
      <Button
        type="submit"
        disabled={!translationForm.isValid()}
        radius="xl"
        bg={translate.isPending ? "gray" : "white"}
      >
        {translate.isPending ? (
          <FaSquare size={24} color="white" />
        ) : (
          <FiArrowUp size={24} color="black" />
        )}
      </Button>
    </Box>
  );
};

export default RightSection;
