import { expect, userEvent, within, waitFor } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button } from '@/components/common/atoms/Button/Button';
import { HeaderSearch } from '@/components/common/organisms/Layout/SiteHeader/HeaderSearch';
import { SearchOverlay } from '@/components/common/organisms/Search/SearchOverlay';
import { PlatformProvider } from '@/context/platform';
import { Box, Flex } from 'styled-system/jsx';

const meta = {
  title: 'Organisms/Search/SearchOverlay',
  component: SearchOverlay,
  parameters: { layout: 'fullscreen' },
  globals: { searchPlatform: 'web', viewport: { value: 'hoka1200', isRotated: false } },
  args: { onClose: () => {} },
  render: function ControlledOverlay(args, context) {
    const mobile = context.globals.searchPlatform === 'mobile';
    const [isOpen, setIsOpen] = useState(true);
    const [query, setQuery] = useState(args.query ?? '');
    const [error, setError] = useState(args.error ?? '');
    const changeQuery = (value: string) => {
      setQuery(value);
      setError('');
    };

    return (
      <div className={mobile ? 'platform-mobile' : 'platform-web'}>
        <PlatformProvider platform={mobile ? 'mobile' : 'web'}>
          <Box pos="relative" minH="100dvh" bg="black.5">
            <Flex
              h="var(--layout-site-header-height)"
              px="32px"
              alignItems="center"
              justifyContent="flex-end"
              bg="white.0"
            >
              <HeaderSearch
                query={query}
                onQueryChange={changeQuery}
                open={isOpen}
                error={error}
                onSearch={() => setIsOpen(true)}
              />
            </Flex>
            {isOpen ? (
              <SearchOverlay
                {...args}
                query={query}
                onQueryChange={changeQuery}
                error={error}
                onErrorChange={setError}
                onClose={() => {
                  args.onClose();
                  setIsOpen(false);
                }}
              />
            ) : (
              <Button onClick={() => setIsOpen(true)}>검색 열기</Button>
            )}
          </Box>
        </PlatformProvider>
      </div>
    );
  },
} satisfies Meta<typeof SearchOverlay>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const EmptyRecentSearches: Story = {
  beforeEach: () => {
    const key = 'hoka-recent-searches';
    const stored = window.localStorage.getItem(key);
    window.localStorage.setItem(key, '[]');

    return () => {
      if (stored === null) window.localStorage.removeItem(key);
      else window.localStorage.setItem(key, stored);
    };
  },
};

export const Autocomplete: Story = { args: { query: '러닝' } };

export const Invalid: Story = { args: { error: '검색할 수 없는 단어가 포함되어 있습니다.' } };

export const Mobile: Story = {
  beforeEach: () => {
    const wasMobile = document.body.classList.contains('platform-mobile');
    document.body.classList.add('platform-mobile');
    return () => {
      if (!wasMobile) document.body.classList.remove('platform-mobile');
    };
  },
  globals: { searchPlatform: 'mobile', viewport: { value: 'hoka375', isRotated: false } },
};

export const MobileAutocomplete: Story = { ...Mobile, args: { query: '러닝' } };

export const MobileInvalid: Story = {
  ...Mobile,
  args: { error: '검색할 수 없는 단어가 포함되어 있습니다.' },
};

export const DesktopDismissal: Story = {
  args: { query: '러닝' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('searchbox', { name: '검색' });
    await userEvent.click(input);
    await userEvent.type(input, '화');
    await expect(canvas.getByRole('dialog', { name: '검색' })).toBeVisible();
    await expect(input).toHaveFocus();
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(canvas.queryByRole('dialog')).not.toBeInTheDocument());
    await userEvent.click(canvas.getByRole('button', { name: '검색 열기' }));
    await expect(canvas.getByRole('dialog', { name: '검색' })).toBeVisible();
  },
};
