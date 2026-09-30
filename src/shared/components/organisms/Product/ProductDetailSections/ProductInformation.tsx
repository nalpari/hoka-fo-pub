'use client';

import { useState } from 'react';
import { css } from 'styled-system/css';
import { Box, Grid } from 'styled-system/jsx';
import { ToggleButton } from '@/shared/components/atoms/ToggleButton/ToggleButton';

/** 기본 사양과 확장 사양을 접고 펼칠 수 있는 상품정보 콘텐츠입니다. */
export function ProductInformation() {
  const [expanded, setExpanded] = useState(false);
  return (
    <Box maxW="680px">
      <Box as="p" m="0" color="#222" lineHeight="1.65">
        호카의 헤리티지를 담은 클래식 러닝화입니다. 세련된 컬러와 편안한 착화감을 중심으로, 일상과
        가벼운 움직임에 자연스럽게 어울리도록 설계했습니다.
      </Box>
      <Box
        as="ul"
        m="8px 0 30px"
        p="0"
        listStyle="none"
        fontWeight="700"
        lineHeight="1.45"
        className={css({ '& li::before': { mr: '5px', content: '"■"' } })}
      >
        <li>재고 품절 시 환불만 가능하오니 구매 시 유의해 주시기 바랍니다.</li>
        <li>모니터 해상도 및 기기에 따라 실제 색상이 다를 수 있습니다.</li>
        <li>교환은 구매한 홈페이지를 통해서만 진행할 수 있습니다.</li>
      </Box>
      <Grid as="dl" gap="20px" m="0">
        <Grid gridTemplateColumns="120px 1fr" gap="12px">
          <Box as="dt" fontWeight="700">
            컬러
          </Box>
          <Box as="dd" m="0" lineHeight="1.55">
            (85) Brown
          </Box>
        </Grid>
        <Grid gridTemplateColumns="120px 1fr" gap="12px">
          <dt>스타일코드</dt>
          <dd>NBP7GF729F</dd>
        </Grid>
        <Grid gridTemplateColumns="120px 1fr" gap="12px">
          <dt>발볼 넓이</dt>
          <dd>D(보통)</dd>
        </Grid>
        {expanded && (
          <>
            <Grid gridTemplateColumns="120px 1fr" gap="12px">
              <dt>소재</dt>
              <dd>겉감: 천연가죽, 합성가죽 / 안감: 폴리에스터 100%</dd>
            </Grid>
            <Grid gridTemplateColumns="120px 1fr" gap="12px">
              <dt>제조국</dt>
              <dd>VIETNAM</dd>
            </Grid>
            <Grid gridTemplateColumns="120px 1fr" gap="12px">
              <dt>제조년월</dt>
              <dd>2026년 5월</dd>
            </Grid>
            <Grid gridTemplateColumns="120px 1fr" gap="12px">
              <dt>품질보증기간</dt>
              <dd>구매일로부터 1년간</dd>
            </Grid>
            <Grid gridTemplateColumns="120px 1fr" gap="12px">
              <dt>부가 정보</dt>
              <dd>제품 관리 방법은 동봉된 안내서를 확인해 주세요.</dd>
            </Grid>
          </>
        )}
      </Grid>
      <ToggleButton
        expanded={expanded}
        className={css({ mt: '30px', p: '0', border: '0', color: 'var(--color-text-muted)' })}
        onClick={() => setExpanded((previous) => !previous)}
        type="button"
      >
        {expanded ? '접기' : '더 보기'}
      </ToggleButton>
    </Box>
  );
}
