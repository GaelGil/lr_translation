// routes/index.tsx
import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@mantine/core";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return <AppShell></AppShell>;
}
