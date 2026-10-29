'use client';

/**
 * [개발팀 바인딩]
 * 홈/BO 카드의 제목·설명·이미지·actions 목적지를 기존 props에 전달합니다. 데이터 조회와 게시 기간/노출 권한 판단은 부모 콘텐츠 어댑터가 담당합니다.
 * 액션의 to는 표시 라벨과 함께 갱신하고 이미지/링크가 없는 실제 결과를 다른 시안 카드로 대체하지 않습니다.
 */

import NextImage from 'next/image';

import { type CSSProperties, type ReactNode, useEffect, useState } from 'react';

import { css, cva } from 'styled-system/css';

import { ButtonLink } from '@/components/common/atoms/Button';
import { Card } from '@/components/common/atoms/Card';

import { ContentHeader } from '@/components/common/molecules/ContentHeader';

export type MainContentCardAction = {
  label: string;
  to: string;
  variant?: 'link' | 'primary' | 'secondary';
};

export type MainContentCardImageAspectRatio = {
  desktop: string;
  mobile?: string;
};

export type MainContentCardVariant = 'titleLinks' | 'descriptionLink' | 'imagePill' | 'overlay';

type ContentTone = 'dark' | 'light';

export type MainContentCardProps = {
  actions: readonly MainContentCardAction[];
  className?: string;
  description?: ReactNode;
  image: string;
  imageAspectRatio?: MainContentCardImageAspectRatio;
  imageSizes?: string;
  title: string;
  variant?: MainContentCardVariant;
};

const root = cva({
  base: { minW: '0', position: 'relative', overflow: 'hidden' },
  variants: {
    variant: {
      titleLinks: { gap: '21px', _mobile: { gap: '18px' } },
      descriptionLink: { gap: '21px', _mobile: { gap: '5' } },
      imagePill: { gap: '0', bg: 'var(--color-surface-subtle)' },
      overlay: {
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        gap: '8',
        bg: 'var(--color-surface-subtle)',
        aspectRatio: '371 / 494',
        p: '28px 28px 40px',
        _mobile: { gap: '5', aspectRatio: '253 / 337', p: '16px 16px 30px' },
      },
    },
  },
});

const categoryImage = cva({
  base: {
    w: '100%',
    position: 'relative',
    aspectRatio: 'var(--main-content-card-image-ratio-desktop, 371 / 494)',
    _mobile: { aspectRatio: 'var(--main-content-card-image-ratio-mobile, 371 / 494)' },
  },
  variants: {
    variant: {
      titleLinks: {},
      descriptionLink: {
        _mobile: { aspectRatio: 'var(--main-content-card-image-ratio-mobile, 1 / 1)' },
      },
      imagePill: { aspectRatio: '1 / 1' },
      overlay: {
        aspectRatio: 'auto',
        position: 'absolute',
        top: '0',
        right: '0',
        bottom: '0',
        left: '0',
        _mobile: { aspectRatio: 'auto' },
      },
    },
  },
});

const cardImage = cva({
  base: { zIndex: '0', objectFit: 'cover' },
  variants: {
    variant: {
      titleLinks: {},
      descriptionLink: {},
      imagePill: { objectFit: 'contain' },
      overlay: {},
    },
  },
});

const overlayGradient = css({
  position: 'absolute',
  inset: '0',
  zIndex: '0',
  pointerEvents: 'none',
  background:
    'linear-gradient(180deg, color-mix(in srgb, var(--color-black-100) 0%, transparent) 60.3%, color-mix(in srgb, var(--color-black-100) 30%, transparent) 94.22%)',
});

const header = cva({
  variants: {
    variant: {
      titleLinks: { gap: '26px', _mobile: { gap: '5' } },
      descriptionLink: { gap: '26px', _mobile: { gap: '5', px: '4' } },
      imagePill: {
        position: 'relative',
        zIndex: '1',
        gap: '5',
        mt: '-16',
        px: '8',
        pt: '8',
        _mobile: { gap: '4', mt: '-6', px: '4', pt: '6' },
      },
      overlay: { position: 'relative', zIndex: '1', gap: '6', _mobile: { gap: '5' } },
    },
  },
});

const title = cva({
  base: { m: '0' },
  variants: {
    variant: {
      titleLinks: {},
      descriptionLink: {},
      imagePill: {},
      overlay: {},
    },
  },
});

const descriptionStyle = cva({
  base: {
    m: '0',
    minH: '2.6em',
    overflow: 'hidden',
    lineClamp: '2',
  },
  variants: {
    variant: {
      descriptionLink: {},
      imagePill: {},
      overlay: {
        minH: '0',
        fontSize: '20',
        _mobile: { fontSize: 'var(--home-body-14, var(--font-sizes-14))' },
      },
    },
  },
});

const footer = cva({
  variants: {
    variant: {
      titleLinks: { p: '5px 0 0', _mobile: { p: '2px 0 0' } },
      descriptionLink: { p: '5px 0 0', _mobile: { p: '2px 0 0' } },
      imagePill: {},
      overlay: { position: 'relative', zIndex: '1' },
    },
  },
});

const actions = cva({
  base: { display: 'flex', flexWrap: 'wrap', gap: '4' },
  variants: {
    variant: {
      titleLinks: {},
      descriptionLink: { _mobile: { px: '4' } },
      imagePill: {
        gap: '3',
        px: '8',
        pb: '38px',
        pt: '5',
        _mobile: { px: '4', pb: '30px', pt: '4' },
      },
      overlay: { position: 'relative', zIndex: '1' },
    },
  },
});

