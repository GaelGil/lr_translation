import {
  AppShell,
  Box,
  Container,
  Flex,
  Select,
  Stack,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { createFileRoute } from "@tanstack/react-router";
import InputBar from "@/components/Translation/Input/InputBar";
import HeaderMessage from "@/components/Translation/Messages/HeaderMesssage";
import Translation from "@/components/Translation/Messages/Translation";
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
            style={{ display: "flex", flexDirection: "column" }}
            w="75%"
            h="100%"
            mt="15%"
          >
            <Stack align="center">
              <Box ta="center">
                <HeaderMessage />
              </Box>
              <Flex gap={"xl"}>
                <Box w="100%" bottom={0} pos={"sticky"} p="md" mt="xl">
                  <Text>Spanish</Text>
                  <InputBar />
                </Box>
                <Box w="100%" bottom={0} pos={"sticky"} p="md" mt="xl">
                  <Select
                    label="Language"
                    placeholder="Spanish to English"
                    data={["English", "Na"]}
                    variant="filled"
                  />
                  <Translation />
                </Box>
              </Flex>
              <Flex></Flex>
            </Stack>
          </Container>
        </AppShell.Main>
      </AppShell>
    </TranslationProvider>
  );
}
