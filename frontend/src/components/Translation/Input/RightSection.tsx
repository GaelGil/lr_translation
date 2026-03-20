import { Button } from "@mantine/core";
import { FaSquare } from "react-icons/fa";
import { FiArrowUp } from "react-icons/fi";
import { useTranslationContext } from "@/contexts/TranslationContext";

const RightSection: React.FC = () => {
  const { src, isSubmitting, isValid, isStreaming } = useTranslationContext();
  if (!src || isSubmitting || isStreaming) return null;

  return (
    <Button
      type="submit"
      disabled={!isValid}
      radius="xl"
      bg={isSubmitting ? "gray" : "white"}
    >
      {isSubmitting ? (
        <FaSquare size={40} color="white" />
      ) : (
        <FiArrowUp size={80} color="black" />
      )}
    </Button>
  );
};

export default RightSection;
