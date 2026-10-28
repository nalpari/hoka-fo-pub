import type { ReactNode } from 'react';
import { css } from 'styled-system/css';
import { Box, HStack, Stack } from 'styled-system/jsx';
import { SingleActionDialog } from '@/components/common/molecules/SingleActionDialog/SingleActionDialog';
import { Button } from '@/components/common/atoms/Button/Button';
import { Typography } from '@/components/common/atoms/Typography/Typography';

export type TermsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: ReactNode;
  label: ReactNode;
  children: ReactNode;
  dates?: ReactNode;
  version?: { previous: boolean; onChange: () => void };
};

const versionButton = css({ flexShrink: '0', '--button-padding-x': '0px' });

export function TermsDialog({
  open,
  onOpenChange,
  title,
  label,
  children,
  dates,
  version,
}: TermsDialogProps) {
  return (
    <SingleActionDialog
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      closeLabel="약관 닫기"
      mobilePresentation="fullscreen"
      scrollFade
      onConfirm={() => onOpenChange(false)}
    >
      <Stack gap="0" minH="0" flex="1" pb="20">
        <HStack justify="space-between" gap="2" mb="4">
          <Typography variant="body3">{label}</Typography>
          {version ? (
            <Button variant="link" size="sm" className={versionButton} onClick={version.onChange}>
              <Typography variant="body5">
                {version.previous ? '현재 약관 보기' : '이전 약관 보기'}
              </Typography>
            </Button>
          ) : null}
        </HStack>
        <Box
          as="article"
          p="4"
          border="1px solid var(--color-black-20)"
          tabIndex={0}
          aria-label="약관 내용"
        >
          {children}
        </Box>
        {dates ? (
          <Box mt="2">
            <Typography as="p" variant="body5" tone="subtle">
              {dates}
            </Typography>
          </Box>
        ) : null}
      </Stack>
    </SingleActionDialog>
  );
}
