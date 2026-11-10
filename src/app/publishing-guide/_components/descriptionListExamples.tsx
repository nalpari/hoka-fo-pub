import { Fragment } from 'react';
import { type Platform } from '@/context/platform';

import { css, cva } from 'styled-system/css';
import { Box, HStack } from 'styled-system/jsx';

import {
  DescriptionList,
  type DescriptionListItem,
} from '@/components/common/atoms/DescriptionList';
import { Divider } from '@/components/common/atoms/Divider';
import { Typography } from '@/components/common/atoms/Typography';

import { HelpTooltip } from '@/components/common/molecules/HelpTips';

import { launchDetail } from '@/app/launch-calendar/launchCalendar.data';
import {
  getProductDetailPresentation,
  type ProductDetailSpecification,
} from '@/app/products/[id]/productDetailPresentation';
import { previewOrders } from '@/components/orders/orders.data';
import {
  runningSessionAddress,
  runningSessionSessions,
  runningSessionVenue,
} from '@/components/running-session/runningSession.data';
import { products } from '@/mocks/products';

export function getDescriptionListExamples(platform: Platform) {
  return [
    {
      id: 'description-customer',
      title: '문의등록 · 고객 정보',
      description: '실제 화면의 데이터·스타일',
      source: 'src/app/support/inquiries/new/_components/InquiryFormContent.tsx',
      href: '/support/inquiries/new',
      code: "import { type Platform } from '@/context/platform';\nimport { css } from 'styled-system/css';\nimport { Box } from 'styled-system/jsx';\nimport { DescriptionList } from '@/components/common/atoms/DescriptionList';\n\nfunction Example({ platform }: { platform: Platform }) {\n  return (\n    <Box px=\"8\" py=\"6\" bg=\"black.10\" _mobile={{ px: '4', py: '5' }}>\n      <DescriptionList\n        items={[\n          { term: '이름', description: '홍길동' },\n          { term: '휴대폰 번호', description: '010-1234-1234' },\n          { term: 'E-mail', description: 'hong123@naver.com' },\n        ]}\n        termProps={{ variant: 'body3', mo: 'body4', tone: 'subtle' }}\n        descriptionProps={{ variant: 'body3', mo: 'body4', tone: undefined }}\n        slotStyles={{\n          root: css.raw({\n            gridTemplateColumns: 'max-content minmax(0, 1fr)',\n            gap: '12px 22px',\n            _mobile: { gridTemplateColumns: '82px minmax(0, 1fr)', columnGap: '2' },\n          }),\n        }}\n      />\n    </Box>\n  );\n}\n",
      preview: (() => {
        return (
          <Box px="8" py="6" bg="black.10" _mobile={{ px: '4', py: '5' }}>
            <DescriptionList
              items={[
                { term: '이름', description: '홍길동' },
                { term: '휴대폰 번호', description: '010-1234-1234' },
                { term: 'E-mail', description: 'hong123@naver.com' },
              ]}
              termProps={{ variant: 'body3', mo: 'body4', tone: 'subtle' }}
              descriptionProps={{ variant: 'body3', mo: 'body4', tone: undefined }}
              slotStyles={{
                root: css.raw({
                  gridTemplateColumns: 'max-content minmax(0, 1fr)',
                  gap: '12px 22px',
                  _mobile: { gridTemplateColumns: '82px minmax(0, 1fr)', columnGap: '2' },
                }),
              }}
            />
          </Box>
        );
      })(),
    },
    {
      id: 'description-spec-8',
      title: '상품 상세 · 신발 스펙',
      description: '실제 화면의 데이터·스타일',
      source: 'src/app/products/[id]/_components/ProductDetailContent.tsx',
      href: '/products/shoe-1#product-details',
      code: "import { Fragment } from 'react';\nimport { type Platform } from '@/context/platform';\nimport { css } from 'styled-system/css';\nimport { HStack } from 'styled-system/jsx';\nimport { DescriptionList } from '@/components/common/atoms/DescriptionList';\nimport { Divider } from '@/components/common/atoms/Divider';\nimport { Typography } from '@/components/common/atoms/Typography';\nimport { HelpTooltip } from '@/components/common/molecules/HelpTips';\nimport {\n  getProductDetailPresentation,\n  type ProductDetailSpecification,\n} from '@/app/products/[id]/productDetailPresentation';\nimport { products } from '@/mocks/products';\n\nfunction Example({ platform }: { platform: Platform }) {\n  const product = products.find((item) => item.id === 'shoe-1')!;\n  const presentation = getProductDetailPresentation(product);\n  const items: readonly ProductDetailSpecification[] = presentation.specifications;\n  const gap = '8';\n  return (\n    <DescriptionList\n      items={items.map((item) => ({\n        descriptionProps: typeof item.value === 'string' ? undefined : { variant: undefined },\n        term: (\n          <HStack as=\"span\" gap=\"2\" alignItems=\"center\">\n            {item.label}\n            {item.help ? (\n              <HelpTooltip\n                label={`${item.label} 안내`}\n                text={item.help}\n                side=\"bottom\"\n                iconColor=\"black.50\"\n                className={css({ transform: 'translateY(-1px)' })}\n              />\n            ) : null}\n          </HStack>\n        ),\n        description:\n          typeof item.value === 'string' ? (\n            item.value\n          ) : (\n            <HStack as=\"span\" gap=\"3\" flexWrap=\"wrap\">\n              {item.value.map((value, index) => (\n                <Fragment key={value}>\n                  {index > 0 ? (\n                    <Divider orientation=\"vertical\" length=\"4\" variant=\"strong\" />\n                  ) : null}\n                  <Typography as=\"span\" variant=\"body3\">\n                    {value}\n                  </Typography>\n                </Fragment>\n              ))}\n            </HStack>\n          ),\n      }))}\n      termProps={{ variant: 'body3', weight: 'bold' }}\n      descriptionProps={{ variant: 'body3', tone: undefined }}\n      slotStyles={{\n        root: css.raw({\n          display: 'flex',\n          flexDirection: 'column',\n          gridTemplateColumns: 'none',\n          gap,\n        }),\n        row: css.raw({ display: 'flex', flexDirection: 'column', gap: '2' }),\n        description: css.raw({ m: '0' }),\n      }}\n    />\n  );\n}\n",
      preview: (() => {
        const product = products.find((item) => item.id === 'shoe-1')!;
        const presentation = getProductDetailPresentation(product);
        const items: readonly ProductDetailSpecification[] = presentation.specifications;
        const gap = '8';
        return (
          <DescriptionList
            items={items.map((item) => ({
              descriptionProps: typeof item.value === 'string' ? undefined : { variant: undefined },
              term: (
                <HStack as="span" gap="2" alignItems="center">
                  {item.label}
                  {item.help ? (
                    <HelpTooltip
                      label={`${item.label} 안내`}
                      text={item.help}
                      side="bottom"
                      iconColor="black.50"
                      className={css({ transform: 'translateY(-1px)' })}
                    />
                  ) : null}
                </HStack>
              ),
              description:
                typeof item.value === 'string' ? (
                  item.value
                ) : (
                  <HStack as="span" gap="3" flexWrap="wrap">
                    {item.value.map((value, index) => (
                      <Fragment key={value}>
                        {index > 0 ? (
                          <Divider orientation="vertical" length="4" variant="strong" />
                        ) : null}
                        <Typography as="span" variant="body3">
                          {value}
                        </Typography>
                      </Fragment>
                    ))}
                  </HStack>
                ),
            }))}
            termProps={{ variant: 'body3', weight: 'bold' }}
            descriptionProps={{ variant: 'body3', tone: undefined }}
            slotStyles={{
              root: css.raw({
                display: 'flex',
                flexDirection: 'column',
                gridTemplateColumns: 'none',
                gap,
              }),
              row: css.raw({ display: 'flex', flexDirection: 'column', gap: '2' }),
              description: css.raw({ m: '0' }),
            }}
          />
        );
      })(),
    },
    {
      id: 'description-spec-4',
      title: '상품 상세 · 쿠셔닝·안정성',
      description: '실제 화면의 데이터·스타일',
      source: 'src/app/products/[id]/_components/ProductDetailContent.tsx',
      href: '/products/shoe-2#product-details',
      code: "import { Fragment } from 'react';\nimport { type Platform } from '@/context/platform';\nimport { css } from 'styled-system/css';\nimport { HStack } from 'styled-system/jsx';\nimport { DescriptionList } from '@/components/common/atoms/DescriptionList';\nimport { Divider } from '@/components/common/atoms/Divider';\nimport { Typography } from '@/components/common/atoms/Typography';\nimport { HelpTooltip } from '@/components/common/molecules/HelpTips';\nimport {\n  getProductDetailPresentation,\n  type ProductDetailSpecification,\n} from '@/app/products/[id]/productDetailPresentation';\nimport { products } from '@/mocks/products';\n\nfunction Example({ platform }: { platform: Platform }) {\n  const product = products.find((item) => item.id === 'shoe-2')!;\n  const items: readonly ProductDetailSpecification[] =\n    getProductDetailPresentation(product).attributes;\n  const gap = '4';\n  return (\n    <DescriptionList\n      items={items.map((item) => ({\n        descriptionProps: typeof item.value === 'string' ? undefined : { variant: undefined },\n        term: (\n          <HStack as=\"span\" gap=\"2\" alignItems=\"center\">\n            {item.label}\n            {item.help ? (\n              <HelpTooltip\n                label={`${item.label} 안내`}\n                text={item.help}\n                side=\"bottom\"\n                iconColor=\"black.50\"\n                className={css({ transform: 'translateY(-1px)' })}\n              />\n            ) : null}\n          </HStack>\n        ),\n        description:\n          typeof item.value === 'string' ? (\n            item.value\n          ) : (\n            <HStack as=\"span\" gap=\"3\" flexWrap=\"wrap\">\n              {item.value.map((value, index) => (\n                <Fragment key={value}>\n                  {index > 0 ? (\n                    <Divider orientation=\"vertical\" length=\"4\" variant=\"strong\" />\n                  ) : null}\n                  <Typography as=\"span\" variant=\"body3\">\n                    {value}\n                  </Typography>\n                </Fragment>\n              ))}\n            </HStack>\n          ),\n      }))}\n      termProps={{ variant: 'body3', weight: 'bold' }}\n      descriptionProps={{ variant: 'body3', tone: undefined }}\n      slotStyles={{\n        root: css.raw({\n          display: 'flex',\n          flexDirection: 'column',\n          gridTemplateColumns: 'none',\n          gap,\n        }),\n        row: css.raw({ display: 'flex', flexDirection: 'column', gap: '2' }),\n        description: css.raw({ m: '0' }),\n      }}\n    />\n  );\n}\n",
      preview: (() => {
        const product = products.find((item) => item.id === 'shoe-2')!;
        const items: readonly ProductDetailSpecification[] =
          getProductDetailPresentation(product).attributes;
        const gap = '4';
        return (
          <DescriptionList
            items={items.map((item) => ({
              descriptionProps: typeof item.value === 'string' ? undefined : { variant: undefined },
              term: (
                <HStack as="span" gap="2" alignItems="center">
                  {item.label}
                  {item.help ? (
                    <HelpTooltip
                      label={`${item.label} 안내`}
                      text={item.help}
                      side="bottom"
                      iconColor="black.50"
                      className={css({ transform: 'translateY(-1px)' })}
                    />
                  ) : null}
                </HStack>
              ),
              description:
                typeof item.value === 'string' ? (
                  item.value
                ) : (
                  <HStack as="span" gap="3" flexWrap="wrap">
                    {item.value.map((value, index) => (
                      <Fragment key={value}>
                        {index > 0 ? (
                          <Divider orientation="vertical" length="4" variant="strong" />
                        ) : null}
                        <Typography as="span" variant="body3">
                          {value}
                        </Typography>
                      </Fragment>
                    ))}
                  </HStack>
                ),
            }))}
            termProps={{ variant: 'body3', weight: 'bold' }}
            descriptionProps={{ variant: 'body3', tone: undefined }}
            slotStyles={{
              root: css.raw({
                display: 'flex',
                flexDirection: 'column',
                gridTemplateColumns: 'none',
                gap,
              }),
              row: css.raw({ display: 'flex', flexDirection: 'column', gap: '2' }),
              description: css.raw({ m: '0' }),
            }}
          />
        );
      })(),
    },
    {
      id: 'description-notice',
      title: '상품 상세 · 상품 고시',
      description: '실제 화면의 데이터·스타일',
      source: 'src/app/products/[id]/_components/ProductDetailContent.tsx',
      href: '/products/shoe-1#product-details',
      code: "import { type Platform } from '@/context/platform';\nimport { css } from 'styled-system/css';\nimport { DescriptionList } from '@/components/common/atoms/DescriptionList';\nimport { Typography } from '@/components/common/atoms/Typography';\nimport {\n  getProductDetailPresentation,\n  type ProductDetailSpecification,\n} from '@/app/products/[id]/productDetailPresentation';\nimport { products } from '@/mocks/products';\n\nfunction Example({ platform }: { platform: Platform }) {\n  const product = products.find((item) => item.id === 'shoe-1')!;\n  const presentation = getProductDetailPresentation(product);\n  const items: readonly ProductDetailSpecification[] = presentation.notice;\n  return (\n    <DescriptionList\n      items={items.map(({ label, value, note }) => ({\n        id: label,\n        term: (\n          <>\n            <Typography variant=\"body4\" weight=\"bold\">\n              {label}\n            </Typography>\n            {note ? <Typography variant=\"body4\">{note}</Typography> : null}\n          </>\n        ),\n        description: (\n          <Typography variant=\"body4\">\n            {typeof value === 'string' ? value : value.join(' | ')}\n          </Typography>\n        ),\n      }))}\n      termProps={{ variant: 'body4' }}\n      descriptionProps={{ variant: 'body4', tone: 'inherit' }}\n      slotStyles={{\n        root: css.raw({\n          display: 'flex',\n          flexDirection: 'column',\n          gap: '0',\n          bg: 'black.10',\n          mb: '8',\n        }),\n        row: css.raw({\n          display: 'grid',\n          gridTemplateColumns: '28.5% minmax(0, 1fr)',\n          gap: '0',\n          minH: '60px',\n          borderBottom: '1px solid token(colors.black.20)',\n          _last: { borderBottom: 'none' },\n        }),\n        term: css.raw({\n          display: 'flex',\n          flexDirection: 'column',\n          gap: '0',\n          px: '6',\n          py: '5',\n          alignItems: 'start',\n        }),\n        description: css.raw({\n          display: 'flex',\n          flexDirection: 'column',\n          gap: '0',\n          px: '6',\n          py: '5',\n          minW: '0',\n          overflowWrap: 'anywhere',\n        }),\n      }}\n    />\n  );\n}\n",
      preview: (() => {
        const product = products.find((item) => item.id === 'shoe-1')!;
        const presentation = getProductDetailPresentation(product);
        const items: readonly ProductDetailSpecification[] = presentation.notice;
        return (
          <DescriptionList
            items={items.map(({ label, value, note }) => ({
              id: label,
              term: (
                <>
                  <Typography variant="body4" weight="bold">
                    {label}
                  </Typography>
                  {note ? <Typography variant="body4">{note}</Typography> : null}
                </>
              ),
              description: (
                <Typography variant="body4">
                  {typeof value === 'string' ? value : value.join(' | ')}
                </Typography>
              ),
            }))}
            termProps={{ variant: 'body4' }}
            descriptionProps={{ variant: 'body4', tone: 'inherit' }}
            slotStyles={{
              root: css.raw({
                display: 'flex',
                flexDirection: 'column',
                gap: '0',
                bg: 'black.10',
                mb: '8',
              }),
              row: css.raw({
                display: 'grid',
                gridTemplateColumns: '28.5% minmax(0, 1fr)',
                gap: '0',
                minH: '60px',
                borderBottom: '1px solid token(colors.black.20)',
                _last: { borderBottom: 'none' },
              }),
              term: css.raw({
                display: 'flex',
                flexDirection: 'column',
                gap: '0',
                px: '6',
                py: '5',
                alignItems: 'start',
              }),
              description: css.raw({
                display: 'flex',
                flexDirection: 'column',
                gap: '0',
                px: '6',
                py: '5',
                minW: '0',
                overflowWrap: 'anywhere',
              }),
            }}
          />
        );
      })(),
    },
    {
      id: 'description-product-info',
      title: '상품 상세 · 상품 정보',
      description: '실제 화면의 데이터·스타일',
      source: 'src/app/products/[id]/_components/ProductDetailContent.tsx',
      href: '/products/shoe-1#product-information',
      code: "import { type Platform } from '@/context/platform';\nimport { css } from 'styled-system/css';\nimport { Box } from 'styled-system/jsx';\nimport { DescriptionList } from '@/components/common/atoms/DescriptionList';\nimport { products } from '@/mocks/products';\n\nfunction Example({ platform }: { platform: Platform }) {\n  const product = products.find((item) => item.id === 'shoe-1')!;\n\n  const specifications = [\n    { label: '신발 유형', value: '안정화' },\n    { label: '추천 활동', value: '로드 러닝, 워킹, 라이프 스타일' },\n    { label: platform === 'mobile' ? '러닝 용도' : '러닝 유형', value: product.runningType },\n  ];\n  return (\n    <Box\n      css={{\n        '--product-information-label-width': '112px',\n        _mobile: { '--product-information-label-width': '88px' },\n      }}\n    >\n      <DescriptionList\n        items={specifications.map(({ label, value }) => ({ term: label, description: value }))}\n        labelWidth=\"var(--product-information-label-width)\"\n        termProps={{\n          web: 'headingKr9',\n          mo: 'bodyKr3',\n          weight: 'semibold',\n        }}\n        descriptionProps={{ variant: 'body4', tone: 'primary' }}\n        slotStyles={{\n          root: css.raw({ columnGap: '3', rowGap: '6', alignItems: 'center' }),\n          term: css.raw({ fontSize: '20px', _mobile: { fontSize: '16px' } }),\n        }}\n      />\n    </Box>\n  );\n}\n",
      preview: (() => {
        const product = products.find((item) => item.id === 'shoe-1')!;

        const specifications = [
          { label: '신발 유형', value: '안정화' },
          { label: '추천 활동', value: '로드 러닝, 워킹, 라이프 스타일' },
          { label: platform === 'mobile' ? '러닝 용도' : '러닝 유형', value: product.runningType },
        ];
        return (
          <Box
            css={{
              '--product-information-label-width': '112px',
              _mobile: { '--product-information-label-width': '88px' },
            }}
          >
            <DescriptionList
              items={specifications.map(({ label, value }) => ({
                term: label,
                description: value,
              }))}
              labelWidth="var(--product-information-label-width)"
              termProps={{
                web: 'headingKr9',
                mo: 'bodyKr3',
                weight: 'semibold',
              }}
              descriptionProps={{ variant: 'body4', tone: 'primary' }}
              slotStyles={{
                root: css.raw({ columnGap: '3', rowGap: '6', alignItems: 'center' }),
                term: css.raw({ fontSize: '20px', _mobile: { fontSize: '16px' } }),
              }}
            />
          </Box>
        );
      })(),
    },
    {
      id: 'description-release',
      title: '런칭 상품 상세 · 발매 정보',
      description: '실제 화면의 데이터·스타일',
      source: 'src/app/launch-calendar/_components/LaunchCalendarDetail.tsx',
      href: '/launch-calendar/clifton-11-gtx',
      code: "import { type Platform } from '@/context/platform';\nimport { css } from 'styled-system/css';\nimport { DescriptionList } from '@/components/common/atoms/DescriptionList';\nimport { launchDetail } from '@/app/launch-calendar/launchCalendar.data';\n\nfunction Example({ platform }: { platform: Platform }) {\n  const product = launchDetail;\n  return (\n    <DescriptionList\n      items={product.releaseInformation}\n      labelWidth=\"128px\"\n      termProps={{ variant: 'body4', weight: 'semibold' }}\n      descriptionProps={{ variant: 'body4' }}\n      slotStyles={{\n        root: css.raw({\n          columnGap: '40px',\n          rowGap: '24px',\n          _mobile: { columnGap: '16px' },\n        }),\n      }}\n    />\n  );\n}\n",
      preview: (() => {
        const product = launchDetail;
        return (
          <DescriptionList
            items={product.releaseInformation}
            labelWidth="128px"
            termProps={{ variant: 'body4', weight: 'semibold' }}
            descriptionProps={{ variant: 'body4' }}
            slotStyles={{
              root: css.raw({
                columnGap: '40px',
                rowGap: '24px',
                _mobile: { columnGap: '16px' },
              }),
            }}
          />
        );
      })(),
    },
    {
      id: 'description-launch-spec',
      title: '런칭 상품 상세 · 상품 사양',
      description: '실제 화면의 데이터·스타일',
      source: 'src/app/launch-calendar/_components/LaunchCalendarDetail.tsx',
      href: '/launch-calendar/clifton-11-gtx',
      code: "import { type Platform } from '@/context/platform';\nimport { css } from 'styled-system/css';\nimport { DescriptionList } from '@/components/common/atoms/DescriptionList';\nimport { launchDetail } from '@/app/launch-calendar/launchCalendar.data';\n\nfunction Example({ platform }: { platform: Platform }) {\n  const product = launchDetail;\n  return (\n    <DescriptionList\n      items={product.specifications}\n      labelWidth=\"80px\"\n      termProps={{ variant: 'body4', weight: 'semibold' }}\n      descriptionProps={{ variant: 'body4' }}\n      slotStyles={{ root: css.raw({ columnGap: '12px', rowGap: '24px' }) }}\n    />\n  );\n}\n",
      preview: (() => {
        const product = launchDetail;
        return (
          <DescriptionList
            items={product.specifications}
            labelWidth="80px"
            termProps={{ variant: 'body4', weight: 'semibold' }}
            descriptionProps={{ variant: 'body4' }}
            slotStyles={{ root: css.raw({ columnGap: '12px', rowGap: '24px' }) }}
          />
        );
      })(),
    },
    {
      id: 'description-session-hero',
      title: '러닝 세션 · 상단 요약',
      description: '실제 화면의 데이터·스타일',
      source:
        'src/app/running/running-session/[sessionId]/_components/RunningSessionSessionContent.tsx',
      href: '/running/running-session/yeouido-night',
      code: "import { type Platform } from '@/context/platform';\nimport { css, cva } from 'styled-system/css';\nimport { DescriptionList } from '@/components/common/atoms/DescriptionList';\nimport { Typography } from '@/components/common/atoms/Typography';\nimport {\n  runningSessionSessions,\n  runningSessionVenue,\n  runningSessionAddress,\n} from '@/components/running-session/runningSession.data';\n\nfunction Example({ platform }: { platform: Platform }) {\n  const session = runningSessionSessions.find((item) => item.id === 'yeouido-night')!;\n  const variant: 'hero' | 'guide' = 'hero' as 'hero' | 'guide';\n  const facts = cva({\n    base: {\n      m: '0',\n    },\n    variants: {\n      variant: {\n        hero: {\n          py: '32px',\n          display: 'grid',\n          rowGap: '24px',\n          borderBlock: '1px solid var(--color-border-default)',\n          _mobile: {\n            py: '32px',\n          },\n        },\n        guide: {},\n      },\n    },\n  });\n  const detailText = css({ display: 'block', mt: '4px' });\n  const rows: { label: string; value: string; detail?: string; mobileOnly?: boolean }[] = [\n    { label: '일시', value: session.schedule },\n    { label: '장소', value: runningSessionVenue, detail: runningSessionAddress },\n    { label: '정원', value: '20명' },\n    {\n      label: '예약금',\n      value: '5,000원',\n      detail: '노쇼 방지를 위해 예약금을 받고 있습니다. 현장 출석 확인 후 자동 취소 됩니다.',\n    },\n    { label: '신청 기간', value: '1월 23일 (토) - 1월 29일 (금)' },\n  ];\n  return (\n    <DescriptionList\n      items={rows.map(({ label, value, detail, mobileOnly }) => ({\n        term: label,\n        description: (\n          <>\n            {value}\n            {detail ? (\n              <Typography as=\"span\" variant=\"body4\" tone=\"tertiary\" className={detailText}>\n                {detail}\n              </Typography>\n            ) : null}\n          </>\n        ),\n        rowClassName: mobileOnly\n          ? css({ display: 'none!', _mobile: { display: 'grid!' } })\n          : undefined,\n      }))}\n      termProps={{\n        variant: variant === 'hero' ? 'body3' : 'body4',\n        mo: variant === 'hero' ? 'body3' : 'body4',\n        weight: variant === 'hero' ? 'semibold' : 'regular',\n      }}\n      descriptionProps={{\n        variant: variant === 'hero' ? 'body3' : 'body4',\n        mo: variant === 'hero' ? 'body3' : 'body4',\n        tone: undefined,\n      }}\n      slotStyles={{\n        root: css.raw(facts.raw({ variant }), {\n          display: variant === 'hero' ? 'grid' : 'block',\n          gridTemplateColumns: 'none',\n          gap: variant === 'hero' ? '24px normal' : 'normal',\n        }),\n        row: css.raw({\n          display: 'grid',\n          gridTemplateColumns:\n            variant === 'hero' ? '58px minmax(0, 1fr)' : '60px minmax(0, 1fr)',\n          gap: '16px',\n          py: variant === 'hero' ? '0' : '24px',\n          borderTop: variant === 'guide' ? '1px solid var(--color-border-default)' : undefined,\n          _last:\n            variant === 'guide'\n              ? { borderBottom: '1px solid var(--color-border-default)' }\n              : undefined,\n          _mobile: { py: variant === 'hero' ? '0' : '24px' },\n        }),\n        description: css.raw({ m: '0' }),\n      }}\n    />\n  );\n}\n",
      preview: (() => {
        const session = runningSessionSessions.find((item) => item.id === 'yeouido-night')!;
        const variant: 'hero' | 'guide' = 'hero' as 'hero' | 'guide';
        const facts = cva({
          base: {
            m: '0',
          },
          variants: {
            variant: {
              hero: {
                py: '32px',
                display: 'grid',
                rowGap: '24px',
                borderBlock: '1px solid var(--color-border-default)',
                _mobile: {
                  py: '32px',
                },
              },
              guide: {},
            },
          },
        });
        const detailText = css({ display: 'block', mt: '4px' });
        const rows: { label: string; value: string; detail?: string; mobileOnly?: boolean }[] = [
          { label: '일시', value: session.schedule },
          { label: '장소', value: runningSessionVenue, detail: runningSessionAddress },
          { label: '정원', value: '20명' },
          {
            label: '예약금',
            value: '5,000원',
            detail: '노쇼 방지를 위해 예약금을 받고 있습니다. 현장 출석 확인 후 자동 취소 됩니다.',
          },
          { label: '신청 기간', value: '1월 23일 (토) - 1월 29일 (금)' },
        ];
        return (
          <DescriptionList
            items={rows.map(({ label, value, detail, mobileOnly }) => ({
              term: label,
              description: (
                <>
                  {value}
                  {detail ? (
                    <Typography as="span" variant="body4" tone="tertiary" className={detailText}>
                      {detail}
                    </Typography>
                  ) : null}
                </>
              ),
              rowClassName: mobileOnly
                ? css({ display: 'none!', _mobile: { display: 'grid!' } })
                : undefined,
            }))}
            termProps={{
              variant: variant === 'hero' ? 'body3' : 'body4',
              mo: variant === 'hero' ? 'body3' : 'body4',
              weight: variant === 'hero' ? 'semibold' : 'regular',
            }}
            descriptionProps={{
              variant: variant === 'hero' ? 'body3' : 'body4',
              mo: variant === 'hero' ? 'body3' : 'body4',
              tone: undefined,
            }}
            slotStyles={{
              root: css.raw(facts.raw({ variant }), {
                display: variant === 'hero' ? 'grid' : 'block',
                gridTemplateColumns: 'none',
                gap: variant === 'hero' ? '24px normal' : 'normal',
              }),
              row: css.raw({
                display: 'grid',
                gridTemplateColumns:
                  variant === 'hero' ? '58px minmax(0, 1fr)' : '60px minmax(0, 1fr)',
                gap: '16px',
                py: variant === 'hero' ? '0' : '24px',
                borderTop:
                  variant === 'guide' ? '1px solid var(--color-border-default)' : undefined,
                _last:
                  variant === 'guide'
                    ? { borderBottom: '1px solid var(--color-border-default)' }
                    : undefined,
                _mobile: { py: variant === 'hero' ? '0' : '24px' },
              }),
              description: css.raw({ m: '0' }),
            }}
          />
        );
      })(),
    },
    {
      id: 'description-session-guide',
      title: '러닝 세션 · 상세 안내',
      description: '실제 화면의 데이터·스타일',
      source:
        'src/app/running/running-session/[sessionId]/_components/RunningSessionSessionContent.tsx',
      href: '/running/running-session/yeouido-night',
      code: "import { type Platform } from '@/context/platform';\nimport { css, cva } from 'styled-system/css';\nimport { DescriptionList } from '@/components/common/atoms/DescriptionList';\nimport { Typography } from '@/components/common/atoms/Typography';\nimport {\n  runningSessionSessions,\n  runningSessionVenue,\n  runningSessionAddress,\n} from '@/components/running-session/runningSession.data';\n\nfunction Example({ platform }: { platform: Platform }) {\n  const session = runningSessionSessions.find((item) => item.id === 'yeouido-night')!;\n  const variant: 'hero' | 'guide' = 'guide' as 'hero' | 'guide';\n  const facts = cva({\n    base: {\n      m: '0',\n    },\n    variants: {\n      variant: {\n        hero: {\n          py: '32px',\n          display: 'grid',\n          rowGap: '24px',\n          borderBlock: '1px solid var(--color-border-default)',\n          _mobile: {\n            py: '32px',\n          },\n        },\n        guide: {},\n      },\n    },\n  });\n  const detailText = css({ display: 'block', mt: '4px' });\n  const rows: { label: string; value: string; detail?: string; mobileOnly?: boolean }[] = [\n    { label: '장소', value: `${runningSessionVenue} · ${runningSessionAddress}` },\n    { label: '체크인', value: '세션 시작 20분 전부터' },\n    { label: '소요시간', value: '약 1시간 30분 소요' },\n    { label: '코스', value: session.location },\n    { label: '페이스', value: '6′30″ / 7′00″ (중급 레벨)' },\n    { label: '거리', value: session.distance },\n    { label: '준비물', value: '러닝화, 편안한 복장, 헤드 랜턴' },\n    { label: '혜택', value: '세션에서 제공되는 선물 & 트라이얼 서비스' },\n  ];\n  return (\n    <DescriptionList\n      items={rows.map(({ label, value, detail, mobileOnly }) => ({\n        term: label,\n        description: (\n          <>\n            {value}\n            {detail ? (\n              <Typography as=\"span\" variant=\"body4\" tone=\"tertiary\" className={detailText}>\n                {detail}\n              </Typography>\n            ) : null}\n          </>\n        ),\n        rowClassName: mobileOnly\n          ? css({ display: 'none!', _mobile: { display: 'grid!' } })\n          : undefined,\n      }))}\n      termProps={{\n        variant: variant === 'hero' ? 'body3' : 'body4',\n        mo: variant === 'hero' ? 'body3' : 'body4',\n        weight: variant === 'hero' ? 'semibold' : 'regular',\n      }}\n      descriptionProps={{\n        variant: variant === 'hero' ? 'body3' : 'body4',\n        mo: variant === 'hero' ? 'body3' : 'body4',\n        tone: undefined,\n      }}\n      slotStyles={{\n        root: css.raw(facts.raw({ variant }), {\n          display: variant === 'hero' ? 'grid' : 'block',\n          gridTemplateColumns: 'none',\n          gap: variant === 'hero' ? '24px normal' : 'normal',\n        }),\n        row: css.raw({\n          display: 'grid',\n          gridTemplateColumns:\n            variant === 'hero' ? '58px minmax(0, 1fr)' : '60px minmax(0, 1fr)',\n          gap: '16px',\n          py: variant === 'hero' ? '0' : '24px',\n          borderTop: variant === 'guide' ? '1px solid var(--color-border-default)' : undefined,\n          _last:\n            variant === 'guide'\n              ? { borderBottom: '1px solid var(--color-border-default)' }\n              : undefined,\n          _mobile: { py: variant === 'hero' ? '0' : '24px' },\n        }),\n        description: css.raw({ m: '0' }),\n      }}\n    />\n  );\n}\n",
      preview: (() => {
        const session = runningSessionSessions.find((item) => item.id === 'yeouido-night')!;
        const variant: 'hero' | 'guide' = 'guide' as 'hero' | 'guide';
        const facts = cva({
          base: {
            m: '0',
          },
          variants: {
            variant: {
              hero: {
                py: '32px',
                display: 'grid',
                rowGap: '24px',
                borderBlock: '1px solid var(--color-border-default)',
                _mobile: {
                  py: '32px',
                },
              },
              guide: {},
            },
          },
        });
        const detailText = css({ display: 'block', mt: '4px' });
        const rows: { label: string; value: string; detail?: string; mobileOnly?: boolean }[] = [
          { label: '장소', value: `${runningSessionVenue} · ${runningSessionAddress}` },
          { label: '체크인', value: '세션 시작 20분 전부터' },
          { label: '소요시간', value: '약 1시간 30분 소요' },
          { label: '코스', value: session.location },
          { label: '페이스', value: '6′30″ / 7′00″ (중급 레벨)' },
          { label: '거리', value: session.distance },
          { label: '준비물', value: '러닝화, 편안한 복장, 헤드 랜턴' },
          { label: '혜택', value: '세션에서 제공되는 선물 & 트라이얼 서비스' },
        ];
        return (
          <DescriptionList
            items={rows.map(({ label, value, detail, mobileOnly }) => ({
              term: label,
              description: (
                <>
                  {value}
                  {detail ? (
                    <Typography as="span" variant="body4" tone="tertiary" className={detailText}>
                      {detail}
                    </Typography>
                  ) : null}
                </>
              ),
              rowClassName: mobileOnly
                ? css({ display: 'none!', _mobile: { display: 'grid!' } })
                : undefined,
            }))}
            termProps={{
              variant: variant === 'hero' ? 'body3' : 'body4',
              mo: variant === 'hero' ? 'body3' : 'body4',
              weight: variant === 'hero' ? 'semibold' : 'regular',
            }}
            descriptionProps={{
              variant: variant === 'hero' ? 'body3' : 'body4',
              mo: variant === 'hero' ? 'body3' : 'body4',
              tone: undefined,
            }}
            slotStyles={{
              root: css.raw(facts.raw({ variant }), {
                display: variant === 'hero' ? 'grid' : 'block',
                gridTemplateColumns: 'none',
                gap: variant === 'hero' ? '24px normal' : 'normal',
              }),
              row: css.raw({
                display: 'grid',
                gridTemplateColumns:
                  variant === 'hero' ? '58px minmax(0, 1fr)' : '60px minmax(0, 1fr)',
                gap: '16px',
                py: variant === 'hero' ? '0' : '24px',
                borderTop:
                  variant === 'guide' ? '1px solid var(--color-border-default)' : undefined,
                _last:
                  variant === 'guide'
                    ? { borderBottom: '1px solid var(--color-border-default)' }
                    : undefined,
                _mobile: { py: variant === 'hero' ? '0' : '24px' },
              }),
              description: css.raw({ m: '0' }),
            }}
          />
        );
      })(),
    },
    {
      id: 'description-recipient',
      title: '주문 상세 · 받는사람 정보',
      description: '실제 화면의 데이터·스타일',
      source: 'src/app/mypage/orders/_components/OrderDetails.tsx',
      href: '/mypage/orders/preview-detail',
      code: "import { type Platform } from '@/context/platform';\nimport { css } from 'styled-system/css';\nimport { DescriptionList } from '@/components/common/atoms/DescriptionList';\nimport { previewOrders } from '@/components/orders/orders.data';\n\nfunction Example({ platform }: { platform: Platform }) {\n  const display = previewOrders[3].detailDisplay[platform];\n  return (\n    <DescriptionList\n      items={[\n        { term: '받는사람', description: display.recipient.name },\n        { term: '연락처', description: display.recipient.phone },\n        { term: '받는주소', description: display.recipient.address },\n        { term: '배송요청사항', description: display.recipient.request },\n      ]}\n      termProps={{ variant: 'body4', tone: 'tertiary' }}\n      descriptionProps={{ variant: 'body4', weight: 'medium' }}\n      slotStyles={{\n        root: css.raw({ display: 'block' }),\n        row: css.raw({\n          display: 'grid',\n          gridTemplateColumns: {\n            base: '104px minmax(0, 1fr)',\n            _mobile: '96px minmax(0, 1fr)',\n          },\n          gap: '8px',\n          py: { base: '20px', _mobile: '16px' },\n          borderBottom: '1px solid var(--colors-black-20)',\n        }),\n      }}\n    />\n  );\n}\n",
      preview: (() => {
        const display = previewOrders[3].detailDisplay[platform];
        return (
          <DescriptionList
            items={[
              { term: '받는사람', description: display.recipient.name },
              { term: '연락처', description: display.recipient.phone },
              { term: '받는주소', description: display.recipient.address },
              { term: '배송요청사항', description: display.recipient.request },
            ]}
            termProps={{ variant: 'body4', tone: 'tertiary' }}
            descriptionProps={{ variant: 'body4', weight: 'medium' }}
            slotStyles={{
              root: css.raw({ display: 'block' }),
              row: css.raw({
                display: 'grid',
                gridTemplateColumns: {
                  base: '104px minmax(0, 1fr)',
                  _mobile: '96px minmax(0, 1fr)',
                },
                gap: '8px',
                py: { base: '20px', _mobile: '16px' },
                borderBottom: '1px solid var(--colors-black-20)',
              }),
            }}
          />
        );
      })(),
    },
    {
      id: 'description-cancel',
      title: '취소·반품 상세 · 취소 정보',
      description: '실제 화면의 데이터·스타일',
      source: 'src/app/mypage/orders/_components/OrderDetails.tsx',
      href: '/mypage/orders/preview-cancel-detail',
      code: "import { type Platform } from '@/context/platform';\nimport { css } from 'styled-system/css';\nimport {\n  DescriptionList,\n  type DescriptionListItem,\n} from '@/components/common/atoms/DescriptionList';\nimport { previewOrders } from '@/components/orders/orders.data';\n\nfunction Example({ platform }: { platform: Platform }) {\n  const claim = previewOrders[3].claims.find((item) => item.kind === 'cancel')!;\n  const display = claim.detailDisplay[platform];\n  const name = '취소';\n  const items: DescriptionListItem[] = [\n    { term: name + '접수일자', description: display.requestedAt },\n    { term: name + '접수번호', description: display.claimNumber },\n    { term: name + '완료일', description: display.completedAt },\n  ];\n  return (\n    <DescriptionList\n      items={items}\n      termProps={{ web: 'body3', mo: 'body4', tone: 'subtle' }}\n      descriptionProps={{ web: 'body3', mo: 'body4', tone: 'primary', weight: 'medium' }}\n      slotStyles={{\n        root: css.raw({ display: 'block' }),\n        row: css.raw({\n          display: 'grid',\n          gridTemplateColumns: '96px minmax(0, 1fr)',\n          gap: '8px',\n          py: { base: '20px', _mobile: '16px' },\n          borderBottom: '1px solid var(--colors-black-20)',\n        }),\n      }}\n    />\n  );\n}\n",
      preview: (() => {
        const claim = previewOrders[3].claims.find((item) => item.kind === 'cancel')!;
        const display = claim.detailDisplay[platform];
        const name = '취소';
        const items: DescriptionListItem[] = [
          { term: name + '접수일자', description: display.requestedAt },
          { term: name + '접수번호', description: display.claimNumber },
          { term: name + '완료일', description: display.completedAt },
        ];
        return (
          <DescriptionList
            items={items}
            termProps={{ web: 'body3', mo: 'body4', tone: 'subtle' }}
            descriptionProps={{ web: 'body3', mo: 'body4', tone: 'primary', weight: 'medium' }}
            slotStyles={{
              root: css.raw({ display: 'block' }),
              row: css.raw({
                display: 'grid',
                gridTemplateColumns: '96px minmax(0, 1fr)',
                gap: '8px',
                py: { base: '20px', _mobile: '16px' },
                borderBottom: '1px solid var(--colors-black-20)',
              }),
            }}
          />
        );
      })(),
    },
    {
      id: 'description-return',
      title: '취소·반품 상세 · 반품 정보',
      description: '실제 화면의 데이터·스타일',
      source: 'src/app/mypage/orders/_components/OrderDetails.tsx',
      href: '/mypage/orders/preview-return-detail',
      code: "import { type Platform } from '@/context/platform';\nimport { css } from 'styled-system/css';\nimport {\n  DescriptionList,\n  type DescriptionListItem,\n} from '@/components/common/atoms/DescriptionList';\nimport { previewOrders } from '@/components/orders/orders.data';\n\nfunction Example({ platform }: { platform: Platform }) {\n  const claim = previewOrders[3].claims.find((item) => item.kind === 'return')!;\n  const display = claim.detailDisplay[platform];\n  const name = '반품';\n  const items: DescriptionListItem[] = [\n    { term: name + '접수일자', description: display.requestedAt },\n    { term: name + '접수번호', description: display.claimNumber },\n    { term: name + '완료일', description: display.completedAt },\n    { term: '환불완료일', description: display.refundedAt },\n  ];\n  return (\n    <DescriptionList\n      items={items}\n      termProps={{ web: 'body3', mo: 'body4', tone: 'subtle' }}\n      descriptionProps={{ web: 'body3', mo: 'body4', tone: 'primary', weight: 'medium' }}\n      slotStyles={{\n        root: css.raw({ display: 'block' }),\n        row: css.raw({\n          display: 'grid',\n          gridTemplateColumns: '96px minmax(0, 1fr)',\n          gap: '8px',\n          py: { base: '20px', _mobile: '16px' },\n          borderBottom: '1px solid var(--colors-black-20)',\n        }),\n      }}\n    />\n  );\n}\n",
      preview: (() => {
        const claim = previewOrders[3].claims.find((item) => item.kind === 'return')!;
        const display = claim.detailDisplay[platform];
        const name = '반품';
        const items: DescriptionListItem[] = [
          { term: name + '접수일자', description: display.requestedAt },
          { term: name + '접수번호', description: display.claimNumber },
          { term: name + '완료일', description: display.completedAt },
          { term: '환불완료일', description: display.refundedAt },
        ];
        return (
          <DescriptionList
            items={items}
            termProps={{ web: 'body3', mo: 'body4', tone: 'subtle' }}
            descriptionProps={{ web: 'body3', mo: 'body4', tone: 'primary', weight: 'medium' }}
            slotStyles={{
              root: css.raw({ display: 'block' }),
              row: css.raw({
                display: 'grid',
                gridTemplateColumns: '96px minmax(0, 1fr)',
                gap: '8px',
                py: { base: '20px', _mobile: '16px' },
                borderBottom: '1px solid var(--colors-black-20)',
              }),
            }}
          />
        );
      })(),
    },
    {
      id: 'description-collection',
      title: '반품 상세 · 회수 정보',
      description: '실제 화면의 데이터·스타일',
      source: 'src/app/mypage/orders/_components/OrderDetails.tsx',
      href: '/mypage/orders/preview-return-detail',
      code: "import { type Platform } from '@/context/platform';\nimport { css } from 'styled-system/css';\nimport { DescriptionList } from '@/components/common/atoms/DescriptionList';\nimport { previewOrders } from '@/components/orders/orders.data';\n\nfunction Example({ platform }: { platform: Platform }) {\n  const claim = previewOrders[3].claims.find((item) => item.kind === 'return')!;\n\n  const items = [\n    { term: '회수인', description: claim.collection?.name ?? '-' },\n    { term: '연락처', description: claim.collection?.phone ?? '-' },\n    { term: '주소', description: claim.collection?.address ?? '-' },\n    { term: '택배사', description: claim.collection?.carrier ?? '-' },\n    { term: '송장번호', description: claim.collection?.trackingNumber ?? '-' },\n    { term: '회수예정일', description: claim.collection?.scheduledDate ?? '-' },\n  ];\n  return (\n    <DescriptionList\n      items={items}\n      termProps={{ web: 'body3', mo: 'body4', tone: 'subtle' }}\n      descriptionProps={{ web: 'body3', mo: 'body4', tone: 'primary', weight: 'medium' }}\n      slotStyles={{\n        root: css.raw({ display: 'block' }),\n        row: css.raw({\n          display: 'grid',\n          gridTemplateColumns: '96px minmax(0, 1fr)',\n          gap: '8px',\n          py: { base: '20px', _mobile: '16px' },\n          borderBottom: '1px solid var(--colors-black-20)',\n        }),\n      }}\n    />\n  );\n}\n",
      preview: (() => {
        const claim = previewOrders[3].claims.find((item) => item.kind === 'return')!;

        const items = [
          { term: '회수인', description: claim.collection?.name ?? '-' },
          { term: '연락처', description: claim.collection?.phone ?? '-' },
          { term: '주소', description: claim.collection?.address ?? '-' },
          { term: '택배사', description: claim.collection?.carrier ?? '-' },
          { term: '송장번호', description: claim.collection?.trackingNumber ?? '-' },
          { term: '회수예정일', description: claim.collection?.scheduledDate ?? '-' },
        ];
        return (
          <DescriptionList
            items={items}
            termProps={{ web: 'body3', mo: 'body4', tone: 'subtle' }}
            descriptionProps={{ web: 'body3', mo: 'body4', tone: 'primary', weight: 'medium' }}
            slotStyles={{
              root: css.raw({ display: 'block' }),
              row: css.raw({
                display: 'grid',
                gridTemplateColumns: '96px minmax(0, 1fr)',
                gap: '8px',
                py: { base: '20px', _mobile: '16px' },
                borderBottom: '1px solid var(--colors-black-20)',
              }),
            }}
          />
        );
      })(),
    },
    {
      id: 'description-reason',
      title: '반품 상세 · 환불사유',
      description: '실제 반품 상세에서 데스크탑만 사용하는 목록',
      source: 'src/app/mypage/orders/_components/OrderDetails.tsx',
      href: '/mypage/orders/preview-return-detail',
      code: "import { type Platform } from '@/context/platform';\nimport { css } from 'styled-system/css';\nimport { Box } from 'styled-system/jsx';\nimport { DescriptionList } from '@/components/common/atoms/DescriptionList';\nimport { previewOrders } from '@/components/orders/orders.data';\n\nfunction Example({ platform }: { platform: Platform }) {\n  const claim = previewOrders[3].claims.find((item) => item.kind === 'return')!;\n  const display = claim.detailDisplay[platform];\n  const items = [{ term: '취소사유', description: display.reason }];\n  return (\n    <Box display={{ base: 'block', _mobile: 'none' }}>\n      <DescriptionList\n        items={items}\n        termProps={{ web: 'body3', mo: 'body4', tone: 'subtle' }}\n        descriptionProps={{ web: 'body3', mo: 'body4', tone: 'primary', weight: 'medium' }}\n        slotStyles={{\n          root: css.raw({ display: 'block' }),\n          row: css.raw({\n            display: 'grid',\n            gridTemplateColumns: '96px minmax(0, 1fr)',\n            gap: '8px',\n            py: { base: '20px', _mobile: '16px' },\n            borderBottom: '1px solid var(--colors-black-20)',\n          }),\n        }}\n      />\n    </Box>\n  );\n}\n",
      preview: (() => {
        const claim = previewOrders[3].claims.find((item) => item.kind === 'return')!;
        const display = claim.detailDisplay[platform];
        const items = [{ term: '취소사유', description: display.reason }];
        return (
          <Box display={{ base: 'block', _mobile: 'none' }}>
            <DescriptionList
              items={items}
              termProps={{ web: 'body3', mo: 'body4', tone: 'subtle' }}
              descriptionProps={{ web: 'body3', mo: 'body4', tone: 'primary', weight: 'medium' }}
              slotStyles={{
                root: css.raw({ display: 'block' }),
                row: css.raw({
                  display: 'grid',
                  gridTemplateColumns: '96px minmax(0, 1fr)',
                  gap: '8px',
                  py: { base: '20px', _mobile: '16px' },
                  borderBottom: '1px solid var(--colors-black-20)',
                }),
              }}
            />
          </Box>
        );
      })(),
    },
    {
      id: 'description-profile',
      title: '회원정보 수정 · 계정 요약',
      description: '실제 화면의 데이터·스타일',
      source: 'src/app/mypage/profile/_components/ProfileContent.tsx',
      href: '/mypage/profile/preview-edit',
      code: "import { type Platform } from '@/context/platform';\nimport { css } from 'styled-system/css';\nimport { DescriptionList } from '@/components/common/atoms/DescriptionList';\n\nfunction Example({ platform }: { platform: Platform }) {\n  const profileDetails = [\n    ['회원 아이디', 'hon******'],\n    ['이름', '손*민'],\n    ['생년월일', '1993.05.22'],\n    ['주소', '서울시 성북구 테헤란로 27길 54 테헤란 아파트 701호'],\n    ['이메일', 'dww******@gmail.com'],\n    ['휴대폰 번호', '010-****-0522'],\n  ] as const;\n  const details = profileDetails.slice(0, 4);\n  return (\n    <DescriptionList\n      items={(details ?? profileDetails.slice(0, 4)).map(([term, description]) => ({\n        term,\n        description,\n      }))}\n      termProps={{ variant: 'body3', weight: 'semibold' }}\n      descriptionProps={{ variant: 'body3', tone: 'subtle' }}\n      slotStyles={{\n        root: css.raw({ gridTemplateColumns: 'none', gap: '0', _mobile: { gap: '6' } }),\n        row: css.raw({\n          display: 'flex',\n          flexDirection: 'column',\n          gap: '4',\n          py: '6',\n          pr: '4',\n          borderBottom: '1px solid var(--colors-black-20)',\n          _first: { pt: '0' },\n          _mobile: { gap: '3', p: '0', borderBottom: '0' },\n        }),\n        description: css.raw({ m: '0' }),\n      }}\n    />\n  );\n}\n",
      preview: (() => {
        const profileDetails = [
          ['회원 아이디', 'hon******'],
          ['이름', '손*민'],
          ['생년월일', '1993.05.22'],
          ['주소', '서울시 성북구 테헤란로 27길 54 테헤란 아파트 701호'],
          ['이메일', 'dww******@gmail.com'],
          ['휴대폰 번호', '010-****-0522'],
        ] as const;
        const details = profileDetails.slice(0, 4);
        return (
          <DescriptionList
            items={(details ?? profileDetails.slice(0, 4)).map(([term, description]) => ({
              term,
              description,
            }))}
            termProps={{ variant: 'body3', weight: 'semibold' }}
            descriptionProps={{ variant: 'body3', tone: 'subtle' }}
            slotStyles={{
              root: css.raw({ gridTemplateColumns: 'none', gap: '0', _mobile: { gap: '6' } }),
              row: css.raw({
                display: 'flex',
                flexDirection: 'column',
                gap: '4',
                py: '6',
                pr: '4',
                borderBottom: '1px solid var(--colors-black-20)',
                _first: { pt: '0' },
                _mobile: { gap: '3', p: '0', borderBottom: '0' },
              }),
              description: css.raw({ m: '0' }),
            }}
          />
        );
      })(),
    },
    {
      id: 'description-marketing',
      title: '회원정보 · 마케팅 수신',
      description: '실제 화면의 데이터·스타일',
      source: 'src/app/mypage/profile/_components/ProfileContent.tsx',
      href: '/mypage/profile',
      code: "import { type Platform } from '@/context/platform';\nimport { css } from 'styled-system/css';\nimport { DescriptionList } from '@/components/common/atoms/DescriptionList';\n\nfunction Example({ platform }: { platform: Platform }) {\n  const emailPreference = '수신안함';\n  const smsPreference = '수신안함';\n  const kakaoPreference = '수신안함';\n  return (\n    <DescriptionList\n      items={[\n        { term: '이메일 수신', description: emailPreference },\n        { term: '문자수신(LMS, SMS)', description: smsPreference },\n        { term: '카카오톡 알림톡 수신', description: kakaoPreference },\n      ]}\n      termProps={{ variant: 'body3', mo: 'body4' }}\n      descriptionProps={{ variant: 'body3', mo: 'body4', tone: 'subtle' }}\n      slotStyles={{\n        root: css.raw({ gridTemplateColumns: 'none', gap: '6', _mobile: { gap: '4' } }),\n        row: css.raw({\n          display: 'flex',\n          alignItems: 'center',\n          justifyContent: 'flex-start',\n          gap: '0',\n          _mobile: { justifyContent: 'space-between' },\n        }),\n        term: css.raw({ w: '178px', _mobile: { w: 'auto' } }),\n        description: css.raw({ m: '0' }),\n      }}\n    />\n  );\n}\n",
      preview: (() => {
        const emailPreference = '수신안함';
        const smsPreference = '수신안함';
        const kakaoPreference = '수신안함';
        return (
          <DescriptionList
            items={[
              { term: '이메일 수신', description: emailPreference },
              { term: '문자수신(LMS, SMS)', description: smsPreference },
              { term: '카카오톡 알림톡 수신', description: kakaoPreference },
            ]}
            termProps={{ variant: 'body3', mo: 'body4' }}
            descriptionProps={{ variant: 'body3', mo: 'body4', tone: 'subtle' }}
            slotStyles={{
              root: css.raw({ gridTemplateColumns: 'none', gap: '6', _mobile: { gap: '4' } }),
              row: css.raw({
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: '0',
                _mobile: { justifyContent: 'space-between' },
              }),
              term: css.raw({ w: '178px', _mobile: { w: 'auto' } }),
              description: css.raw({ m: '0' }),
            }}
          />
        );
      })(),
    },
    {
      id: 'description-profile-confirm',
      title: '회원정보 · 확인 목록',
      description: '실제 화면의 데이터·스타일',
      source: 'src/app/mypage/profile/_components/ProfileContent.tsx',
      href: '/mypage/profile',
      code: "import { type Platform } from '@/context/platform';\nimport { css } from 'styled-system/css';\nimport { DescriptionList } from '@/components/common/atoms/DescriptionList';\n\nfunction Example({ platform }: { platform: Platform }) {\n  const profileDetails = [\n    ['회원 아이디', 'hon******'],\n    ['이름', '손*민'],\n    ['생년월일', '1993.05.22'],\n    ['주소', '서울시 성북구 테헤란로 27길 54 테헤란 아파트 701호'],\n    ['이메일', 'dww******@gmail.com'],\n    ['휴대폰 번호', '010-****-0522'],\n  ] as const;\n  const savedAddress = {\n    postalCode: '02157',\n    address: '서울시 성북구 테헤란로 27길 54',\n    addressDetail: '테헤란 아파트 701호',\n  };\n  const email = 'dww******@gmail.com';\n  const phone = '010-****-0522';\n  return (\n    <DescriptionList\n      items={[\n        ...profileDetails.slice(0, 3).map(([term, description]) => ({ term, description })),\n        {\n          term: '주소',\n          description: `${savedAddress.address} ${savedAddress.addressDetail}`,\n        },\n        { term: '이메일', description: email },\n        { term: '휴대폰 번호', description: phone },\n      ]}\n      termProps={{ variant: 'body3', weight: 'semibold' }}\n      descriptionProps={{ variant: 'body3', tone: 'subtle' }}\n      slotStyles={{\n        root: css.raw({\n          gridTemplateColumns: 'none',\n          gap: '12',\n          pb: '8',\n          borderBottom: '1px solid var(--colors-black-20)',\n          _mobile: { gap: '6', pb: '6' },\n        }),\n        row: css.raw({\n          display: 'flex',\n          gap: '0',\n          _mobile: { flexDirection: 'column', gap: '3' },\n        }),\n        term: css.raw({ w: '178px', flexShrink: '0', _mobile: { w: 'auto' } }),\n        description: css.raw({ m: '0' }),\n      }}\n    />\n  );\n}\n",
      preview: (() => {
        const profileDetails = [
          ['회원 아이디', 'hon******'],
          ['이름', '손*민'],
          ['생년월일', '1993.05.22'],
          ['주소', '서울시 성북구 테헤란로 27길 54 테헤란 아파트 701호'],
          ['이메일', 'dww******@gmail.com'],
          ['휴대폰 번호', '010-****-0522'],
        ] as const;
        const savedAddress = {
          postalCode: '02157',
          address: '서울시 성북구 테헤란로 27길 54',
          addressDetail: '테헤란 아파트 701호',
        };
        const email = 'dww******@gmail.com';
        const phone = '010-****-0522';
        return (
          <DescriptionList
            items={[
              ...profileDetails.slice(0, 3).map(([term, description]) => ({ term, description })),
              {
                term: '주소',
                description: `${savedAddress.address} ${savedAddress.addressDetail}`,
              },
              { term: '이메일', description: email },
              { term: '휴대폰 번호', description: phone },
            ]}
            termProps={{ variant: 'body3', weight: 'semibold' }}
            descriptionProps={{ variant: 'body3', tone: 'subtle' }}
            slotStyles={{
              root: css.raw({
                gridTemplateColumns: 'none',
                gap: '12',
                pb: '8',
                borderBottom: '1px solid var(--colors-black-20)',
                _mobile: { gap: '6', pb: '6' },
              }),
              row: css.raw({
                display: 'flex',
                gap: '0',
                _mobile: { flexDirection: 'column', gap: '3' },
              }),
              term: css.raw({ w: '178px', flexShrink: '0', _mobile: { w: 'auto' } }),
              description: css.raw({ m: '0' }),
            }}
          />
        );
      })(),
    },
  ];
}
