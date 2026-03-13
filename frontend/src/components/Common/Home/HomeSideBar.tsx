"use client";

import {
  Box,
  Text,
  Anchor,
  Stack,
  Flex,
  Image,
  ActionIcon,
  ScrollArea,
  Title,
} from "@mantine/core";
import { useState } from "react";
import { FiColumns, FiArrowRight } from "react-icons/fi";
import { LOGO, PROJECT_NAME } from "@/const";
import { Link } from "@tanstack/react-router";
import { FaGithub } from "react-icons/fa";

interface HomeSideBarProps {
  collapsed: boolean;
  toggle: () => void;
}

const HomeSideBar: React.FC<HomeSideBarProps> = ({ collapsed, toggle }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <ScrollArea>
      <Stack>
        {/* Controls */}
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
                <Image src={LOGO} alt={`${PROJECT_NAME} Logo`} h={25} w={25} />
              )}
            </Box>
          ) : (
            <>
              <Flex align="center" gap="xs">
                <Anchor underline="never" component={Link} to="/">
                  <Image
                    src={LOGO}
                    alt={`${PROJECT_NAME} Logo`}
                    h={32}
                    w={32}
                  />
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
          <Box p={"md"}>
            <Stack>
              <Title order={3}>About</Title>
              <Text>
                I wanted to learn transformers in depth by implementing and
                training one. Model was trainned using Googles Jax
              </Text>

              <Title order={3}>Model Architecture</Title>
              <Text>
                I used a standard encoder decoder architecture with a sequence
                length of 128, model dimension of 512, 8 attention heads, 6
                encoder decoder blocks and a feed forward dimension of 2048.
                This uses learned positional embeddings.
              </Text>

              <Title order={3}>Deployment</Title>
              <Text>...</Text>

              <Anchor
                href={""}
                target="_blank"
                rel="noopener noreferrer"
                className="flex hover:text-primary-600"
              >
                <FaGithub size={24} />
              </Anchor>
              <Anchor
                href={""}
                target="_blank"
                rel="noopener noreferrer"
                className="flex hover:text-primary-600"
              >
                <FaGithub size={24} />
              </Anchor>
            </Stack>
          </Box>
        )}
      </Stack>
    </ScrollArea>
  );
};

export default HomeSideBar;
