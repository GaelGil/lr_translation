"use client";

import {
  Box,
  Group,
  Text,
  Anchor,
  Stack,
  Flex,
  ActionIcon,
} from "@mantine/core";
import { useState } from "react";
import { FiColumns, FiArrowRight } from "react-icons/fi";
import { useEffect } from "react";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { Link } from "@tanstack/react-router";
import { FaGithub, FaBookOpen } from "react-icons/fa";
const items = [
  { title: "About", link: "/about", icon: FaBookOpen },
  { title: "Github", link: "/about", icon: FaGithub },
];

interface HomeSideBarProps {
  collapsed: boolean;
  toggle: () => void;
}

const HomeSideBar: React.FC<HomeSideBarProps> = ({ collapsed, toggle }) => {
  const [hovered, setHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  // Randomly toggle the open state
  useEffect(() => {
    let timeoutId: number;

    const scheduleToggle = () => {
      const randomDelay = Math.random() * 2000 + 500; // 0.5 to 2.5 seconds

      timeoutId = window.setTimeout(() => {
        setIsOpen((prev) => !prev);
        scheduleToggle(); // Schedule the next toggle
      }, randomDelay);
    };

    scheduleToggle();

    return () => clearTimeout(timeoutId);
  }, []);

  // Render the side bar items
  const listItems = items.map((item) => (
    <Group key={item.title} gap="sm" px="md" py="sm" align="center" fz={"14px"}>
      <Anchor key={item.title} href={item.link} target="_blank">
        <Flex align="center" gap="xs">
          <Text c="white" ml={2}>
            {item.title}
          </Text>
          {item.icon && <item.icon />}
        </Flex>
      </Anchor>
    </Group>
  ));

  return (
    <Stack>
      <Flex
        align="center"
        justify={collapsed ? "center" : "space-between"}
        px={collapsed ? "xs" : "md"}
      >
        {collapsed ? (
          <Box
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => {
              toggle();
              setHovered(false);
            }}
            style={{ cursor: "pointer", position: "relative" }}
          >
            {hovered ? (
              <ActionIcon variant="subtle" h={32} w={32}>
                <FiArrowRight size={18} color="white" />
              </ActionIcon>
            ) : (
              <>
                {isOpen ? (
                  <LuEye size={32} color="white" />
                ) : (
                  <LuEyeClosed size={32} color="white" />
                )}
              </>
            )}
          </Box>
        ) : (
          <>
            <Flex align="center" gap="xs">
              <Anchor underline="never" component={Link} to="/">
                <>
                  {isOpen ? (
                    <LuEye size={32} color="white" />
                  ) : (
                    <LuEyeClosed size={32} color="white" />
                  )}
                </>
              </Anchor>
            </Flex>
            <ActionIcon onClick={toggle} variant="subtle" size="sm">
              <FiColumns size={18} color="white" />
            </ActionIcon>
          </>
        )}
      </Flex>
      {}
      {!collapsed && (
        <>
          <Box p="sm">{listItems}</Box>
        </>
      )}
    </Stack>
  );
};

export default HomeSideBar;