function getAverageLuminance(image: HTMLImageElement) {
  const canvas = document.createElement('canvas');
  canvas.width = 32;
  canvas.height = 16;
  const context = canvas.getContext('2d', { willReadFrequently: true });
  if (!context || !image.naturalWidth || !image.naturalHeight) return null;

  const sourceHeight = Math.max(1, Math.round(image.naturalHeight * 0.45));
  context.drawImage(
    image,
    0,
    image.naturalHeight - sourceHeight,
    image.naturalWidth,
    sourceHeight,
    0,
    0,
    canvas.width,
    canvas.height,
  );

  const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
  let luminance = 0;
  let weight = 0;
  for (let index = 0; index < pixels.length; index += 4) {
    const alpha = pixels[index + 3] / 255;
    luminance +=
      (0.2126 * pixels[index] + 0.7152 * pixels[index + 1] + 0.0722 * pixels[index + 2]) * alpha;
    weight += alpha;
  }

  return weight ? luminance / weight / 255 : null;
}

function MainCardAction({
  label,
  to,
  variant = 'link',
  tone,
}: MainContentCardAction & { tone: ContentTone }) {
  const resolvedVariant =
    variant === 'secondary' ? (tone === 'light' ? 'secondary' : 'primary') : variant;

  if (resolvedVariant === 'link') {
    return (
      <ButtonLink href={to} variant="link" size="md">
        {label}
      </ButtonLink>
    );
  }

  return (
    <ButtonLink
      href={to}
      variant={resolvedVariant}
      colorway={resolvedVariant === 'primary' && tone === 'light' ? 'white' : 'black'}
    >
      {label}
    </ButtonLink>
  );
}

/** 홈 카테고리와 프로모션 이미지를 링크 카드로 표시합니다. (Displays home category and promotion images in linked cards.) */
export function MainContentCard({
  actions: cardActions,
  className,
  description,
  image,
  imageAspectRatio,
  imageSizes,
  title: cardTitle,
  variant = 'titleLinks',
}: MainContentCardProps) {
  const [overlayAnalysis, setOverlayAnalysis] = useState<{ source: string; tone: ContentTone }>({
    source: '',
    tone: 'light',
  });

  useEffect(() => {
    if (variant !== 'overlay') return;

    let cancelled = false;
    const overlayImage = new Image();
    overlayImage.crossOrigin = 'anonymous';
    overlayImage.onload = () => {
      try {
        const luminance = getAverageLuminance(overlayImage);
        if (!cancelled && luminance !== null) {
          setOverlayAnalysis({ source: image, tone: luminance > 0.55 ? 'dark' : 'light' });
        }
      } catch {
        // Keep the white-content fallback when a remote image cannot be read from Canvas.
      }
    };
    overlayImage.src = image;

    return () => {
      cancelled = true;
    };
  }, [image, variant]);

  const contentTone: ContentTone =
    variant === 'overlay'
      ? overlayAnalysis.source === image
        ? overlayAnalysis.tone
        : 'light'
      : 'dark';
  const foreground =
    contentTone === 'light' ? 'var(--color-text-inverse)' : 'var(--color-text-primary)';
  const imageStyle = {
    ...(imageAspectRatio
      ? {
          '--main-content-card-image-ratio-desktop': imageAspectRatio.desktop,
          '--main-content-card-image-ratio-mobile':
            imageAspectRatio.mobile ?? imageAspectRatio.desktop,
        }
      : {}),
  } as CSSProperties;
  return (
    <Card className={[root({ variant }), className].filter(Boolean).join(' ')}>
      <Card.Content className={categoryImage({ variant })} style={imageStyle}>
        <NextImage
          src={image}
          alt=""
          fill
          sizes={
            imageSizes ??
            (variant === 'titleLinks'
              ? '(max-width: 1024px) calc(83.2vw + 16px), 24vw'
              : variant === 'imagePill'
                ? '(max-width: 1024px) 253px, 24vw'
                : '(max-width: 1024px) calc(100vw - 32px), 33vw')
          }
          className={cardImage({ variant })}
        />
        {variant === 'overlay' ? <div aria-hidden="true" className={overlayGradient} /> : null}
      </Card.Content>
      <ContentHeader
        as="header"
        gap="0"
        className="card__header"
        css={header.raw({ variant })}
        titleAs="h3"
        title={cardTitle}
        titleProps={{
          className: title({ variant }),
          style: { color: foreground },
          web: variant === 'overlay' ? 'heading6' : 'heading8',
          mo: variant === 'titleLinks' || variant === 'descriptionLink' ? 'heading6' : 'body1',
          weight: 'black',
        }}
        description={description}
        descriptionProps={{
          className: descriptionStyle({ variant: variant === 'titleLinks' ? undefined : variant }),
          style: { color: foreground },
          variant: 'body',
        }}
      />
      <Card.Footer className={footer({ variant })}>
        <Card.Action className={actions({ variant })}>
          {cardActions.map((action) => (
            <MainCardAction key={`${action.label}-${action.to}`} {...action} tone={contentTone} />
          ))}
        </Card.Action>
      </Card.Footer>
    </Card>
  );
}
