import { Box, Title } from "@mantine/core";

const InitMessage = () => {
  return (
    <Box maw={720} ta="center">
      <Title order={2} fw={300} c="white">
        Enter text in language to translate
      </Title>
    </Box>
  );
};

export default InitMessage;
