import {
  AppShell,
  Box,
  Container,
  Flex,
  Paper,
  Select,
  Stack,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { createFileRoute } from "@tanstack/react-router";
import InputBar from "@/components/Translation/Input/InputBar";
import HeaderMessage from "@/components/Translation/Messages/HeaderMesssage";
import Translation from "@/components/Translation/Messages/Translation";
import Samples from "@/components/Translation/Samples";
import UserSubmisions from "@/components/Translation/UserSubmissions";
import { TranslationProvider } from "@/contexts/TranslationContext";
import HomeSideBar from "../components/Common/Home/HomeSideBar";
export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const [collapsed, { toggle: toggleCollapsed }] = useDisclosure(false);

  const fullWidth = 350;
  const collapsedWidth = 60;

  const sidebarWidth = collapsed ? collapsedWidth : fullWidth;

  return (
    <TranslationProvider>
      <AppShell
        layout="alt"
        navbar={{
          width: sidebarWidth,
          breakpoint: "sm",
          collapsed: { mobile: false, desktop: false },
        }}
        padding="md"
        bg={"black"}
      >
        <AppShell.Navbar p="md" withBorder={false} bg={"black"}>
          <HomeSideBar collapsed={collapsed} toggle={toggleCollapsed} />
        </AppShell.Navbar>
        <AppShell.Main>
          <Container
            fluid
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "100vh",
              paddingBottom: "10vh",
            }}
          >
            <Stack w="100%" maw={"900"}>
              <Box ta="center">
                <HeaderMessage />
              </Box>
              {/*<Paper radius="lg" p="xl" w="100%" maw={"900"}>*/}
              <Flex gap="md" align="stretch" wrap="nowrap">
                <Box style={{ flex: 1 }} c="white">
                  <Paper
                    p="md"
                    radius="lg"
                    style={{
                      backgroundColor: "#1a1a1a",
                      border: "1px solid #333",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Text size="sm" fw={500} mb="xs">
                      Spanish
                    </Text>
                    <InputBar />
                  </Paper>
                </Box>

                <Box style={{ flex: 1 }}>
                  <Paper
                    p="md"
                    radius="lg"
                    style={{
                      backgroundColor: "#1a1a1a",
                      border: "1px solid #333",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Select
                      placeholder="Select language"
                      data={["English", "Na"]}
                      mb="xs"
                      variant="unstyled"
                    />
                    <Translation />
                  </Paper>
                </Box>
              </Flex>
              <Flex gap="md" align="stretch" wrap="nowrap">
                <Box style={{ flex: 1 }}>
                  <Samples />
                </Box>
                <Box style={{ flex: 1 }}>
                  <UserSubmisions />
                </Box>
              </Flex>
            </Stack>
          </Container>
        </AppShell.Main>
      </AppShell>
    </TranslationProvider>
  );
}
