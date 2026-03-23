import { AppShell, Box, Container, Flex, Paper } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { createFileRoute } from "@tanstack/react-router"
import SourcePanel from "@/components/Translation/Input/SourcePanel"
import TranslateButton from "@/components/Translation/Input/TranslateButton"
import TargetPanel from "@/components/Translation/Messages/TargetPanel"
import { TranslationProvider } from "@/contexts/TranslationContext"
import HomeSideBar from "../components/Common/Home/HomeSideBar"
export const Route = createFileRoute("/")({
  component: HomePage,
})

function HomePage() {
  const [collapsed, { toggle: toggleCollapsed }] = useDisclosure(false)

  const fullWidth = 350
  const collapsedWidth = 60

  const sidebarWidth = collapsed ? collapsedWidth : fullWidth

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
            <Paper
              radius="lg"
              p="xl"
              style={{
                backgroundColor: "#0d0d0d",
                border: "1px solid #222",
                width: "100%",
                maxWidth: 800,
              }}
            >
              <Flex gap="md" align="stretch" wrap="nowrap">
                <Box style={{ flex: 1 }}>
                  <SourcePanel />
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
                  <TargetPanel />
                </Box>
              </Flex>
            </Paper>
          </Container>
        </AppShell.Main>
      </AppShell>
    </TranslationProvider>
  )
}
