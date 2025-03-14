import { FlexLayout } from '.';
import { PageTitle } from '@shared/ui/common';

export const PageTitleLayout = ({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) => {
  return (
    <FlexLayout direction="vertical">
      <PageTitle title={title} description={description} />
      {children}
    </FlexLayout>
  );
};
