import {
  AppShell,
  Box,
  Button,
  Container,
  Flex,
  Paper,
  Select,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { createFileRoute } from "@tanstack/react-router";
import { FaSquare } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import InputBar from "@/components/Translation/Input/InputBar";
import Translation from "@/components/Translation/Messages/Translation";
import {
  TranslationProvider,
  useTranslationContext,
} from "@/contexts/TranslationContext";
import HomeSideBar from "../components/Common/Home/HomeSideBar";
export const Route = createFileRoute("/")({
  component: HomePage,
});

const TranslateButton: React.FC = () => {
  const { src, isSubmitting, isStreaming, isValid, handleSubmit } =
    useTranslationContext();

  if (!src || !isValid) return null;

  return (
    <Button
      onClick={handleSubmit}
      disabled={isStreaming || isSubmitting}
      radius="xl"
      size="md"
      bg={isSubmitting || isStreaming ? "gray" : "#6366f1"}
    >
      {isSubmitting || isStreaming ? (
        <FaSquare size={20} color="white" />
      ) : (
        <FiArrowRight size={20} color="white" />
      )}
    </Button>
  );
};

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
            <Paper radius="lg" p="xl" w="100%" maw={"900"}>
              <Flex gap="md" align="stretch" wrap="nowrap">
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
                    <Text size="sm" c="dimmed" fw={500} mb="xs">
                      Spanish
                    </Text>
                    <InputBar />
                  </Paper>
                </Box>
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <TranslateButton />
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
                      size="xs"
                      w={120}
                      mb="xs"
                      styles={{
                        input: {
                          backgroundColor: "transparent",
                          border: "none",
                          color: "#888",
                        },
                      }}
                    />
                    <Translation />
                  </Paper>
                </Box>
              </Flex>
            </Paper>
          </Container>
        </AppShell.Main>
      </AppShell>
    </TranslationProvider>
  );
}
