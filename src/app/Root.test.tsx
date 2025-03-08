import { render, screen } from '@testing-library/react';
import { describe, test } from '@jest/globals';
import Root from './page';

describe('Root component', () => {
  test('renders the Root page text', () => {
    render(<Root />);

    // Root page라는 텍스트가 화면에 나타나는지 확인합니다.
    const textElement = screen.getByText(/Root page/i);
    expect(textElement).toBeInTheDocument();
  });
});
