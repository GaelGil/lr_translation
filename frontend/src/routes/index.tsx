// routes/index.tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import { useDisclosure } from "@mantine/hooks";
import { AppShell, Anchor, Group, Container, Stack, Box } from "@mantine/core";
import { Button } from "@/components/ui/button";
import InputBar from "@/components/Chat/Input/InputBar";
import InitMessage from "@/components/Chat/Messages/InitMesssage";
// import HomeBanner from "../components/Common/Home/HomeBanner";
import { isLoggedIn } from "@/hooks/useAuth";
import HomeSideBar from "../components/Common/Home/HomeSideBar";
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
            <Box w="100%" bottom={0} pos={"sticky"} p="md" mt="xl">
              <InputBar
                chatId={undefined}
                setStreamingContent={() => {}}
                setStreamingMessageId={() => {}}
                setIsStreaming={() => {}}
                setMessageType={() => {}}
              />
            </Box>
          </Stack>
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}
