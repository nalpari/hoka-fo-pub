'use client';

import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import { cva } from 'styled-system/css';
import { ButtonLink } from '@/shared/components/atoms/Button/Button';
import { Card } from '@/shared/components/atoms/Card/Card';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

export type MainContentCardAction = {
  label: string;
  to: string;
  variant?: 'link' | 'secondary';
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
  title: string;
  variant?: MainContentCardVariant;
};

const root = cva({
  base: { minW: '0', position: 'relative', overflow: 'hidden' },
  variants: {
    variant: {
      titleLinks: { gap: '21px', _mobile: { gap: '18px' } },
      descriptionLink: { gap: '21px', _mobile: { gap: '20px' } },
      imagePill: { gap: '0', bg: 'var(--color-surface-subtle)' },
      overlay: {
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        gap: '32px',
        bg: 'var(--color-surface-subtle)',
        aspectRatio: '371 / 494',
        p: '28px 28px 40px',
        _mobile: { gap: '20px', aspectRatio: '253 / 337', p: '16px 16px 30px' },
      },
    },
  },
});

const categoryImage = cva({
  base: {
    w: '100%',
    aspectRatio: 'var(--main-content-card-image-ratio-desktop, 371 / 494)',
    bgPosition: 'center',
    bgSize: 'cover',
    _mobile: { aspectRatio: 'var(--main-content-card-image-ratio-mobile, 371 / 494)' },
  },
  variants: {
    variant: {
      titleLinks: {},
      descriptionLink: {
        _mobile: { aspectRatio: 'var(--main-content-card-image-ratio-mobile, 1 / 1)' },
      },
      imagePill: { aspectRatio: '1 / 1', bgRepeat: 'no-repeat', bgSize: 'contain' },
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

const header = cva({
  base: { display: 'flex', flexDirection: 'column' },
  variants: {
    variant: {
      titleLinks: { gap: '26px', _mobile: { gap: '20px' } },
      descriptionLink: { gap: '26px', _mobile: { gap: '20px', px: '16px' } },
      imagePill: {
        position: 'relative',
        zIndex: '1',
        gap: '20px',
        mt: '-64px',
        px: '32px',
        pt: '32px',
        _mobile: { gap: '16px', mt: '-24px', px: '16px', pt: '24px' },
      },
      overlay: { position: 'relative', zIndex: '1', gap: '24px', _mobile: { gap: '20px' } },
    },
  },
});

const title = cva({
  base: { m: '0' },
  variants: {
    variant: {
      titleLinks: {},
      descriptionLink: {},
      imagePill: { _mobile: { fontSize: '24px', lineHeight: '23px' } },
      overlay: {
        fontSize: '32px',
        lineHeight: '31px',
        _mobile: { fontSize: '24px', lineHeight: '23px' },
      },
    },
  },
});

const descriptionStyle = cva({
  base: { m: '0' },
  variants: {
    variant: {
      descriptionLink: {},
      imagePill: {},
      overlay: { fontSize: '20px', _mobile: { fontSize: '14px' } },
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
  base: { display: 'flex', flexWrap: 'wrap', gap: '16px' },
  variants: {
    variant: {
      titleLinks: {},
      descriptionLink: { _mobile: { px: '16px' } },
      imagePill: {
        gap: '12px',
        px: '32px',
        pb: '38px',
        pt: '20px',
        _mobile: { px: '16px', pb: '30px', pt: '16px' },
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
    variant === 'secondary' ? (tone === 'light' ? 'secondary' : 'secondaryInverse') : variant;

  return (
    <ButtonLink to={to} variant={resolvedVariant}>
      {label}
    </ButtonLink>
  );
}

/** Home category content card with linked actions. */
export function MainContentCard({
  actions: cardActions,
  className,
  description,
  image,
  imageAspectRatio,
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
    backgroundImage:
      variant === 'overlay'
        ? `linear-gradient(180deg, rgba(0, 0, 0, 0) 60.3%, rgba(0, 0, 0, 0.3) 94.22%), url("${image}")`
        : `url("${image}")`,
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
      <Card.Content className={categoryImage({ variant })} style={imageStyle} />
      <Card.Header className={header({ variant })}>
        <Typography
          as="h3"
          className={title({ variant })}
          style={{ color: foreground }}
          variant="cardTitle"
        >
          {cardTitle}
        </Typography>
        {description ? (
          <Typography
            as="p"
            className={descriptionStyle({
              variant: variant === 'titleLinks' ? undefined : variant,
            })}
            style={{ color: foreground }}
            variant="body"
          >
            {description}
          </Typography>
        ) : null}
      </Card.Header>
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
