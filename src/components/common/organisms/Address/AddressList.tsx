'use client';

import { usePlatform } from '@/context/platform';

import { css } from 'styled-system/css';
import { Box, Stack, VStack } from 'styled-system/jsx';

import { Badge } from '@/components/common/atoms/Badge';
import { Button } from '@/components/common/atoms/Button';
import { EmptyState } from '@/components/common/atoms/EmptyState';
import { Typography } from '@/components/common/atoms/Typography';

import { ContentHeader } from '@/components/common/molecules/ContentHeader';

import { ContentSection } from '@/components/common/layouts/ContentSection';

import type { Address } from '@/types/mypage-address.types';

/** 등록 배송지 목록과 관리 액션을 표시합니다. (Displays saved addresses and management actions.) */
export function AddressList({
  addresses,
  onEdit,
  onDelete,
  onAdd,
  more,
  embedded = false,
}: {
  addresses: readonly Address[];
  onEdit: (address: Address) => void;
  onDelete?: (id: number) => void;
  onAdd: () => void;
  embedded?: boolean;
  more?: { counter: { current: number; total: number }; onLoadMore?: () => void };
}) {
  const mobile = usePlatform() === 'mobile';

  return (
    <Stack gap="6">
      <ContentSection
        gap={addresses.length ? (embedded ? '8' : '8px') : '0'}
        _mobile={{ gap: addresses.length ? '6' : '0' }}
        {...(embedded
          ? { header: null }
          : {
              title: '배송지 관리',
              headerProps: {
                titleAs: 'h1',
                titleProps: { web: 'headingKr6', mo: 'headingKr5' },
                orientation: 'horizontal',
                alignItems: 'end',
                pb: '10',
                borderBottom: '2px solid black',
                _mobile: addresses.length ? { pb: '0', borderBottom: '0' } : { display: 'none' },
                action: addresses.length ? (
                  <Button
                    {...(mobile
                      ? ({ size: 'md', variant: 'link' } as const)
                      : ({ size: 'short', variant: 'secondary' } as const))}
                    className={css({ flexShrink: '0' })}
                    onClick={onAdd}
                  >
                    배송지 추가
                  </Button>
                ) : null,
              },
            })}
      >
        {addresses.length ? (
          <Box>
            <Stack
              gap={embedded ? '8' : '8px'}
              _mobile={{
                ...(embedded ? { gap: '6', pt: '6' } : {}),
                borderTop: '1px solid var(--colors-black-20)',
              }}
            >
              {addresses.map((address) => (
                <Stack
                  as="article"
                  key={address.id}
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  gap="6"
                  pb={embedded ? '6' : undefined}
                  py={embedded ? undefined : '24px'}
                  borderBottom="1px solid var(--colors-black-20)"
                  _mobile={{ flexDirection: 'column', alignItems: 'stretch' }}
                >
                  <Stack gap="8" minW="0" _mobile={{ gap: '3' }}>
                    <ContentHeader
                      title={address.name}
                      titleAs="h2"
                      titleProps={{ web: 'headingKr8', mo: 'headingKr6' }}
                      orientation="horizontal"
                      justifyContent="flex-start"
                      gap="3"
                      _mobile={{ gap: '2' }}
                      action={
                        address.isDefault ? (
                          <Badge
                            variant="line"
                            tone="primary"
                            className={css({
                              borderRadius: '2px',
                              px: '1',
                              py: '3px',
                              '& > span': {
                                fontSize: '14px',
                                lineHeight: '1.3!',
                                _mobile: { fontSize: '12px' },
                              },
                            })}
                          >
                            기본 배송지
                          </Badge>
                        ) : null
                      }
                    />
                    <Stack gap="3" _mobile={{ gap: '4' }}>
                      <Typography web="body3" mo="body4" language="en" tone="tertiary">
                        {address.phone}
                      </Typography>
                      <Stack direction="row" gap="1" _mobile={{ flexDirection: 'column' }}>
                        <Typography web="body3" mo="body4" language="en" tone="tertiary">
                          {address.zip}
                        </Typography>
                        <Typography web="body3" mo="body4" tone="tertiary">
                          {address.address} {address.detail}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Stack>
                  <Stack
                    gap="2"
                    alignItems="end"
                    flexShrink="0"
                    _mobile={{ flexDirection: 'row', gap: '4', alignItems: 'start' }}
                  >
                    <Button
                      {...(mobile
                        ? ({ size: 'md', variant: 'link' } as const)
                        : ({ size: 'short', variant: 'primary' } as const))}
                      onClick={() => onEdit(address)}
                    >
                      {mobile ? '수정' : '수정하기'}
                    </Button>
                    {!address.isDefault ? (
                      <Button
                        {...(mobile
                          ? ({ size: 'md', variant: 'link' } as const)
                          : ({ size: 'short', variant: 'secondary' } as const))}
                        onClick={() => onDelete?.(address.id)}
                        disabled={!onDelete}
                      >
                        {mobile ? '삭제' : '삭제하기'}
                      </Button>
                    ) : null}
                  </Stack>
                </Stack>
              ))}
            </Stack>
            {more ? (
              <VStack mt="24px">
                <Button
                  variant="plain"
                  size="lg"
                  loadMore={{ counter: more.counter }}
                  onClick={more.onLoadMore}
                  disabled={!more.onLoadMore}
                />
              </VStack>
            ) : null}
          </Box>
        ) : (
          <EmptyState
            variant="page"
            layoutProps={css.raw({
              minH: embedded ? '0' : '795px',
              pt: embedded ? '8' : '160px',
              pb: '0',
              justifyContent: 'flex-start',
              _mobile: {
                mt: embedded ? '0' : '-24px',
                py: '0',
                minH: embedded ? '0' : 'calc(100svh - var(--layout-site-header-height) - 106px)',
                justifyContent: 'center',
              },
            })}
            titleProps={{ as: 'p', web: 'headingKr7', mo: 'headingKr5' }}
            title="자주 쓰는 배송지 주소를 설정해주세요."
            description={
              mobile
                ? '자주 쓰는 배송지 주소를 저장하시면 보다 편리하게 이용이 가능합니다.'
                : '자주 쓰는 배송지 주소를 설정해주세요. 자주 쓰는 배송지 주소를 저장하시면 보다 편리하게 이용이 가능합니다.'
            }
            descriptionProps={{ web: 'body3', mo: 'body4' }}
            action={
              <Box w="180px" _mobile={{ w: '322px', maxW: '100%' }}>
                <Button fullWidth size="tall" variant="primary" onClick={onAdd}>
                  배송지 추가
                </Button>
              </Box>
            }
          />
        )}
      </ContentSection>
      {embedded && addresses.length > 0 ? (
        <Button size="short" variant="secondary" onClick={onAdd}>
          배송지 추가
        </Button>
      ) : null}
    </Stack>
  );
}
