"use client";

import {
  Accordion,
  Box,
  Flex,
  Grid,
  ScrollArea,
  Stack,
  Text,
} from "@mantine/core";
import { FiHelpCircle } from "react-icons/fi";

interface PromptExample {
  src: string;
  response: string;
}

const SENTENCES: PromptExample[] = [
  {
    src: "Hola, ¿Como estas?",
    response: "Hola, ¿Como estas?",
  },
  {
    src: "Portrait of an elderly woman with weathered hands, soft cinematic lighting, shallow depth of field",
    response: "Hola, ¿Como estas?",
  },
  {
    src: "Cyberpunk city street at night with neon signs, rain-soaked pavement reflecting colorful lights, flying vehicles in the distance",
    response: "Hola, ¿Como estas?",
  },
  {
    src: "Hyper-realistic close-up of a dewdrop on a rose petal with refracted light and soft bokeh background",
    response: "Hola, ¿Como estas?",
  },
  {
    src: "Ancient library with towering bookshelves, spiral staircase, warm golden lamplight, dust particles floating in the air",
    response: "Hola, ¿Como estas?",
  },
  {
    src: "Futuristic robot sitting alone on a bench in a park, watching sunset, melancholic atmosphere, detailed mechanical design",
    response: "Hola, ¿Como estas?",
  },
  {
    src: "Abstract fluid art with swirling deep blues, purples, and gold metallic accents, dynamic movement",
    response: "Hola, ¿Como estas?",
  },
];

const UserSubmisions = () => {
  return (
    <Accordion variant="filled">
      <Accordion.Item value="how-to-prompt">
        <Accordion.Control>
          <Flex align="center" gap="xs">
            <FiHelpCircle size={16} color="var(--mantine-color-dimmed)" />
            <Text size="sm" fw={500}>
              User Submissions
            </Text>
          </Flex>
        </Accordion.Control>
        <Accordion.Panel>
          <Box p="xs">
            <ScrollArea.Autosize mah={300}>
              <Stack gap="xs">
                {SENTENCES.map((example, index) => (
                  <Grid key={index} gutter="xs">
                    <Grid.Col span={6}>
                      <Box
                        p="xs"
                        style={{
                          borderRadius: 6,
                          border: "1px solid var(--mantine-color-dark-5)",
                          backgroundColor: "var(--mantine-color-dark-6)",
                        }}
                      >
                        <Text size="xs" mb={4}>
                          Source
                        </Text>
                        <Text size="xs" lineClamp={2} c="gray.3">
                          {example.src}
                        </Text>
                      </Box>
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Box
                        p="xs"
                        style={{
                          borderRadius: 6,
                          border: "1px solid var(--mantine-color-dark-5)",
                          backgroundColor: "var(--mantine-color-dark-6)",
                        }}
                      >
                        <Text size="xs" c="teal" mb={4}>
                          Target
                        </Text>
                        <Text size="xs" lineClamp={2} c="gray.3">
                          {example.response}
                        </Text>
                      </Box>
                    </Grid.Col>
                  </Grid>
                ))}
              </Stack>
            </ScrollArea.Autosize>
          </Box>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};

export default UserSubmisions;
