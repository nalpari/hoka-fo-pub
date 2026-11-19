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
    <Stack gap="6" flex={!embedded && !addresses.length ? '1' : undefined}>
      <ContentSection
        flex={!embedded && !addresses.length ? '1' : undefined}
        css={embedded ? undefined : { '--line-heights-body': '1.5' }}
        gap={addresses.length ? (embedded ? '8' : '8px') : '0'}
        _mobile={{
          gap: addresses.length ? (embedded ? '6' : '8px') : '0',
          pt: embedded ? '0' : '24px',
        }}
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
                _mobile: addresses.length
                  ? { pb: '32px', borderBottom: '2px solid black' }
                  : { pb: '32px', borderBottom: '2px solid black' },
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
              gap={embedded ? '6' : '0'}
              _mobile={{
                ...(embedded ? { gap: '6' } : {}),
                borderTop: undefined,
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
                  py={embedded ? undefined : '24px'}
                  borderBottom="1px solid var(--colors-black-20)"
                  _mobile={{
                    flexDirection: 'column',
                    alignItems: 'stretch',
                    gap: '24px',
                  }}
                >
                  <Stack gap="8" minW="0" _mobile={{ gap: '3' }}>
                    <ContentHeader
                      title={address.name}
                      titleAs="h2"
                      titleProps={{
                        web: 'headingKr8',
                        mo: 'headingKr6',
                        className: embedded
                          ? css({ lineHeight: '1.2', _mobile: { lineHeight: '1.3' } })
                          : undefined,
                      }}
                      orientation="horizontal"
                      justifyContent="flex-start"
                      gap="3"
                      _mobile={{ gap: '2' }}
                      action={
                        address.isDefault || !embedded ? (
                          <Badge variant="outlined" visual="square">
                            {address.isDefault ? '기본 배송지' : '일반 배송지'}
                          </Badge>
                        ) : null
                      }
                    />
                    <Stack
                      gap="3"
                      _mobile={{ gap: '16px' }}
                      className={
                        embedded
                          ? css({
                              '& span': { lineHeight: '24px!' },
                              _mobile: { '& span': { lineHeight: '21px!' } },
                            })
                          : undefined
                      }
                    >
                      <Typography
                        web="body3"
                        mo="body4"
                        language="en"
                        tone={embedded ? 'tertiary' : 'subtle'}
                        className={
                          embedded
                            ? css({ lineHeight: '24px', _mobile: { lineHeight: '21px' } })
                            : undefined
                        }
                      >
                        {address.phone}
                      </Typography>
                      <Stack
                        direction="row"
                        gap="1"
                        _mobile={{ flexDirection: 'column', gap: '4px' }}
                      >
                        <Typography
                          web="body3"
                          mo="body4"
                          language="en"
                          tone={embedded ? 'tertiary' : 'subtle'}
                          className={
                            embedded
                              ? css({ lineHeight: '24px', _mobile: { lineHeight: '21px' } })
                              : undefined
                          }
                        >
                          {address.zip}
                        </Typography>
                        <Typography web="body3" mo="body4" tone={embedded ? 'tertiary' : 'subtle'}>
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
                      수정하기
                    </Button>
                    {!address.isDefault ? (
                      <Button
                        {...(mobile
                          ? ({ size: 'md', variant: 'link' } as const)
                          : ({ size: 'short', variant: 'secondary' } as const))}
                        onClick={onDelete ? () => onDelete(address.id) : undefined}
                        disabled={!embedded && !onDelete}
                      >
                        삭제하기
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
                  disabled={!embedded && !more.onLoadMore}
                />
              </VStack>
            ) : null}
          </Box>
        ) : (
          <EmptyState
            layout={embedded ? 'embeddedAddress' : 'address'}
            variant="page"
            title="자주 쓰는 배송지 주소를 설정해주세요."
            description={
              mobile
                ? '자주 쓰는 배송지 주소를 저장하시면 보다 편리하게 이용이 가능합니다.'
                : '자주 쓰는 배송지 주소를 설정해주세요. 자주 쓰는 배송지 주소를 저장하시면 보다 편리하게 이용이 가능합니다.'
            }
            action={
              <Box>
                <Button fullWidth size="tall" variant="primary" onClick={onAdd}>
                  배송지 추가
                </Button>
              </Box>
            }
          />
        )}
      </ContentSection>
    </Stack>
  );
}
