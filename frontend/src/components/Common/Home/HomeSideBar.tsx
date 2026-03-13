"use client";

import {
  Box,
  Group,
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
const items = [
  { title: "Research", link: "https://openai.com/research" },
  { title: "Safety", link: "https://openai.com/safety" },
  { title: "For Business", link: "https://openai.com/business" },
  { title: "For Developers", link: "https://openai.com/developers" },
  { title: "ChatGPT", link: "https://openai.com/chatgpt" },
  { title: "Sora", link: "https://openai.com/sora" },
  { title: "Stories", link: "https://openai.com/stories" },
  { title: "Company", link: "https://openai.com/company" },
  { title: "News", link: "https://openai.com/news" },
  { title: "ChatGPT", link: "https://openai.com/chatgpt" },
  { title: "Sora", link: "https://openai.com/sora" },
  { title: "Stories", link: "https://openai.com/stories" },
  { title: "Company", link: "https://openai.com/company" },
  { title: "News", link: "https://openai.com/news" },
  { title: "ChatGPT", link: "https://openai.com/chatgpt" },
  { title: "Sora", link: "https://openai.com/sora" },
  { title: "Stories", link: "https://openai.com/stories" },
  { title: "Company", link: "https://openai.com/company" },
  { title: "News", link: "https://openai.com/news" },
];

interface HomeSideBarProps {
  collapsed: boolean;
  toggle: () => void;
}

const HomeSideBar: React.FC<HomeSideBarProps> = ({ collapsed, toggle }) => {
  const [hovered, setHovered] = useState(false);

  const listItems = items.map(({ title, link }) => (
    <Group key={title} gap="sm" px="md" py="sm" align="center" fz={"14px"}>
      <Anchor key={title} href={link} target="_blank">
        <Text c="white" ml={2}>
          {title}
        </Text>
      </Anchor>
    </Group>
  ));

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

              <Anchor href={""} target="_blank">
                <Text c="white" ml={2}>
                  Deployment
                </Text>
              </Anchor>
              <Anchor href={""} target="_blank">
                <Text c="white" ml={2}>
                  Evaluation
                </Text>
              </Anchor>
            </Stack>
          </Box>
        )}
      </Stack>
    </ScrollArea>
  );
};

export default HomeSideBar;
