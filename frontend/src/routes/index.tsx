// routes/index.tsx

import {
  Anchor,
  AppShell,
  Box,
  Container,
  Flex,
  Group,
  Select,
  Stack,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { createFileRoute, Link } from "@tanstack/react-router";
import InputBar from "@/components/Translation/Input/InputBar";
import InitMessage from "@/components/Translation/Messages/InitMesssage";
import { Button } from "@/components/ui/button";
import { isLoggedIn } from "@/hooks/useAuth";
import HomeSideBar from "../components/Common/Home/HomeSideBar";
import Translation from "@/components/Translation/Messages/Translation";
export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const loggedIn = isLoggedIn();
  const [collapsed, { toggle: toggleCollapsed }] = useDisclosure(false);

  const fullWidth = 350;
  const collapsedWidth = 60;

  const sidebarWidth = collapsed ? collapsedWidth : fullWidth;

  return (
    <AppShell
      layout="alt"
      header={{ height: 60 }}
      navbar={{
        width: sidebarWidth,
        breakpoint: "sm",
        collapsed: { mobile: false, desktop: false },
      }}
      padding="md"
      bg={"black"}
    >
      <AppShell.Header withBorder={false} bg={"black"}>
        <Group h="100%" px="md" justify="flex-end">
          <Anchor
            component={Link}
            to={loggedIn ? "/chat" : "/auth/login"}
            underline="never"
          >
            <Button radius="xl">{loggedIn ? "Chat" : "Login"}</Button>
          </Anchor>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md" withBorder={false} bg={"black"}>
        <HomeSideBar collapsed={collapsed} toggle={toggleCollapsed} />
      </AppShell.Navbar>
      <AppShell.Main>
        <Container
          fluid
          style={{ display: "flex", flexDirection: "column" }}
          w="75%"
          h="100%"
          mt="15%"
        >
          <Stack align="center">
            <Box ta="center" px="md" display={"flex"}>
              <InitMessage />
            </Box>
            <Box>
              <Select
                label="Language"
                placeholder="Spanish to English"
                data={["Spanish to English", "Spanish to Na"]}
              />
            </Box>
            <Flex>
              <Box w="100%" bottom={0} pos={"sticky"} p="md" mt="xl">
                <InputBar
                  chatId={undefined}
                  setStreamingContent={() => {}}
                  setStreamingMessageId={() => {}}
                  setIsStreaming={() => {}}
                  setMessageType={() => {}}
                />
              </Box>
              <Box w="100%" bottom={0} pos={"sticky"} p="md" mt="xl">
                <Translation />
              </Box>
            </Flex>
          </Stack>
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}
