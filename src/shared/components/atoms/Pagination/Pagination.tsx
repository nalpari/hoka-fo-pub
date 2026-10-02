import { css } from 'styled-system/css';
import { Flex } from 'styled-system/jsx';
import { Button } from '@/shared/components/atoms/Button/Button';

const root = css({ m: '36px', textAlign: 'center' });

const ellipsis = css({ px: '4px' });

function getPageItems(total: number, current: number) {
  const safeCurrent = Math.min(Math.max(current, 1), total);

  if (total <= 7) {
    return Array.from({ length: total }, (_, index) => index + 1);
  }

  const items: Array<number | 'ellipsis-start' | 'ellipsis-end'> = [1];

  if (safeCurrent > 3) {
    items.push('ellipsis-start');
  }

  const start = Math.max(2, safeCurrent - 1);
  const end = Math.min(total - 1, safeCurrent + 1);

  for (let index = start; index <= end; index += 1) {
    items.push(index);
  }

  if (safeCurrent < total - 2) {
    items.push('ellipsis-end');
  }

  if (!items.includes(total)) {
    items.push(total);
  }

  return items;
}

export function Pagination({
  total,
  page,
  onChange,
}: {
  total: number;
  page: number;
  onChange: (page: number) => void;
}) {
  if (total <= 0) return null;

  const items = getPageItems(total, page);

  return (
    <Flex as="nav" aria-label="페이지네이션" alignItems="center" className={root} gap="2">
      <Button
        aria-label="이전 페이지"
        disabled={page <= 1}
        onClick={() => onChange(Math.max(1, page - 1))}
        size="sm"
        variant="ghost"
        type="button"
      >
        이전
      </Button>

      {items.map((item, index) => {
        if (item === 'ellipsis-start' || item === 'ellipsis-end') {
          return (
            <span aria-hidden="true" className={ellipsis} key={`${item}-${index}`}>
              …
            </span>
          );
        }

        const isCurrent = item === page;

        return (
          <Button
            aria-current={isCurrent ? 'page' : undefined}
            key={item}
            onClick={() => onChange(item)}
            size="sm"
            type="button"
            variant={isCurrent ? 'primary' : 'ghost'}
          >
            {item}
          </Button>
        );
      })}

      <Button
        aria-label="다음 페이지"
        disabled={page >= total}
        onClick={() => onChange(Math.min(total, page + 1))}
        size="sm"
        variant="ghost"
        type="button"
      >
        다음
      </Button>
    </Flex>
  );
}
