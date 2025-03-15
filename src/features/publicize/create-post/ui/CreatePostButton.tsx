import { Button, Modal } from '@mantine/core';
import { useState } from 'react';
import { IconPlus } from '@tabler/icons-react';
import { CreatePostForm } from '@features/publicize/create-post/ui/CreatePostForm';

export const CreatePostButton = () => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Button
        leftSection={<IconPlus size={18} />}
        color="indigo"
        radius="md"
        size="md"
        onClick={() => setOpened(true)}
        className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 transition-all duration-300"
      >
        신규 등록
      </Button>

      {/* TODO - [컴포넌트 모듈화 필요] */}
      <Modal
        opened={opened}
        centered
        onClose={() => setOpened(false)}
        title="새 공연 홍보글 작성"
        size="xl"
        padding="xl"
      >
        <CreatePostForm closeModal={() => setOpened(false)} />
      </Modal>
    </>
  );
};
