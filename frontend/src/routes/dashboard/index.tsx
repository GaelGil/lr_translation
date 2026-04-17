import { Box, Container, Tabs, Text, Title } from "@mantine/core";

import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FaEye, FaLanguage, FaLock, FaSun, FaUser } from "react-icons/fa";

import useAuth from "@/hooks/useAuth";
import TranslationsManager from "@/components/Admin/TranslationsManager";
import UserInformation from "@/components/UserSettings/UserInformation";
import ChangePassword from "@/components/UserSettings/ChangePassword";
import Appearance from "@/components/UserSettings/Appearance";
import DeleteAccount from "@/components/UserSettings/DeleteAccount";

export const Route = createFileRoute("/dashboard/")({
  component: Dashboard,
});

const tabsConfig = [
  { value: "home", title: "Home", icon: <FaUser />, component: null },
  {
    value: "profile",
    title: "My Profile",
    icon: <FaUser />,
    component: UserInformation,
  },
  {
    value: "password",
    title: "Password",
    icon: <FaLock />,
    component: ChangePassword,
  },
  {
    value: "appearance",
    title: "Appearance",
    icon: <FaSun />,
    component: Appearance,
  },
  {
    value: "translations",
    title: "Translations",
    icon: <FaLanguage />,
    component: TranslationsManager,
    adminOnly: true,
  },
  {
    value: "danger-zone",
    title: "Danger Zone",
    icon: <FaEye />,
    component: DeleteAccount,
  },
];

function Dashboard() {
  const { user: currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState<string | null>("home");

  const isSuperuser = currentUser?.is_superuser;

  const tabs = isSuperuser
    ? tabsConfig
    : tabsConfig.filter((tab) => !tab.adminOnly);

  return (
    <Container mah="full" c="white">
      <Title size="lg" pt={12} pb={12}>
        Dashboard
      </Title>

      <Tabs defaultValue="home" onChange={setActiveTab} variant="subtle">
        <Tabs.List>
          {tabs.map((tab) => (
            <Tabs.Tab
              key={tab.value}
              leftSection={tab.icon}
              value={tab.value}
              fw={activeTab === tab.value ? "800" : "normal"}
              size="xl"
            >
              {tab.title}
            </Tabs.Tab>
          ))}
        </Tabs.List>

        {tabs.map((tab) => (
          <Tabs.Panel key={tab.value} value={tab.value} pt="sm">
            {tab.value === "home" ? (
              <Box pt={12} m={4}>
                <Text fz="2xl">
                  Hi,{currentUser?.full_name || currentUser?.email} 👋🏼
                </Text>
                <Text>Welcome back, nice to see you again!</Text>
              </Box>
            ) : tab.component ? (
              <tab.component />
            ) : null}
          </Tabs.Panel>
        ))}
      </Tabs>
    </Container>
  );
}
