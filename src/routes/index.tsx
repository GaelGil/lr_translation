// routes/index.tsx
import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Text } from "@mantine/core";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <AppShell>
      <AppShell.Header>
        <Text c="black">Header</Text>
      </AppShell.Header>
      <AppShell.Navbar>
        <Text>Navbar</Text>
      </AppShell.Navbar>
      <Text>Sidebar</Text>
      <AppShell.Main>
        <Text>Main</Text>
      </AppShell.Main>
    </AppShell>
  );
}
