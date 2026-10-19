'use client';

import Link from 'next/link';
import { css } from 'styled-system/css';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { usePlatform } from '@/shared/context/platform';
import { Stack, Flex } from 'styled-system/jsx';

const styles = {
  meta: css({
    fontFamily: 'korean',
    fontSize: '14',
    lineHeight: '1.5',
    letterSpacing: 'korean',
    _mobile: { fontSize: '12' },
    '& span > span, & span > a, & p': { fontSize: 'inherit' },
    '& h3, & p, & span, & a, & div': { textBoxTrim: 'trim-both', textBoxEdge: 'cap alphabetic' },
  }),
  row: css({
    flexWrap: 'wrap',
    alignItems: 'baseline',
    gap: '4',
  }),
  privacy: css({ fontWeight: 'bold' }),
  businessLink: css({ textDecoration: 'underline', textUnderlineOffset: '4px' }),
};

export function FooterLegalLinks() {
  const platform = usePlatform();

  return (
    <Stack
      as="section"
      gridArea="legal"
      aria-label="사업자 정보"
      gap={platform === 'mobile' ? '5' : '22px'}
    >
      <Typography as="h3" web="body3" mo="body4" tone="inverse">
        ㈜ 이랜드글로벌스포츠
      </Typography>
      <Stack gap={platform === 'mobile' ? '12px' : '18px'} className={styles.meta}>
        <Flex className={styles.row}>
          <Link href="/support/terms">서비스이용약관</Link>
          <Link href="/support/terms?tab=privacy" className={styles.privacy}>
            개인정보처리방침
          </Link>
        </Flex>
        <Flex className={styles.row}>
          <Typography as="span">
            고객센터 :{' '}
            <Typography variant="body5" tone="inverse">
              1234-0000
            </Typography>
          </Typography>
          <Typography as="span">
            통신판매 신고번호 :{' '}
            <Typography variant="body5" tone="inverse">
              0000-0000-0000
            </Typography>
          </Typography>
        </Flex>
        <div>주소 : 서울특별시 금천구 가산디지털1로 159</div>
        <Flex className={styles.row}>
          <Typography as="span">대표이사 : 조동주</Typography>
          <Typography as="span">
            사업자 등록번호 :{' '}
            <Typography variant="body5" tone="inverse">
              156-88-01028
            </Typography>
          </Typography>
          <Link
            href="https://www.ftc.go.kr/bizCommPop.do?wrkr_no=1568801028"
            target="_blank"
            rel="noreferrer"
            className={styles.businessLink}
          >
            사업자정보확인
          </Link>
        </Flex>
        <Flex className={styles.row}>
          <Typography as="span">개인정보보호책임자 : 김태위</Typography>
          <Typography as="span">
            대표이메일 :{' '}
            <Typography as="a" href="mailto:webmaster@hoka.com" variant="body5" tone="inverse">
              webmaster@hoka.com
            </Typography>
          </Typography>
        </Flex>
        <div>호스팅 서비스 제공자 : ㈜쓰리탑</div>
        <Typography as="p" variant="body5" tone="inverse">
          © 2027 Deckers Brands
        </Typography>
      </Stack>
    </Stack>
  );
}
