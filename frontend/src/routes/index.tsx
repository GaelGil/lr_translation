import {
  AppShell,
  Select,
  Box,
  Container,
  Group,
  Paper,
  SimpleGrid,
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
  const [collapsed, { toggle: toggleCollapsed }] = useDisclosure(true);

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
          collapsed: { mobile: true, desktop: false },
        }}
        padding="md"
        bg="var(--app-bg)"
      >
        <AppShell.Navbar p="md" withBorder={false} bg="var(--app-bg)">
          <HomeSideBar collapsed={collapsed} toggle={toggleCollapsed} />
        </AppShell.Navbar>
        <AppShell.Main>
          <Container
            id="main-content"
            fluid
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "100svh",
              paddingTop: "max(2rem, env(safe-area-inset-top))",
              paddingBottom: "max(10vh, env(safe-area-inset-bottom))",
              overflowX: "hidden",
            }}
          >
            <Stack w="100%" maw={1080} gap="lg">
              <Stack gap="xs" ta="center" align="center">
                <HeaderMessage />
                <Text
                  c="var(--app-text-muted)"
                  size="lg"
                  maw={620}
                  style={{ textWrap: "balance" }}
                >
                  Paste Spanish text, press Translate, and copy the English
                  result.
                </Text>
              </Stack>


                <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
                  <Box c="var(--app-text)" style={{ minWidth: 0 }}>
                    <Paper p="md" radius="lg" bg="transparent" >
                      <Stack gap={4} mb="xs">
                        <Group justify="space-between" gap="xs">
                          <Text
                            component="label"
                            htmlFor="translation-source"
                            size="sm"
                            fw={700}
                          >
                            Spanish
                          </Text>
                        </Group>
                      </Stack>
                      <InputBar />
                    </Paper>
                  </Box>

                  <Box style={{ minWidth: 0 }}>
                    <Paper p="md" radius="lg" >
                      <Stack gap={4} mb="xs">
                        <Group justify="space-between" gap="xs">
                          <Select
                            placeholder="Pick value"
                            defaultValue={"English"}
                            data={['English', 'Nahuatl']}
                          />
                        </Group>
                      </Stack>
                      <Translation />
                    </Paper>
                  </Box>
                </SimpleGrid>

              <Stack gap="xs">
                <Text c="var(--app-text)" fw={700} size="sm">
                  Need an Example?
                </Text>
                <Text c="var(--app-text-muted)" size="sm">
                  Try a sample sentence or review recent public submissions.
                </Text>
              </Stack>
              <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
                <Box style={{ minWidth: 0 }}>
                  <Samples />
                </Box>
                <Box style={{ minWidth: 0 }}>
                  <UserSubmisions />
                </Box>
              </SimpleGrid>
            </Stack>
          </Container>
        </AppShell.Main>
      </AppShell>
    </TranslationProvider>
  );
}
