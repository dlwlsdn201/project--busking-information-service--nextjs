import { Box, Text, Title } from '@mantine/core';

export const PageTitle = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <Box className="flex justify-between items-center mb-4">
      <Box>
        <Title order={2} size="h1" className="text-indigo-700 mb-1">
          {title}
        </Title>
        <Text c="#4b4b4b" size="lg">
          {description}
        </Text>
      </Box>
    </Box>
  );
};
