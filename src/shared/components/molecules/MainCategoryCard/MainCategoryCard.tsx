import type { ReactNode } from 'react';
import { css, cva } from 'styled-system/css';
import { Card } from '@/shared/components/atoms/Card/Card';
import { Link } from '@/shared/components/atoms/Link/Link';

export type MainCategoryCardLink = {
  label: string;
  to: string;
};

export type MainCategoryCardVariant = 'titleLinks' | 'descriptionLink' | 'overlay';

export type MainCategoryCardProps = {
  title: string;
  image: string;
  links: MainCategoryCardLink[];
  description?: ReactNode;
  variant?: MainCategoryCardVariant;
  className?: string;
};

const root = cva({
  base: {
    minW: '0',
    position: 'relative',
    overflow: 'hidden',
  },
  variants: {
    variant: {
      titleLinks: {
        gap: '21px',
        _mobile: { gap: '18px' }, // 26px
      },
      descriptionLink: {
        gap: '21px',
        _mobile: { gap: '20px' }, // 20px
      },
      overlay: {
        alignItems: 'flex-end',
        gap: '32px',
        bg: '#F3F3F3',
        aspectRatio: '371 / 494',
        p: '28px 28px 40px',
        _mobile: { gap: '20px', aspectRatio: '253 / 337', p: '16px 16px 30px' },
      },
    },
  },
});

const image = cva({
  base: { w: '100%', aspectRatio: '371 / 494', bgPosition: 'center', bgSize: 'cover' },
  variants: {
    variant: {
      titleLinks: {},
      descriptionLink: {
        _mobile: { aspectRatio: '1 / 1' },
      },
      overlay: {
        aspectRatio: '1 / 1',
        position: 'absolute',
        top: '0',
        right: '0',
        bottom: '0',
        left: '0',
        _mobile: { aspectRatio: '1 / 1' },
      },
    },
  },
});

const header = cva({
  base: { display: 'flex', flexDirection: 'column' },
  variants: {
    variant: {
      titleLinks: { gap: '26px', _mobile: { gap: '20px' } },
      descriptionLink: {
        gap: '26px',
        _mobile: { gap: '20px', px: '16px' },
      },
      overlay: {
        gap: '24px',
        _mobile: { gap: '20px' },
      },
    },
  },
});

const title = cva({
  base: {
    m: '0',
    fontSize: '24px',
    lineHeight: '23px',
    fontWeight: '900',
    color: '#000000',
    _mobile: { fontSize: '20px' },
  },
  variants: {
    variant: {
      titleLinks: {
        _mobile: {},
      },
      descriptionLink: {
        _mobile: {},
      },
      overlay: {
        fontSize: '32px',
        lineHeight: '31px',
        _mobile: {
          fontSize: '24px',
          lineHeight: '23px',
        },
      },
    },
  },
});

const description = cva({
  base: {
    m: '0',
    fontWeight: '400',
    lineHeight: '130%',
    color: '#000000',
    letterSpacing: '-0.02em',
  },
  variants: {
    variant: {
      titleLinks: {},
      descriptionLink: {
        fontSize: '16px',
        _mobile: {
          fontSize: '14px',
        },
      },
      overlay: {
        fontSize: '20px',
        _mobile: {
          fontSize: '14px',
        },
      },
    },
  },
});

const footer = cva({
  base: {},
  variants: {
    variant: {
      titleLinks: { p: '5px 0 0', _mobile: { p: '2px 0 0' } },
      descriptionLink: { p: '5px 0 0', _mobile: { p: '2px 0 0' } },
      overlay: {},
    },
  },
});

const action = css({ display: 'flex', flexWrap: 'wrap', gap: '16px' });

const actionLink = css({
  color: '#000000',
  fontSize: '16px',
  fontWeight: '600',
  lineHeight: '130%',
  letterSpacing: '-0.02em',
  textDecorationLine: 'underline',
  _mobile: { fontSize: '14px' },
});

export function MainCategoryCard({
  title: cardTitle,
  image: imageUrl,
  links: cardLinks,
  description: cardDescription,
  variant = 'titleLinks',
  className,
}: MainCategoryCardProps) {
  const imageStyle = { backgroundImage: `url("${imageUrl}")` };

  return (
    <Card className={[root({ variant }), className].filter(Boolean).join(' ')}>
      <Card.Content className={image({ variant })} style={imageStyle} />
      <Card.Header className={header({ variant })}>
        <Card.Title className={title({ variant })}>{cardTitle}</Card.Title>
        {variant !== 'titleLinks' && cardDescription ? (
          <Card.Description className={description({ variant })}>
            {cardDescription}
          </Card.Description>
        ) : null}
      </Card.Header>
      <Card.Footer className={footer({ variant })}>
        <Card.Action className={action}>
          {cardLinks.map((link) => (
            <Link className={actionLink} key={`${link.label}-${link.to}`} to={link.to}>
              {link.label}
            </Link>
          ))}
        </Card.Action>
      </Card.Footer>
    </Card>
  );
}
