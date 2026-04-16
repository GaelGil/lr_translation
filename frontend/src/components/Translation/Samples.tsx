"use client";

import { Accordion, Box, Flex, ScrollArea, Stack, Text } from "@mantine/core";
import { FiHelpCircle } from "react-icons/fi";

import { useTranslationContext } from "@/contexts/TranslationContext";

interface PromptExample {
  text: string;
}

const SENTENCES: PromptExample[] = [
  {
    text: "Hola, ¿Como estas?",
  },
  {
    text: "Portrait of an elderly woman with weathered hands, soft cinematic lighting, shallow depth of field",
  },
  {
    text: "Cyberpunk city street at night with neon signs, rain-soaked pavement reflecting colorful lights, flying vehicles in the distance",
  },
  {
    text: "Hyper-realistic close-up of a dewdrop on a rose petal with refracted light and soft bokeh background",
  },
  {
    text: "Ancient library with towering bookshelves, spiral staircase, warm golden lamplight, dust particles floating in the air",
  },
  {
    text: "Futuristic robot sitting alone on a bench in a park, watching sunset, melancholic atmosphere, detailed mechanical design",
  },
  {
    text: "Abstract fluid art with swirling deep blues, purples, and gold metallic accents, dynamic movement",
  },
];

const Samples = () => {
  const { setSrc } = useTranslationContext();

  return (
    <Accordion>
      <Accordion.Item value="how-to-prompt">
        <Accordion.Control bg="transparent">
          <Flex align="center" gap="xs" c="white">
            <FiHelpCircle size={16} />
            <Text size="sm" fw={500}>
              Sample Spanish Sentences
            </Text>
          </Flex>
        </Accordion.Control>
        <Accordion.Panel>
          <Box p="xs">
            <ScrollArea.Autosize h={200}>
              <Stack gap="xs">
                {SENTENCES.map((example, index) => (
                  <Box
                    key={index}
                    p="xs"
                    style={{
                      borderRadius: 6,
                      border: "1px solid var(--mantine-color-dark-5)",
                      backgroundColor: "var(--mantine-color-dark-6)",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                    onClick={() => setSrc(example.text)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor =
                        "var(--mantine-color-teal-7)";
                      e.currentTarget.style.backgroundColor =
                        "var(--mantine-color-dark-5)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor =
                        "var(--mantine-color-dark-5)";
                      e.currentTarget.style.backgroundColor =
                        "var(--mantine-color-dark-6)";
                    }}
                  >
                    <Flex justify="space-between" align="flex-start">
                      <Box style={{ flex: 1, overflow: "hidden" }}>
                        <Text size="xs" lineClamp={2} c="gray.3">
                          {example.text}
                        </Text>
                      </Box>
                    </Flex>
                  </Box>
                ))}
              </Stack>
            </ScrollArea.Autosize>
          </Box>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};

export default Samples;
