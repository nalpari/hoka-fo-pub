import { css } from 'styled-system/css';
import { Box } from 'styled-system/jsx';
import { DescriptionList } from '@/shared/components/atoms/DescriptionList/DescriptionList';

const section = css({
  mt: '38px',
  borderTop: '1px solid var(--color-border-subtle)',
  fontSize: '13px',
  lineHeight: '1.65',
});
const block = css({ py: '24px', borderBottom: '1px solid var(--color-border-subtle)' });

/** 구매 전 확인할 배송 일정과 현재 결제 혜택입니다. */
export function DeliveryBenefits() {
  return (
    <section className={section} aria-label="배송안내 및 결제혜택">
      <Box className={block}>
        <h2 className={css({ m: '0 0 16px', fontSize: '15px' })}>배송안내</h2>
        <DescriptionList
          labelWidth="58px"
          items={[
            { term: '일반배송', description: '택배 배송 (무료배송) / 평균 3일 이내 도착' },
            {
              term: '빠른도착',
              description: (
                <>
                  내일도착 (무료배송) /<br />
                  오늘 15시 전까지 결제 완료 시 내일 도착
                  <br />
                  <br />
                  오늘도착 (3,000원) /<br />
                  오늘 11시 전까지 결제 완료 시 오늘 도착
                </>
              ),
            },
          ]}
        />
      </Box>
      <Box className={block}>
        <h2 className={css({ m: '0 0 16px', fontSize: '15px' })}>결제혜택</h2>
        <p className={css({ m: '0', color: '#444' })}>
          <strong className={css({ color: '#00c73c' })}>N pay</strong> · 네이버페이 15만원 이상 결제
          시 1만원, 10만원 이상 결제 시 7천원 즉시할인
        </p>
        <p className={css({ mt: '5px', mb: '0', color: '#df0038', fontWeight: '700' })}>
          해당 이벤트는 예산 소진 시 조기종료 될 수 있습니다.
        </p>
      </Box>
    </section>
  );
}
