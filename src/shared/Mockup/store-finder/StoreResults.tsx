import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { css } from 'styled-system/css';
import { Flex, Box } from 'styled-system/jsx';
import { Button } from '@/shared/components/atoms/Button/Button';

export type StoreResult = {
  name: string;
  address: string;
  type: string;
  phone: string;
};

export type StoreResultsProps = { stores: readonly StoreResult[] };

const noResult = css({
  p: '70px',
  color: 'var(--color-text-tertiary)',
  textAlign: 'center',
});

export function StoreResults({ stores }: StoreResultsProps) {
  return (
    <Box
      css={{
        '& p': {
          m: '0 0 1',
          _mobile: { maxW: '260px' },
        },
      }}
      id="stores"
    >
      {stores.map((store) => (
        <Flex
          key={store.name}
          as="article"
          alignItems="center"
          justifyContent="space-between"
          minH="135px"
          px="4"
          py="6"
          borderBottom="1px solid var(--color-black-20)"
          _mobile={{ p: '5 1' }}
        >
          <Box>
            <Typography
              as="h2"
              variant="body4"
              weight="bold"
              className={css({ m: '0 0 var(--spacing-3)' })}
            >
              {store.name}
            </Typography>
            <Typography as="p" variant="body5" tone="tertiary">
              {store.address}
            </Typography>
            <Typography as="small" variant="body5" tone="red80">
              {store.type}{' '}
              <i className={css({ color: 'var(--color-black-40)', fontStyle: 'normal' })}>|</i>{' '}
              {store.phone}
            </Typography>
          </Box>
          <Button
            aria-label={`${store.name} 약도 보기`}
            variant="ghost"
            className={css({
              '&&': {
                display: 'grid',
                justifyItems: 'center',
                gap: '0.5',
                border: '0',
                color: 'var(--color-text-tertiary)',
                fontSize: '12' /* 기존: 10px */,
              },
            })}
          >
            <b
              className={css({
                fontSize: '28' /* 기존 30px */,
                fontWeight: 'var(--font-weights-normal)',
                lineHeight: 'var(--line-heights-hoka)',
              })}
            >
              ♧
            </b>
            <Typography as="span">약도보기</Typography>
          </Button>
        </Flex>
      ))}
      {!stores.length && (
        <Typography as="p" variant="body5" tone="tertiary" className={noResult}>
          검색 결과가 없습니다.
        </Typography>
      )}
    </Box>
  );
}
