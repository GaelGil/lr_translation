// routes/index.tsx
import { createFileRoute } from "@tanstack/react-router";
import { useDisclosure } from "@mantine/hooks";
import { AppShell } from "@mantine/core";
import HomeSideBar from "../components/Common/Home/HomeSideBar";
import LeafletMap from "@/components/Map";
export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const [collapsed, { toggle: toggleCollapsed }] = useDisclosure(false);

  const fullWidth = 200;
  const collapsedWidth = 60;

  const sidebarWidth = collapsed ? collapsedWidth : fullWidth;

  return (
    <AppShell
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
      <AppShell.Main m={0} pt={0}>
        <LeafletMap />
      </AppShell.Main>
    </AppShell>
  );
}
