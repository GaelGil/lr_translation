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
import { TranslationService } from "@/client";
import { useQuery } from "@tanstack/react-query";

function getUserSubmissions() {
  return {
    queryFn: () => TranslationService.getTranslations(),
    queryKey: ["userSubmisions"],
  };
}

const UserSubmisions = () => {
  const {
    data: userSubmissions,
    isLoading,
    isError,
  } = useQuery({
    ...getUserSubmissions(),
  });

  const translations = userSubmissions?.translations;

  return (
    <Accordion color="white">
      <Accordion.Item value="how-to-prompt">
        <Accordion.Control>
          <Flex align="center" gap="xs">
            <FiHelpCircle size={16} color="white" />
            <Text size="sm" fw={500}>
              User Submissions
            </Text>
          </Flex>
        </Accordion.Control>
        <Accordion.Panel>
          <Box p="xs">
            <ScrollArea.Autosize h={200}>
              {isLoading ? (
                <Text>Loading</Text>
              ) : isError ? (
                <Text c="red">Error loading translations</Text>
              ) : translations?.length === 0 ? (
                <Text>Nothing here yet</Text>
              ) : (
                <Stack gap="xs">
                  {translations?.map((example, index) => (
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
                            {example.target}
                          </Text>
                        </Box>
                      </Grid.Col>
                    </Grid>
                  ))}
                </Stack>
              )}
            </ScrollArea.Autosize>
          </Box>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};

export default UserSubmisions;
