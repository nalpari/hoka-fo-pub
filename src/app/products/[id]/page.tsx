'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

import { Tooltip } from '@base-ui/react/tooltip';
import {
  faBoxOpen,
  faClipboardList,
  faMagnifyingGlass,
  faScrewdriverWrench,
  faTruckFast,
} from '@fortawesome/free-solid-svg-icons';
import {
  Component,
  type ComponentPropsWithoutRef,
  type CSSProperties,
  Fragment,
  type ReactNode,
  type Ref,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import { type Platform, usePlatform } from '@/context/platform';
import { useRoutePreview } from '@/context/RoutePreview';
import { useShop } from '@/context/ShopShell';

import { css, cva } from 'styled-system/css';
import { Box, Divider, Flex, Grid, HStack, Stack, VStack } from 'styled-system/jsx';

import { Accordion, type AccordionEntry } from '@/components/common/atoms/Accordion';
import { Badge } from '@/components/common/atoms/Badge';
import { Button, type ButtonIconProps, ButtonLink } from '@/components/common/atoms/Button';
import { Checkbox } from '@/components/common/atoms/Checkbox';
import { DescriptionList } from '@/components/common/atoms/DescriptionList';
import { Icon } from '@/components/common/atoms/Icon';
import { NumberStepper } from '@/components/common/atoms/NumberStepper';
import { RatingStars } from '@/components/common/atoms/RatingStars';
import { Typography } from '@/components/common/atoms/Typography';
import { Wishlist } from '@/components/common/atoms/Wishlist';

import { AmountRow } from '@/components/common/molecules/AmountRow';
import {
  Carousel,
  CarouselPagination,
  CarouselViewport,
} from '@/components/common/molecules/Carousel/Carousel';
import { ContentHeader } from '@/components/common/molecules/ContentHeader';
import { HomeCarouselSection } from '@/components/common/molecules/HomeCarouselSection';
import { ProductCard } from '@/components/common/molecules/ProductCard/ProductCard';
import { ProductColorSelector as ColorSelector } from '@/components/common/molecules/ProductOptionSelectors/ProductColorSelector';
import { ProductSizeSelector as SizeSelector } from '@/components/common/molecules/ProductOptionSelectors/ProductSizeSelector';
import { ProductWidthSelector } from '@/components/common/molecules/ProductOptionSelectors/ProductWidthSelector';

import { ContentLayout } from '@/components/common/layouts/ContentLayout';
import { ContentSection } from '@/components/common/layouts/ContentSection';

import { shoeCareSections } from '@/components/care-guide/care.data';
import { CareInstructions } from '@/components/care-guide/CareInstructions';
import { NotFoundPage } from '@/components/not-found/NotFoundPage';
import { ProductDetailImage } from '@/components/product/ProductDetailImage';
import {
  getProductDetailPresentation,
  productDetailAnchors,
  type ProductDetailSpecification,
  type ProductEditorialFeature,
  type ProductTechnicalScaleData,
} from '@/components/product/productDetailPresentation';
import { productInquiries } from '@/components/product/productInquiries';
import { productSizeOptions } from '@/components/product/productSizeOptions';
import { faChevronDown, faXmark } from '@/icons/fontAwesome';
import { type Product, products, type ProductWidthOption } from '@/mocks/products';
import { type CartItem } from '@/types/cart';

const ProductDetailViewerContent = dynamic(
  () => import('./_components/ProductDetailViewerContent'),
  { loading: () => <Typography role="status">상품 이미지를 불러오는 중입니다.</Typography> },
);

class ViewerContentBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? (
      <Typography role="alert">
        이미지를 불러오지 못했습니다. 뷰어를 닫고 페이지를 새로고침해 주세요.
      </Typography>
    ) : (
      this.props.children
    );
  }
}

function ProductDetailGrid({ children }: { children: ReactNode }) {
  return (
    <Grid
      w="min(calc(100% - var(--layout-web-content-inline-space)), var(--layout-web-content-max-width))"
      mx="auto"
      gridTemplateColumns="minmax(0, 1016fr) minmax(340px, 480fr)"
      gap="8"
      _mobile={{ display: 'block', w: '100%' }}
    >
      {children}
    </Grid>
  );
}

type Props = { isViewing: boolean; children: ReactNode; footer: ReactNode };

/** Keep the purchasing grid contained and its footer outside the grid. */
function ProductDetailBody({ isViewing, children, footer }: Props) {
  return (
    <Box hidden={isViewing}>
      <ProductDetailGrid>{children}</ProductDetailGrid>
      {footer}
    </Box>
  );
}

const ProductDetailLayoutStyles = {
  page: css({ w: '100%', pt: '14', pb: '24', _mobile: { pt: 0 } }),
};

type ProductDetailLayoutProps = {
  viewer: ReactNode;
  isViewing: boolean;
  children: ReactNode;
  footer: ReactNode;
};

function ProductDetailLayout({ viewer, isViewing, children, footer }: ProductDetailLayoutProps) {
  return (
    <ContentLayout className={ProductDetailLayoutStyles.page}>
      {viewer}
      <ProductDetailBody isViewing={isViewing} footer={footer}>
        {children}
      </ProductDetailBody>
    </ContentLayout>
  );
}

type ProductDetailImageViewerProps = {
  images: string[];
  initialIndex: number;
  onClose: () => void;
  productName: string;
};

const viewerClose = css({
  position: 'absolute',
  top: '8',
  right: '8',
  zIndex: '2',
  _focusVisible: { outline: '2px solid var(--color-focus-ring)', outlineOffset: '2px' },
});

function ProductDetailImageViewer({
  images,
  initialIndex,
  onClose,
  productName,
}: ProductDetailImageViewerProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true });
  }, []);

  return (
    <Box
      as="section"
      position="relative"
      w="100%"
      maxW="var(--layout-web-content-max-width)"
      mx="auto"
      bg="var(--color-white-000)"
      aria-label={`${productName} 상품 이미지 상세`}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          event.stopPropagation();
          onClose();
        }
      }}
    >
      <Typography as="h1" srOnly>
        {productName} 상품 이미지
      </Typography>
      <Button
        ref={closeRef}
        aria-label="이미지 뷰어 닫기"
        className={viewerClose}
        onClick={onClose}
        variant="ghost"
        icon={<Icon fontAwesomeIcon={faXmark} size="24px" />}
      />
      <ViewerContentBoundary>
        <ProductDetailViewerContent
          images={images}
          initialIndex={initialIndex}
          productName={productName}
        />
      </ViewerContentBoundary>
    </Box>
  );
}

type ProductImageGridProps = {
  images: string[];
  productName: string;
  onOpenImage: (index: number) => void;
};

function ProductImageGrid({ images, productName, onOpenImage }: ProductImageGridProps) {
  return (
    <Grid aria-label="상품 이미지" gap="4" gridTemplateColumns="repeat(2, minmax(0, 1fr))">
      {images.map((image, index) => (
        <ProductDetailImage
          eager={index === 0}
          alt={`${productName} ${index + 1}`}
          key={image}
          onClick={() => onOpenImage(index)}
          src={image}
        />
      ))}
    </Grid>
  );
}

const carouselStyles = {
  dots: css({
    position: 'relative',
    zIndex: '1',
    mt: '-24px',
    pb: '16px',
    display: 'flex',
    justifyContent: 'center',
    gap: '5px',
  }),
};

type ProductImageCarouselProps = {
  images: string[];
  productName: string;
};

function ProductImageCarousel({ images, productName }: ProductImageCarouselProps) {
  return (
    <Box as="section" aria-label="상품 이미지" bg="var(--color-black-10)">
      <Carousel itemCount={images.length} loop>
        <CarouselViewport freeMode={false} mobileItemGutter={0} mode="mobile" showScrollbar={false}>
          {images.map((image, index) => (
            <Box w="100%" key={image}>
              <ProductDetailImage
                eager={index === 0}
                alt={`${productName} ${index + 1}`}
                src={image}
              />
            </Box>
          ))}
        </CarouselViewport>
        <CarouselPagination className={carouselStyles.dots} label="상품 이미지 선택" />
      </Carousel>
    </Box>
  );
}

type ProductDetailGalleryProps = {
  images: string[];
  productName: string;
  onOpenImage: (index: number) => void;
};

/** 상품 이미지를 그리드 또는 캐러셀로 표시합니다. (Displays product images in a grid or carousel.) */
function ProductDetailGallery({ images, productName, onOpenImage }: ProductDetailGalleryProps) {
  const platform = usePlatform();

  if (platform === 'mobile')
    return <ProductImageCarousel images={images} productName={productName} />;

  return <ProductImageGrid onOpenImage={onOpenImage} images={images} productName={productName} />;
}

type InquiryBoardHeaderProps = {
  headingId: string;
  title: string;
  count: number;
  variant?: 'default' | 'product';
  filterDisabled?: boolean;
  excludePrivate: boolean;
  onExcludePrivateChange: (checked: boolean) => void;
  action?: ReactNode;
};

/** 문의 게시판의 제목·건수·필터 동작을 배치합니다. (Arranges the inquiry board title, count, and filter action.) */
function InquiryBoardHeader({
  headingId,
  title,
  count,
  variant = 'default',
  filterDisabled,
  excludePrivate,
  onExcludePrivateChange,
  action,
}: InquiryBoardHeaderProps) {
  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      gap="4"
      pb={variant === 'product' ? '23px' : '5'}
      borderBottom="1px solid var(--color-black-100)"
      _mobile={{ flexWrap: 'wrap' }}
    >
      <ContentHeader
        titleAs="h3"
        title={
          variant === 'product' ? (
            <>
              {title}{' '}
              <Typography variant="body1" weight="medium">
                ({count})
              </Typography>
            </>
          ) : (
            `${title}(${count})`
          )
        }
        titleProps={{
          id: headingId,
          variant: variant === 'product' ? 'heading8' : 'body2',
          weight: variant === 'product' ? undefined : 'bold',
        }}
        orientation="horizontal"
        justifyContent="flex-start"
        flexWrap="wrap"
        gap="5"
        _mobile={{ gap: '3' }}
        action={
          <Checkbox
            label="비밀글 제외"
            variant="filter"
            disabled={filterDisabled}
            checked={excludePrivate}
            onCheckedChange={onExcludePrivateChange}
          />
        }
      />
      {action}
    </Flex>
  );
}

function InquiryBoardContent({
  item,
  variant = 'default',
}: {
  item: InquiryBoardEntry;
  variant?: 'default' | 'product';
}) {
  return item.visibility === 'restricted' ? (
    <Typography as="p" variant="body4" tone={variant === 'product' ? 'subtle' : undefined}>
      비공개글은 작성자 본인만 확인할 수 있습니다.
    </Typography>
  ) : (
    <Stack gap="6">
      <Typography as="div" variant="body4">
        {item.content}
      </Typography>
      {item.answer != null && (
        <Grid
          gap={variant === 'product' ? '3' : '2'}
          borderTop={variant === 'product' ? '1px solid token(colors.black.20)' : undefined}
          pt={variant === 'product' ? '6' : undefined}
        >
          <Typography variant="body4" weight="bold">
            답변
          </Typography>
          <Typography as="div" variant="body4" tone={variant === 'product' ? 'subtle' : undefined}>
            {item.answer}
          </Typography>
        </Grid>
      )}
    </Stack>
  );
}

type InquiryMetadata = {
  id: string;
  author: string;
  date: string;
  status: 'pending' | 'answered';
};

/** Restricted entries deliberately carry no private title, body, or answer. */
type InquiryBoardEntry = InquiryMetadata &
  (
    | { visibility: 'restricted' }
    | {
        visibility: 'public' | 'private';
        title: string;
        content: ReactNode;
        answer?: ReactNode;
      }
  );

type InquiryBoardProps = {
  title: string;
  items: readonly InquiryBoardEntry[];
  action?: ReactNode;
  defaultExpandedIds?: string[];
  className?: string;
  variant?: 'default' | 'product';
  pageSize?: number;
  loadMoreSize?: number;
};

const styles = {
  item: css({ borderBottom: '1px solid var(--color-border-default)' }),
  trigger: css({
    textAlign: 'left',
    _focusVisible: { outline: '2px solid var(--color-focus-ring)', outlineOffset: '-2px' },
  }),
  productPanel: css({
    p: '6',
    bg: 'black.10',
    borderTop: '1px solid token(colors.black.20)',
    overflowWrap: 'anywhere',
    whiteSpace: 'pre-wrap',
  }),
  productEmpty: css({
    display: 'flex',
    minH: '120px',
    alignItems: 'center',
    justifyContent: 'center',
  }),
  title: css({ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }),
  metadata: css({ textAlign: 'center', _mobile: { textAlign: 'left' } }),
  panel: css({
    p: '32px 20px',
    bg: 'var(--colors-surface-subtle)',
    borderTop: '1px solid var(--color-border-default)',
    overflowWrap: 'anywhere',
    whiteSpace: 'pre-wrap',
    _mobile: { p: '24px 12px' },
  }),

  empty: css({
    py: '48px',
    textAlign: 'center',
    borderBottom: '1px solid var(--color-border-default)',
  }),
};

function InquirySubject({
  item,
  variant,
}: {
  item: InquiryBoardEntry;
  variant: 'default' | 'product';
}) {
  const isPrivate = item.visibility !== 'public';

  return (
    <Grid
      as="span"
      gridTemplateColumns="minmax(0, 1fr) 100px 100px 100px"
      alignItems="center"
      w="100%"
      minH={variant === 'product' ? '59px' : '60px'}
      pl={variant === 'product' ? '6' : '5'}
      pr={variant === 'product' ? '0' : '5'}
      gap="0"
      _mobile={{
        gridTemplateColumns: 'minmax(0, 1fr) auto auto',
        gap: '3',
        px: '3',
        py: '4',
      }}
    >
      <Flex
        as="span"
        alignItems="center"
        gap="2"
        minW="0"
        direction={variant === 'product' ? 'row-reverse' : 'row'}
        justifyContent={variant === 'product' ? 'flex-end' : undefined}
        _mobile={{ gridColumn: '1 / -1' }}
      >
        <Typography variant="body4" className={styles.title}>
          {item.visibility === 'restricted' ? '비공개 문의글입니다.' : item.title}
        </Typography>
        {isPrivate && (
          <Icon src="/images/icon/lock-keyhole.svg" size={14} alt="" aria-hidden="true" />
        )}
      </Flex>
      <Typography variant="body4" tone="tertiary" className={styles.metadata}>
        {item.author}
      </Typography>
      <Typography
        as="time"
        dateTime={item.date}
        variant="body4"
        tone="tertiary"
        className={styles.metadata}
      >
        {item.date}
      </Typography>
      <Typography variant="body4" weight="bold" className={styles.metadata}>
        {item.status === 'answered' ? '답변완료' : variant === 'product' ? '접수' : '답변대기'}
      </Typography>
    </Grid>
  );
}

/** Shared inquiry board for product details and account inquiry history. */
function InquiryBoard({
  title,
  items,
  action,
  defaultExpandedIds,
  className,
  variant = 'default',
  pageSize,
  loadMoreSize = 16,
}: InquiryBoardProps) {
  const headingId = useId();
  const [excludePrivate, setExcludePrivate] = useState(false);
  const [shownCount, setShownCount] = useState(pageSize ?? items.length);
  const visibleItems = excludePrivate
    ? items.filter((item) => item.visibility === 'public')
    : items;
  const limit = pageSize === undefined ? visibleItems.length : shownCount;
  const displayedItems = visibleItems.slice(0, limit);
  const nextCount = Math.min(loadMoreSize, visibleItems.length - limit);

  return (
    <Box as="section" w="100%" minW="0" aria-labelledby={headingId} className={className}>
      <InquiryBoardHeader
        headingId={headingId}
        title={title}
        count={items.length}
        variant={variant}
        filterDisabled={variant === 'product' && items.length === 0}
        excludePrivate={excludePrivate}
        onExcludePrivateChange={(checked) => {
          setExcludePrivate(checked);
          setShownCount(pageSize ?? items.length);
        }}
        action={action}
      />
      {visibleItems.length ? (
        <Accordion
          multiple={variant === 'product'}
          defaultValue={defaultExpandedIds}
          indicator={null}
          itemClassName={styles.item}
          triggerClassName={styles.trigger}
          panelClassName={variant === 'product' ? styles.productPanel : styles.panel}
          items={displayedItems.map((item) => ({
            value: item.id,
            title: <InquirySubject item={item} variant={variant} />,
            content: <InquiryBoardContent item={item} variant={variant} />,
          }))}
        />
      ) : (
        <Typography
          as="p"
          variant={variant === 'product' ? 'body3' : 'body4'}
          tone={variant === 'product' ? 'primary' : 'tertiary'}
          className={variant === 'product' ? styles.productEmpty : styles.empty}
          role="status"
        >
          {excludePrivate && variant !== 'product'
            ? '공개로 등록된 문의글이 없습니다.'
            : '등록된 문의글이 없습니다.'}
        </Typography>
      )}
      {nextCount > 0 && (
        <Flex justifyContent="center" py="5">
          <Button variant="plain" onClick={() => setShownCount((count) => count + nextCount)}>
            더 보기 ({nextCount}) <Icon fontAwesomeIcon={faChevronDown} size="16px" />
          </Button>
        </Flex>
      )}
    </Box>
  );
}

function ProductInquiryLink() {
  return (
    <Box w="120px" flexShrink="0">
      <ButtonLink
        href="/support/inquiries/new"
        variant="secondary"
        size="short"
        fullWidth
        style={{ '--button-height': '36px', '--button-label-weight': '400' } as CSSProperties}
      >
        문의하기
      </ButtonLink>
    </Box>
  );
}

const board = css({ pt: '24px' });

function ProductDetailInquiryContent() {
  return (
    <InquiryBoard
      title="상품문의"
      variant="product"
      pageSize={5}
      loadMoreSize={16}
      className={board}
      items={productInquiries}
      action={<ProductInquiryLink />}
    />
  );
}

type ProductSpecificationHelpProps = { label: string; description: string };

/** Product specification help; Base UI owns hover, focus, dismissal and positioning. */
function ProductSpecificationHelp({ label, description }: ProductSpecificationHelpProps) {
  const platform = usePlatform();

  return (
    <Tooltip.Root>
      <Tooltip.Trigger
        delay={0}
        closeOnClick={false}
        aria-label={`${label} 안내`}
        render={<Button variant="icon" size="16px" color="var(--color-black-60)" />}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
          <path d="M8 7v4M6.5 11h3" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="8" cy="4.5" r="1" fill="currentColor" />
        </svg>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <div className={`platform-${platform}`}>
          <Tooltip.Positioner
            side="bottom"
            align="start"
            alignOffset={-44}
            sideOffset={12}
            collisionPadding={16}
            className={css({ zIndex: '100' })}
          >
            <Tooltip.Popup
              className={css({
                w: 'max-content',
                maxW: 'min(280px, calc(100vw - 32px))',
                p: '3',
                bg: 'white.0',
                color: 'black.100',
                borderRadius: '4px',
                boxShadow: '0 0 12px rgba(0, 0, 0, 0.2)',
                outline: 'none',
              })}
            >
              <Tooltip.Arrow
                className={css({
                  w: '3',
                  h: '3',
                  bg: 'white.0',
                  transform: 'rotate(45deg)',
                  '&[data-side=bottom]': { top: '-6px' },
                  '&[data-side=top]': { bottom: '-6px' },
                })}
              />
              <Typography variant="body5" className={css({ whiteSpace: 'pre-line' })}>
                {description}
              </Typography>
            </Tooltip.Popup>
          </Tooltip.Positioner>
        </div>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}

type ProductDetailSpecificationListProps = {
  items: readonly ProductDetailSpecification[];
  gap: '4' | '8';
};

function ProductDetailSpecificationList({ items, gap }: ProductDetailSpecificationListProps) {
  return (
    <Stack as="dl" gap={gap}>
      {items.map((item) => (
        <Stack key={item.label} gap="2">
          <Typography as="dt" variant="body3" weight="bold">
            <HStack as="span" gap="2" alignItems="center">
              {item.label}
              {item.help ? (
                <ProductSpecificationHelp label={item.label} description={item.help} />
              ) : null}
            </HStack>
          </Typography>
          {typeof item.value === 'string' ? (
            <Typography as="dd" variant="body3">
              {item.value}
            </Typography>
          ) : (
            <HStack as="dd" gap="3" flexWrap="wrap">
              {item.value.map((value, index) => (
                <Fragment key={value}>
                  {index > 0 ? (
                    <Box as="span" aria-hidden="true" h="4" borderLeft="1px solid black" />
                  ) : null}
                  <Typography as="span" variant="body3">
                    {value}
                  </Typography>
                </Fragment>
              ))}
            </HStack>
          )}
        </Stack>
      ))}
    </Stack>
  );
}

type ProductTechnicalScaleBarProps = Pick<ProductTechnicalScaleData, 'level'>;

function ProductTechnicalScaleBar({ level }: ProductTechnicalScaleBarProps) {
  return (
    <Box h="8px" bg="#F5F5F5" pos="relative" aria-hidden="true">
      <Box
        pos="absolute"
        insetY="0"
        style={{ left: `${(level - 1) * 20}%` }}
        w="20%"
        bg={
          level === 1
            ? 'linear-gradient(90deg, #000000 0%, #F5F5F5 100%)'
            : level === 5
              ? 'linear-gradient(90deg, #F5F5F5 0%, #000000 100%)'
              : 'linear-gradient(90deg, #F5F5F5 0%, #000000 50%, #F5F5F5 100%)'
        }
      />
    </Box>
  );
}

/** Static qualitative scale; it is neither an editable Slider nor a numeric Meter. */
function ProductTechnicalScale({ title, labels, level, help }: ProductTechnicalScaleData) {
  return (
    <ContentSection
      title={title}
      headerProps={{
        titleAs: 'h3',
        titleProps: { variant: 'body3', weight: 'bold' },
        orientation: 'horizontal',
        gap: '2',
        css: css.raw({ justifyContent: 'flex-start' }),
        action: help ? <ProductSpecificationHelp label={title} description={help} /> : undefined,
      }}
      gap="3"
    >
      <ProductTechnicalScaleBar level={level} />
      <Flex justifyContent="space-between" gap="2">
        {labels.map((label) => (
          <Typography key={label} variant="body5">
            {label}
          </Typography>
        ))}
      </Flex>
    </ContentSection>
  );
}

type ProductTechSpecsProps = {
  specifications: readonly ProductDetailSpecification[];
  attributes: readonly ProductDetailSpecification[];
  scales: readonly ProductTechnicalScaleData[];
};

function ProductTechSpecs({ specifications, attributes, scales }: ProductTechSpecsProps) {
  return (
    <ContentSection
      title="Tech Specs"
      headerProps={{ titleAs: 'h2', titleProps: { variant: 'heading7' } }}
      gap="8"
    >
      <Grid gridTemplateColumns="minmax(0, 1fr) minmax(0, 2fr)" gap="10">
        <ProductDetailSpecificationList items={specifications} gap="8" />
        <Stack gap="8">
          {scales.length > 0 ? (
            scales.map((scale) => <ProductTechnicalScale key={scale.title} {...scale} />)
          ) : (
            <ProductDetailSpecificationList items={attributes} gap="4" />
          )}
        </Stack>
      </Grid>
    </ContentSection>
  );
}

function ProductDetailEditorial({ features }: { features: readonly ProductEditorialFeature[] }) {
  return (
    <ContentSection
      title="Why you’ll love it"
      headerProps={{ titleAs: 'h2', titleProps: { variant: 'heading7' } }}
      gap="6"
    >
      <Grid gridTemplateColumns="repeat(3, minmax(0, 1fr))" gap="4">
        {features.map((feature) => (
          <Stack as="article" key={feature.title} gap="4">
            <Image
              sizes="(max-width: 1023px) 33vw, 328px"
              src={feature.image}
              alt={feature.title}
              width={328}
              height={411}
              loading="lazy"
              className={css({ display: 'block', w: '100%', h: 'auto' })}
            />
            <ContentHeader
              title={feature.title}
              titleAs="h3"
              titleProps={{ variant: 'heading9' }}
              description={feature.description}
              descriptionProps={{ variant: 'body4' }}
              gap="2"
            />
          </Stack>
        ))}
      </Grid>
    </ContentSection>
  );
}

type ProductDetailAnchor = { id: string; label: string };

const navigation = css({
  pos: 'sticky',
  top: 'var(--layout-site-header-height)',
  zIndex: '5',
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  borderBottom: '1px solid var(--color-black-20)',
  bg: 'var(--hoka-white)',
});

const link = css({
  textAlign: 'center',
  py: '5',
  color: 'inherit',
  textDecoration: 'none',
  borderBottom: '2px solid transparent',
  '&[aria-current="location"]': { borderBottomColor: 'var(--color-black-100)' },
  _focusVisible: { outline: '2px solid var(--color-focus-ring)' },
});

type ProductDetailNavigationProps = {
  ref?: Ref<HTMLElement>;
  items: readonly ProductDetailAnchor[];
  activeId?: string;
};

/** The measured native nav keeps its HTMLElement ref contract. */
function ProductDetailNavigation({ ref, items, activeId }: ProductDetailNavigationProps) {
  return (
    <nav ref={ref} aria-label="상품 상세 정보" className={navigation}>
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={link}
          aria-current={activeId === item.id ? 'location' : undefined}
        >
          <Typography variant="body3">{item.label}</Typography>
        </a>
      ))}
    </nav>
  );
}

type ProductDetailScrollSpyProps = { items: readonly ProductDetailAnchor[]; children: ReactNode };

function ProductDetailScrollSpy({ items, children }: ProductDetailScrollSpyProps) {
  const [activeSection, setActiveSection] = useState(items[0]?.id);
  const [navigationHeight, setNavigationHeight] = useState(64);
  const rootRef = useRef<HTMLDivElement>(null);
  const navigationRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const navigation = navigationRef.current;
    if (!root || !navigation) return;

    const sections = items.map(({ id }) => root.querySelector<HTMLElement>(`#${id}`));
    let frame = 0;

    const update = () => {
      frame = 0;
      const boundary = navigation.getBoundingClientRect().bottom + 24;
      let current = items[0]?.id;

      sections.forEach((section, index) => {
        if (section && section.getBoundingClientRect().top <= boundary + 1) {
          current = items[index].id;
        }
      });
      setActiveSection(current);
    };

    const scheduleUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const observer = new ResizeObserver(() => {
      setNavigationHeight(navigation.getBoundingClientRect().height);
      scheduleUpdate();
    });
    observer.observe(navigation);
    observer.observe(root);
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    scheduleUpdate();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      cancelAnimationFrame(frame);
    };
  }, [items]);

  const layoutStyle = {
    '--product-detail-nav-height': `${navigationHeight}px`,
  } as CSSProperties;

  return (
    <Stack gap="10" ref={rootRef} style={layoutStyle}>
      <ProductDetailNavigation ref={navigationRef} items={items} activeId={activeSection} />
      {children}
    </Stack>
  );
}

/** Shared geometry for the feature's IMC and external review integration slots. */
function ProductDetailPlaceholder({ children }: { children: ReactNode }) {
  return (
    <Grid
      gap="normal"
      placeItems="center"
      aspectRatio="2 / 1"
      bg="var(--color-black-10)"
      p="8"
      textAlign="center"
    >
      <Typography variant="heading8">{children}</Typography>
    </Grid>
  );
}

type ProductDetailReviewsProps = {
  count: number;
  id: string;
  className?: string;
  children?: ReactNode;
};

/** 상품 리뷰 섹션의 제목·건수와 내용을 구성합니다. (Composes the product review heading, count, and content.) */
function ProductDetailReviews({ count, id, className, children }: ProductDetailReviewsProps) {
  return (
    <ContentSection
      id={id}
      className={className}
      title={
        <>
          리뷰{' '}
          <Typography variant="body1" weight="medium">
            ({count})
          </Typography>
        </>
      }
      headerProps={{ titleAs: 'h2', titleProps: { variant: 'heading8' } }}
      gap="6"
    >
      {children ?? <ProductDetailPlaceholder>크리마 영역 · 가로 1016px</ProductDetailPlaceholder>}
    </ContentSection>
  );
}

const textLink = css({
  color: 'text.primary',
  textDecoration: 'underline',
  textUnderlineOffset: '3px',
  _focusVisible: { outline: '2px solid', outlineOffset: '4px' },
});

type ProductSupportTextLinkProps = Omit<ComponentPropsWithoutRef<'a'>, 'className' | 'href'> & {
  href: string;
};

function ProductSupportTextLink({ href, ...props }: ProductSupportTextLinkProps) {
  return href.startsWith('/') ? (
    <Link {...props} href={href} className={textLink} />
  ) : (
    <a {...props} href={href} className={textLink} />
  );
}

const numberedList = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '4',
  listStyleType: 'decimal',
  pl: '4',
});

function ProductDetailDeliverySection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <ContentSection
      as="section"
      gap="5"
      aria-label={title}
      title={<>{title}</>}
      headerProps={{ titleAs: 'h3', titleProps: { variant: 'heading8' } }}
    >
      {children}
    </ContentSection>
  );
}

function ProductDetailDeliveryList({ children }: { children: ReactNode }) {
  return (
    <Typography as="ol" variant="body5" className={numberedList}>
      {children}
    </Typography>
  );
}

function ProductDetailShippingGuide() {
  return (
    <ProductDetailDeliverySection title="배송 안내">
      <ProductDetailDeliveryList>
        <li>구매 금액에 관계없이 전 상품 무료배송입니다.</li>
        <li>결제일로부터 1~5일 이내에 상품이 출고됩니다. (토·일요일 및 공휴일 제외)</li>
        <li>상품은 호카 물류센터 또는 매장에서 발송됩니다.</li>
        <li>
          <ProductSupportTextLink href="/mypage/orders">
            마이페이지 &gt; 주문/배송 조회
          </ProductSupportTextLink>
          에서 구매하신 상품의 배송 상태를 확인하실 수 있습니다.
        </li>
      </ProductDetailDeliveryList>
    </ProductDetailDeliverySection>
  );
}

const bulletList = css({ listStyleType: 'disc', pl: '4', mt: '3' });

function ProductDetailReturnPrecautions() {
  return (
    <ProductDetailDeliverySection title="반품 유의사항">
      <ProductDetailDeliveryList>
        <li>상품 수령일로부터 7일 이내에 반품을 신청해 주세요.</li>
        <li>
          호카 온라인 스토어에서 구매하신 상품은 온라인으로 반품을 신청해 주세요. 교환을 원하시는
          경우 고객센터의 안내를 확인해 주세요. 온라인 구매 상품의 오프라인 매장 반품은 불가합니다.
        </li>
        <li>
          다음과 같은 경우 반품 처리가 불가합니다.
          <ul className={bulletList}>
            <li>상품을 이미 착용하거나 사용한 경우</li>
            <li>단순 변심으로 상품 수령일로부터 7일이 경과한 경우</li>
            <li>
              상품 또는 구성품(신발 박스, 가격 택, 라벨, 폴리백 등)을 분실하거나 훼손한 경우 (신발
              박스에 테이프를 붙이거나 운송장을 부착한 경우 포함)
            </li>
            <li>사은품을 사용하거나 분실 또는 훼손한 경우</li>
            <li>소비자의 책임으로 상품 가치가 감소한 경우</li>
          </ul>
        </li>
        <li>
          반품 배송비 안내
          <ul className={bulletList}>
            <li>상품 불량 또는 오배송으로 인한 반품 배송비는 호카가 부담합니다.</li>
            <li>고객님의 단순 변심으로 인한 반품 배송비는 고객님 부담입니다.</li>
            <li>제주도 및 도서 산간 지역은 추가 배송비가 발생할 수 있습니다.</li>
            <li>정확한 반품 배송비와 결제 방법은 반품 접수 시 안내를 확인해 주세요.</li>
            <li>타 택배사를 이용하실 경우 발송 전 고객센터에 문의해 주세요.</li>
          </ul>
        </li>
      </ProductDetailDeliveryList>
    </ProductDetailDeliverySection>
  );
}

function ProductSupportContact() {
  return (
    <Grid
      gridTemplateColumns="minmax(0, 1fr) minmax(0, 2fr)"
      gap="6"
      pb="6"
      borderBottom="1px solid token(colors.border.default)"
      _mobile={{ gridTemplateColumns: '1fr', gap: '3' }}
    >
      <Typography as="h4" variant="body5" weight="bold">
        호카 온라인 스토어 고객센터
      </Typography>
      <Stack gap="2">
        <Typography as="p" variant="body5">
          TEL. <ProductSupportTextLink href="tel:15660086">1566-0086</ProductSupportTextLink>
        </Typography>
        <Typography as="p" variant="body5" tone="tertiary">
          1:1 문의를 이용하시면 조금 더 빠르게 답변 받으실 수 있습니다.
        </Typography>
        <Typography as="p" variant="body5" weight="bold">
          운영시간
        </Typography>
        <Typography as="p" variant="body5" tone="tertiary">
          평일 10:00~17:00 (점심시간 12:00~13:00) / 토·일요일 및 공휴일 휴무
        </Typography>
      </Stack>
    </Grid>
  );
}

const supportLink = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '44px',
  px: '4',
  bg: 'surface.subtle',
  color: 'text.primary',
  _hover: { bg: 'black.20' },
  _focusVisible: { outline: '2px solid', outlineOffset: '4px' },
});

type ProductSupportLinkProps = { title: string; description: string; label: string; to: string };

function ProductSupportLink({ title, description, label, to }: ProductSupportLinkProps) {
  return (
    <Grid
      gridTemplateColumns="minmax(0, 1fr) 160px"
      alignItems="center"
      gap="5"
      _mobile={{ gridTemplateColumns: '1fr', gap: '3' }}
    >
      <ContentHeader
        gap="2"
        titleAs="h4"
        title={<>{title}</>}
        titleProps={{ variant: 'body5', weight: 'bold' }}
        description={<>{description}</>}
        descriptionProps={{ variant: 'body5', tone: 'tertiary' }}
      />
      <Link href={to} className={supportLink}>
        <Typography variant="body5" weight="medium">
          {label}
        </Typography>
      </Link>
    </Grid>
  );
}

const supportLinks = [
  {
    title: '배송 및 반품 관련 1:1 문의',
    description: '궁금하신 내용을 1:1 문의에 남겨 주시면 확인하여 답변드리겠습니다.',
    label: '1:1 문의',
    to: '/support/inquiries',
  },
  {
    title: 'FAQs',
    description: '자주 묻는 질문의 답변을 찾아보세요.',
    label: 'FAQs',
    to: '/support/faq',
  },
  {
    title: '주문/배송 조회',
    description: '구매하신 상품의 주문 및 배송 내역을 확인하실 수 있습니다.',
    label: '주문/배송 조회',
    to: '/mypage/orders',
  },
];

function ProductDetailDeliverySupport() {
  return (
    <Stack
      as="section"
      border="1px solid token(colors.border.default)"
      p="8"
      gap="6"
      _mobile={{ p: '5' }}
      aria-label="배송 및 반품 고객센터"
    >
      <ProductSupportContact />
      {supportLinks.map(({ title, description, label, to }) => (
        <ProductSupportLink
          key={to}
          title={title}
          description={description}
          label={label}
          to={to}
        />
      ))}
    </Stack>
  );
}

const processTitle = css({
  borderRight: '1px solid token(colors.border.default)',
  pr: '6',
  _mobile: { borderRight: 'none', pr: '0' },
});

const stepRow = css({ display: 'flex', alignItems: 'center', gap: '5' });

const stepNumber = css({ flexShrink: '0', width: '8' });

const returnSteps = [
  '마이페이지 > 주문/배송 조회 > 주문 상세 내역 확인',
  '반품할 상품을 선택하여 반품 신청 후 수거 일정 확인',
  '최초 수령 상태와 동일하게 이중 포장하여 방문 기사님께 전달',
  '호카 물류센터에 상품 도착',
  '반품 요청 내용 및 상품 상태 확인',
  '반품 완료 및 결제수단별 환불 진행',
];

function ProductDetailReturnGuide() {
  return (
    <ProductDetailDeliverySection title="호카 반품 안내">
      <ProductDetailDeliveryList>
        <li>온라인 스토어에서 구매하신 상품은 온라인으로 반품을 신청하실 수 있습니다.</li>
        <li>고객님 변심으로 발생하는 반품 배송비는 환불 금액에서 차감될 수 있습니다.</li>
        <li>상품과 구성품을 수령 당시 상태로 포장하여 지정 택배사의 수거를 기다려 주세요.</li>
      </ProductDetailDeliveryList>
      <Grid
        gridTemplateColumns="minmax(0, 1fr) minmax(0, 3fr)"
        gap="8"
        borderTop="2px solid token(colors.border.strong)"
        borderBottom="1px solid token(colors.border.default)"
        py="10"
        _mobile={{ gridTemplateColumns: '1fr', gap: '6', py: '6' }}
      >
        <Typography as="h4" variant="body2" tone="tertiary" className={processTitle}>
          상품 반품
          <br />
          STEP
        </Typography>
        <Stack as="ol" gap="6">
          {returnSteps.map((step, index) => (
            <li key={step} className={stepRow}>
              <Typography variant="body1" className={stepNumber} aria-hidden="true">
                {index + 1}
              </Typography>
              <Typography variant="body5">{step}</Typography>
            </li>
          ))}
        </Stack>
      </Grid>
    </ProductDetailDeliverySection>
  );
}

function ProductDetailDeliveryContent() {
  return (
    <Stack
      gap="12"
      py="6"
      wordBreak="keep-all"
      overflowWrap="anywhere"
      _mobile={{ gap: '8', py: '4' }}
    >
      <ProductDetailShippingGuide />
      <ProductDetailReturnPrecautions />
      <ProductDetailDeliverySupport />
      <ProductDetailReturnGuide />
    </Stack>
  );
}

/** 상품 고시 정보를 이름과 값의 목록으로 표시합니다. (Displays product specifications as a list of labels and values.) */
function ProductDetailNoticeTable({ items }: { items: readonly ProductDetailSpecification[] }) {
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
}

const root = css({ borderTop: '1px solid var(--color-black-20)' });

const item = css({ borderBottom: '1px solid var(--color-black-20)' });

const ProductDetailSupportSectionsTrigger = css({ minH: '77px' });

/** 상품 고시·배송·관리 안내 섹션을 구성합니다. (Composes product specification, delivery, and care sections.) */
function ProductDetailSupportSections({
  specifications,
}: {
  specifications: readonly ProductDetailSpecification[];
}) {
  return (
    <Accordion
      className={root}
      indicatorSize="16px"
      itemClassName={item}
      triggerClassName={ProductDetailSupportSectionsTrigger}
      items={[
        {
          value: 'notice',
          title: (
            <Typography variant="body3" mo="body4" weight="bold">
              상품 고시 정보
            </Typography>
          ),
          content: <ProductDetailNoticeTable items={specifications} />,
        },
        {
          value: 'delivery',
          title: (
            <Typography variant="body3" mo="body4" weight="bold">
              배송 및 반품
            </Typography>
          ),
          content: <ProductDetailDeliveryContent />,
        },
        {
          value: 'care',
          title: (
            <Typography variant="body3" mo="body4" weight="bold">
              관리 방법
            </Typography>
          ),
          content: <CareInstructions sections={shoeCareSections} />,
        },
      ]}
    />
  );
}

const destination = css({
  scrollMarginTop:
    'calc(var(--layout-site-header-height) + var(--product-detail-nav-height) + 24px)',
});

function ProductDetailSections({ product }: { product: Product }) {
  const presentation = getProductDetailPresentation(product);

  return (
    <ProductDetailScrollSpy items={productDetailAnchors}>
      <Stack gap="96px">
        <Box id="product-details" className={destination}>
          <ProductTechSpecs
            specifications={presentation.specifications}
            attributes={presentation.attributes}
            scales={presentation.scales}
          />
        </Box>
        {presentation.features.length > 0 && (
          <ProductDetailEditorial features={presentation.features} />
        )}
        <ProductDetailPlaceholder>상세페이지 영역 (이미지세트 &amp; IMC)</ProductDetailPlaceholder>
        <ProductDetailReviews
          id="product-reviews"
          className={destination}
          count={product.reviewCount}
        />
        <Box id="product-inquiries" className={destination}>
          <ProductDetailInquiryContent />
        </Box>
        <ProductDetailSupportSections specifications={presentation.notice} />
      </Stack>
    </ProductDetailScrollSpy>
  );
}

type ProductDetailMediaProps = {
  images: string[];
  productName: string;
  onOpenImage: (index: number) => void;
  product: Product;
};

function ProductDetailMedia({
  images,
  productName,
  onOpenImage,
  product,
}: ProductDetailMediaProps) {
  const platform = usePlatform();

  return (
    <Flex minW="0" direction="column" gap="96px">
      <ProductDetailGallery onOpenImage={onOpenImage} images={images} productName={productName} />
      {platform === 'web' && <ProductDetailSections product={product} />}
    </Flex>
  );
}

type ProductColorSelectorProps = {
  colors: string[];
  gallery: string[];
  colorThumbnails?: Product['colorThumbnails'];
  value: string;
  onValueChange: (color: string) => void;
};

/** 상품의 컬러 이미지와 갤러리 대체 이미지를 공통 선택 UI에 전달합니다. (Prepares product color images and gallery fallbacks for the shared selector.) */
function ProductColorSelector({
  colors,
  gallery,
  colorThumbnails,
  value,
  onValueChange,
}: ProductColorSelectorProps) {
  const options = colorThumbnails?.length
    ? colorThumbnails.map((option) => ({
        id: option.label,
        label: option.label,
        image: option.image,
      }))
    : colors.map((color, index) => ({
        id: color,
        label: color,
        image: gallery[index % gallery.length],
      }));

  return <ColorSelector options={options} value={value} onValueChange={onValueChange} />;
}

type ProductSizeSelectorProps = {
  selectedWidth?: ProductWidthOption;
  value: string;
  error: string;
  onValueChange: (size: string) => void;
};

/** 상품 재고 선택지와 사이즈 가이드·오류 안내를 조합합니다. (Composes product availability, size guidance, and validation feedback.) */
function ProductSizeSelector({
  selectedWidth,
  value,
  error,
  onValueChange,
}: ProductSizeSelectorProps) {
  return (
    <SizeSelector
      action={
        <Flex gap="2" align="center">
          <Icon name="action/fa-ruler-horizontal" size="18px" color="currentColor" />
          <ButtonLink variant="link" size="md" href="/support/size-guide">
            사이즈 가이드
          </ButtonLink>
        </Flex>
      }
      id="product-size"
      fieldId="product-size-choice"
      error={error}
      options={productSizeOptions(selectedWidth)}
      value={value}
      onValueChange={onValueChange}
      description={
        <Typography as="p" variant="body4" tone="tertiary">
          사이즈 추천: 정사이즈
        </Typography>
      }
    />
  );
}

function productWidthOptions(product: Product, color: string): ProductWidthOption[] {
  return (
    product.colorOptions?.find((option) => option.color === color)?.widths ?? [
      {
        label: product.width,
        sizes: product.sizes,
        soldOut: product.soldOut,
        lowStockSizes: product.lowStockSizes,
      },
    ]
  );
}

type ProductVariantSelectorsProps = {
  product: Product;
  gallery: string[];
  color: string;
  width: string;
  size: string;
  error: string;
  onColorChange: (color: string) => void;
  onWidthChange: (width: string) => void;
  onSizeChange: (size: string) => void;
};

/** 상품별 옵션 데이터와 변경 콜백을 선택 영역에 연결합니다. (Connects product option data and callbacks to the selectors.) */
function ProductVariantSelectors({
  product,
  gallery,
  color,
  width,
  size,
  error,
  onColorChange,
  onWidthChange,
  onSizeChange,
}: ProductVariantSelectorsProps) {
  const widthOptions = productWidthOptions(product, color);
  const selected = widthOptions.find((option) => option.label === width) ?? widthOptions[0];

  return (
    <>
      <Stack gap="10">
        <ProductWidthSelector
          onValueChange={onWidthChange}
          options={widthOptions.map((option) => option.label)}
          value={width}
        />
        <ProductColorSelector
          colors={product.colors}
          colorThumbnails={product.colorThumbnails}
          gallery={gallery}
          onValueChange={onColorChange}
          value={color}
        />
        <ProductSizeSelector
          error={error}
          onValueChange={onSizeChange}
          selectedWidth={selected}
          value={size}
        />
      </Stack>
    </>
  );
}

type ProductInformationProps = {
  id?: string;
  title?: string;
  sections: readonly { title: string; content: ReactNode }[];
  specifications: readonly { label: string; value: ReactNode }[];
};

/** 상품 설명 섹션과 규격 정보를 의미 있는 목록으로 표시합니다. (Displays product description sections and specifications as a semantic list.) */
function ProductInformation({
  id,
  title = '상품 정보',
  sections,
  specifications,
}: ProductInformationProps) {
  const [description, ...features] = sections;
  const [expanded, setExpanded] = useState(false);
  const contentId = useId();

  return (
    <ContentSection
      as="section"
      gap="4"
      px="8"
      py="8"
      bg="var(--color-black-10)"
      _mobile={{ px: '4' }}
      id={id}
      title={title}
      headerProps={{
        titleAs: 'h2',
        titleProps: { variant: 'heading8', mo: 'heading8' },
      }}
    >
      <Stack gap="8">
        <Stack gap="3" alignItems="start">
          <Stack id={contentId} gap="4" w="100%">
            {description && (
              <ContentHeader
                gap="3"
                titleAs="h3"
                title={<>{description.title}</>}
                titleProps={{ variant: 'body3', weight: 'bold' }}
                description={<>{description.content}</>}
                descriptionProps={{
                  variant: 'body3',
                  className: expanded ? undefined : css({ lineClamp: 4 }),
                }}
              />
            )}
            {expanded &&
              features.map((section, index) => (
                <ContentHeader
                  gap="3"
                  key={index}
                  titleAs="h3"
                  title={<>{section.title}</>}
                  titleProps={{ variant: 'body3', weight: 'bold' }}
                  description={<>{section.content}</>}
                  descriptionProps={{ variant: 'body3' }}
                />
              ))}
          </Stack>
          {description && (
            <Button
              variant="link"
              colorway="black"
              size="md"
              aria-expanded={expanded}
              aria-controls={contentId}
              onClick={() => setExpanded((value) => !value)}
              style={{ '--button-label-weight': '700' } as CSSProperties}
            >
              {expanded ? '닫기' : '더보기'}
            </Button>
          )}
        </Stack>
        <DescriptionList
          items={specifications.map(({ label, value }) => ({ term: label, description: value }))}
          labelWidth="80px"
          termProps={{ variant: 'body3', weight: 'bold' }}
          descriptionProps={{ variant: 'body3', tone: 'primary' }}
          slotStyles={{ root: css.raw({ columnGap: '3', rowGap: '4' }) }}
        />
      </Stack>
    </ContentSection>
  );
}

const ProductPurchaseActionsRoot = cva({
  base: {
    gridTemplateColumns: '1fr 1fr',
  },
  variants: {
    placement: {
      inline: { _mobile: { display: 'none' } },
      fixed: {
        display: 'none',
        _mobile: {
          position: 'fixed',
          right: '0',
          bottom: '0',
          left: '0',
          zIndex: '20',
          display: 'grid',
          px: '4',
          pt: '4',
          pb: '8',
          borderTop: '1px solid var(--color-black-20)',
          bg: 'var(--color-white-000)',
        },
      },
    },
  },
});

type ProductPurchaseActionsProps = {
  placement: 'inline' | 'fixed';
  onAddToCart: () => void;
  onOrder: () => void;
};

function ProductPurchaseActions({ placement, onAddToCart, onOrder }: ProductPurchaseActionsProps) {
  const platform = usePlatform();
  return (
    <Grid className={ProductPurchaseActionsRoot({ placement })} gap="2">
      <Button
        onClick={onAddToCart}
        variant="secondary"
        fullWidth
        size={platform === 'mobile' ? 'short' : 'tall'}
      >
        장바구니
      </Button>
      <Button
        onClick={onOrder}
        variant="primary"
        fullWidth
        size={platform === 'mobile' ? 'short' : 'tall'}
      >
        구매하기
      </Button>
    </Grid>
  );
}

type ProductDetailContentProps = {
  product: Product;
  gallery: string[];
  color: string;
  width: string;
  size: string;
  error: string;
  selectedOptions: ReactNode;
  onColorChange: (color: string) => void;
  onWidthChange: (width: string) => void;
  onSizeChange: (size: string) => void;
  onAddToCart: () => void;
  onOrder: () => void;
};

/** 상품 상세의 선택 정보와 콘텐츠를 배치합니다. (Arranges product detail selections and content.) */
function ProductDetailContent({
  product,
  gallery,
  color,
  width,
  size,
  error,
  selectedOptions,
  onColorChange,
  onWidthChange,
  onSizeChange,
  onAddToCart,
  onOrder,
}: ProductDetailContentProps) {
  const isClifton = product.styleCode === 'HOKADFG34S';

  return (
    <Stack gap="10">
      <ProductVariantSelectors
        color={color}
        error={error}
        gallery={gallery}
        onColorChange={onColorChange}
        onSizeChange={onSizeChange}
        onWidthChange={onWidthChange}
        product={product}
        size={size}
        width={width}
      />
      {selectedOptions}
      <ProductPurchaseActions onAddToCart={onAddToCart} onOrder={onOrder} placement="inline" />
      <ProductInformation
        id="product-information"
        sections={[
          { title: '어떤 날씨에도 쿠션감 있는 편안한 주행', content: product.detailDescription },
          ...(isClifton
            ? [
                {
                  title: '새로운 특징',
                  content:
                    '앞발과 발등 부분의 드롭이 커지고 착화감이 개선된 새로운 라스트를 만나보실 수 있습니다. 또한 업그레이드된 러그 디자인으로 접지력을 더욱 강화했습니다.',
                },
              ]
            : []),
        ]}
        specifications={[
          {
            label: '신발 유형',
            value: isClifton || product.stability === 'Stable' ? '안정화' : '중립화',
          },
          { label: '추천 활동', value: isClifton ? '로드 러닝, 워킹, 라이프 스타일' : product.use },
          { label: '러닝 유형', value: product.runningType },
        ]}
      />
    </Stack>
  );
}

type ShareButtonProps = Omit<ButtonIconProps, 'children' | 'variant'>;

/** Reusable share action with a platform-sized icon. */
function ShareButton({
  'aria-label': ariaLabel = '공유하기',
  size = '38px',
  ...props
}: ShareButtonProps) {
  const platform = usePlatform();

  return (
    <Button variant="icon" {...props} aria-label={ariaLabel} size={size}>
      <Icon
        name="action/fa-arrow-up-from-bracket"
        color="currentColor"
        size={platform === 'mobile' ? '19px' : '24px'}
      />
    </Button>
  );
}

const ProductDetailHeaderActionsStyles = {
  reviewLink: css({
    borderColor: 'var(--color-text-subtle)',
    color: 'var(--color-text-subtle)',
    '--color-action-underline-color': 'var(--color-text-subtle)',
    '--button-border-color-hover': 'var(--color-text-subtle)',
  }),
  icons: css({
    display: 'flex',
    gap: '3',
    '& button': { fontSize: '24' /* 기존 25px */, lineHeight: 'hoka' },
  }),
};

type ProductDetailHeaderActionsProps = {
  product: Product;
  wish: boolean;
  onWishChange: () => void;
};

function ProductDetailHeaderActions({
  product,
  wish,
  onWishChange,
}: ProductDetailHeaderActionsProps) {
  const platform = usePlatform();

  return (
    <Flex alignItems="center" justifyContent="space-between" w="full">
      <HStack gap="10px">
        <RatingStars aria-label={`평점 ${product.rating}점`} value={product.rating} />
        <Button
          className={ProductDetailHeaderActionsStyles.reviewLink}
          variant="link"
          onClick={() =>
            document
              .getElementById(platform === 'web' ? 'product-reviews' : 'product-information')
              ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
          type="button"
          size="md"
        >
          {product.reviewCount}개 리뷰 보기
        </Button>
      </HStack>
      <HStack gap="2">
        <ShareButton size="24px" />
        <Wishlist active={wish} ariaLabel="관심상품" onActiveChange={onWishChange} />
      </HStack>
    </Flex>
  );
}

type ProductDetailHeaderMetaProps = {
  product: Product;
};

const productUseLabels: Record<Product['use'], string> = {
  'Everyday Run': '데일리 러닝',
  'Trail Running': '트레일 러닝',
  Walking: '워킹',
};

/** 상품의 성별과 사용 목적 메타데이터를 표시합니다. (Displays a product's gender and use metadata.) */
function ProductDetailHeaderMeta({ product }: ProductDetailHeaderMetaProps) {
  const uses = [...new Set([product.runningType, productUseLabels[product.use]])].join(', ');

  return (
    <>
      <VStack alignItems="start" gap="2">
        {product.promotion && <Badge weight="medium" promotion={product.promotion} />}
        <HStack gap="2" color="var(--color-black-60)">
          <Typography variant="body4" weight="medium" tone="inherit">
            {product.gender}
          </Typography>
          {uses && (
            <>
              <Divider orientation="vertical" h="3" w="1px" bg="var(--color-black-60)" />
              <Typography variant="body4" weight="bold" tone="inherit">
                {uses}
              </Typography>
            </>
          )}
        </HStack>
      </VStack>
    </>
  );
}

type ProductDetailHeaderTitleProps = {
  product: Product;
};

/** 상품 상세의 상품명과 가격을 표시합니다. (Displays the product name and price on the product detail page.) */
function ProductDetailHeaderTitle({ product }: ProductDetailHeaderTitleProps) {
  return (
    <ContentHeader
      alignItems="start"
      gap="5"
      titleAs="h1"
      title={product.name}
      titleProps={{
        className: css({ m: '0' }),
        variant: 'heading7',
        mo: 'heading4',
        weight: 'black',
      }}
      description={
        <HStack as="span" gap="0" alignItems="end">
          {product.price.toLocaleString('ko-KR')}
          <Typography variant="body3" weight="bold">
            원
          </Typography>
        </HStack>
      }
      descriptionProps={{ className: css({ m: '0' }), variant: 'body3', weight: 'medium' }}
    />
  );
}

type ProductDetailHeaderProps = {
  product: Product;
  wish: boolean;
  onWishChange: () => void;
};

function ProductDetailHeader({ product, wish, onWishChange }: ProductDetailHeaderProps) {
  return (
    <VStack as="header" alignItems="start" gap="5" _mobile={{ gap: '6' }}>
      <VStack alignItems="start" gap="5" _mobile={{ gap: '4' }}>
        <ProductDetailHeaderMeta product={product} />
        <ProductDetailHeaderTitle product={product} />
      </VStack>
      <ProductDetailHeaderActions onWishChange={onWishChange} product={product} wish={wish} />
    </VStack>
  );
}

const ProductAfterSalesContactsStyles = {
  link: css({ textDecoration: 'underline', textUnderlineOffset: '3px' }),
};

const serviceUrl = 'https://service.joy-works.co.kr/';

function AfterSalesContact({
  title,
  descriptions,
  link,
}: {
  title: string;
  descriptions: readonly string[];
  link: ReactNode;
}) {
  return (
    <Grid
      gridTemplateColumns="minmax(140px, 1fr) 2fr"
      gap="6"
      pb="8"
      borderBottom="1px solid var(--color-black-20)"
      _mobile={{ gridTemplateColumns: '1fr', gap: '3', pb: '6' }}
    >
      <Typography as="h4" variant="body5" weight="bold">
        {title}
      </Typography>
      <Stack gap="3">
        {descriptions.map((description) => (
          <Typography as="p" variant="body5" key={description}>
            {description}
          </Typography>
        ))}
        <Typography variant="body5">{link}</Typography>
      </Stack>
    </Grid>
  );
}

function AfterSalesAction({
  title,
  description,
  href,
  label,
}: {
  title: string;
  description: string;
  href: string;
  label: string;
}) {
  return (
    <Grid
      gridTemplateColumns="minmax(0, 1fr) auto"
      alignItems="center"
      gap="4"
      _mobile={{ gridTemplateColumns: '1fr', justifyItems: 'start' }}
    >
      <ContentHeader
        gap="2"
        titleAs="h4"
        title={title}
        titleProps={{ variant: 'body5', weight: 'bold' }}
        description={description}
        descriptionProps={{ variant: 'body5' }}
      />
      <ButtonLink href={href} variant="secondary" size="short">
        {label}
      </ButtonLink>
    </Grid>
  );
}

function ProductAfterSalesContacts() {
  return (
    <Stack gap="8" border="1px solid var(--color-black-20)" p="8" _mobile={{ p: '4' }}>
      <AfterSalesContact
        title="HOKA 온라인 스토어"
        descriptions={[
          '온라인 주문·배송·교환·반품 관련 문의',
          '상담 채널과 운영시간은 고객센터에서 확인해 주세요.',
        ]}
        link={
          <Link className={ProductAfterSalesContactsStyles.link} href="/support">
            고객센터 안내
          </Link>
        }
      />
      <AfterSalesContact
        title="HOKA A/S 접수"
        descriptions={['조이웍스 A/S 온라인 신청서', '상품 수선 접수 및 진행 관련 문의']}
        link={
          <a
            className={ProductAfterSalesContactsStyles.link}
            href={serviceUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            A/S 온라인 접수 (새 창)
          </a>
        }
      />
      <AfterSalesAction
        title="FAQs"
        description="자주 묻는 질문의 답변을 찾아보세요."
        href="/support/faq"
        label="자주 묻는 질문 찾기"
      />
      <AfterSalesAction
        title="1:1 문의"
        description="문의 내용을 남겨 주시면 확인 후 답변해 드리겠습니다."
        href="/support/inquiries/new"
        label="1:1 문의하기"
      />
    </Stack>
  );
}

const steps = [
  {
    icon: faClipboardList,
    title: '온라인 접수',
    description: 'A/S 신청서를 작성하고 구매 정보와 상품 상태를 전달해 주세요.',
  },
  {
    icon: faBoxOpen,
    title: '상품 발송',
    description: '접수 안내에 따라 수선이 필요한 상품을 보내 주세요.',
  },
  {
    icon: faMagnifyingGlass,
    title: '상품 확인 및 판정',
    description: '접수된 상품의 상태와 수선 가능 여부를 확인합니다.',
  },
  {
    icon: faScrewdriverWrench,
    title: '수선 진행',
    description: '판정 결과와 비용 등 안내 내용을 확인한 뒤 수선이 진행됩니다.',
  },
  {
    icon: faTruckFast,
    title: '완료 안내 및 발송',
    description: '처리가 완료되면 안내 후 상품을 보내 드립니다.',
  },
];

function ProductAfterSalesProcess() {
  return (
    <ContentSection
      gap="6"
      title="A/S 처리 절차"
      headerProps={{
        gap: '6',
        titleAs: 'h4',
        titleProps: { variant: 'heading9' },
        description: (
          <>
            온라인 신청 후 접수 안내에 따라 상품을 발송해 주세요. 수선 가능 여부와 비용, 처리 일정은
            상품 확인 후 안내됩니다.
          </>
        ),
        descriptionProps: { variant: 'body5' },
      }}
    >
      <Grid
        as="ol"
        gridTemplateColumns="repeat(6, minmax(0, 1fr))"
        gap="10 4"
        listStyle="none"
        m="0"
        py="10"
        px="0"
        borderTop="2px solid var(--color-black-100)"
        borderBottom="1px solid var(--color-black-40)"
        _mobile={{
          gridTemplateColumns: '1fr',
          '& > li, & > li:nth-child(4), & > li:nth-child(5)': { gridColumn: 'auto' },
        }}
        css={{
          '& > li': { gridColumn: 'span 2', textAlign: 'center', alignItems: 'center' },
          '& > li:nth-child(4)': { gridColumn: '2 / 4' },
          '& > li:nth-child(5)': { gridColumn: '4 / 6' },
        }}
      >
        {steps.map((step, index) => (
          <Stack as="li" gap="3" key={step.title}>
            <Icon fontAwesomeIcon={step.icon} size="48px" />
            <Typography variant="cta2">STEP {index + 1}</Typography>
            <Typography variant="body5" weight="bold">
              {step.title}
            </Typography>
            <Typography as="p" variant="body5">
              {step.description}
            </Typography>
          </Stack>
        ))}
      </Grid>
    </ContentSection>
  );
}

const questions = [
  {
    question: 'A/S 기간은 어느 정도 소요될까요?',
    answer:
      '상품 상태와 수선 내용, 부자재 수급에 따라 처리 기간이 달라질 수 있습니다. 예상 일정은 접수 시 A/S 담당자에게 확인해 주세요.',
  },
  {
    question: '무상 또는 유상 수선 여부는 어떻게 확인하나요?',
    answer:
      '구매 정보와 상품 상태를 확인한 후 안내받으실 수 있습니다. 신청 시 구매 내역과 수선이 필요한 부분의 사진을 준비해 주세요. 비용과 수선 가능 여부는 접수 후 판정 결과에 따라 안내됩니다.',
  },
  {
    question: '상품의 수선을 맡기고 싶어요!',
    answer:
      'HOKA A/S 온라인 접수 페이지에서 신청해 주세요. 구매처에 따라 접수 방법이 다를 수 있으므로, 매장이나 다른 판매처에서 구매한 상품은 먼저 구매처에 문의해 주세요.',
  },
];

function ProductAfterSalesQuestions() {
  return (
    <Grid
      gridTemplateColumns="160px minmax(0, 1fr)"
      gap="8"
      _mobile={{ gridTemplateColumns: '1fr', gap: '6' }}
    >
      <Typography as="h4" variant="heading8">
        궁금하신 점이 있으세요?
      </Typography>
      <Stack gap="8">
        {questions.map(({ question, answer }) => (
          <Box key={question} pb="8" borderBottom="1px solid var(--color-black-20)">
            <ContentHeader
              gap="4"
              titleAs="h5"
              title={<>Q. {question}</>}
              titleProps={{ variant: 'body4', weight: 'bold' }}
              description={<>{answer}</>}
              descriptionProps={{ variant: 'body5' }}
            />
          </Box>
        ))}
      </Stack>
    </Grid>
  );
}

function ProductDetailAfterSalesContent() {
  return (
    <Stack gap="10" pt="6">
      <Typography as="p" variant="body5">
        HOKA 상품에 이상이 있거나 수선이 필요한 경우 구매처 또는 A/S 접수 창구로 문의해 주세요.
        <br />
        A/S 관련 문의는 고객센터 또는 1:1 문의를 이용해 주세요.
      </Typography>
      <ProductAfterSalesContacts />
      <ProductAfterSalesProcess />
      <ProductAfterSalesQuestions />
    </Stack>
  );
}

const wrapper = css({
  borderBottom: '1px solid var(--color-black-20)',
  py: '6',
  _mobile: { py: '4' },
});

const items: AccordionEntry[] = [
  {
    value: 'inquiry',
    title: <Typography variant="heading9">상품 문의</Typography>,
    content: <ProductDetailInquiryContent />,
  },
  {
    value: 'delivery',
    title: <Typography variant="heading9">배송 및 반품</Typography>,
    content: <ProductDetailDeliveryContent />,
  },
  {
    value: 'after-sales',
    title: <Typography variant="heading9">A/S 안내</Typography>,
    content: <ProductDetailAfterSalesContent />,
  },
];

function ProductDetailSupport() {
  return (
    <Box as="section" aria-label="상품 안내" borderTop="1px solid var(--color-black-20)">
      <Accordion indicatorSize="13px" items={items} multiple={false} itemClassName={wrapper} />
    </Box>
  );
}

function ProductDetailSupportRegion({ platform }: { platform: Platform }) {
  return (
    <Box
      display={platform === 'mobile' ? 'none' : undefined}
      _mobile={{ display: platform === 'mobile' ? 'block' : 'none' }}
    >
      <ProductDetailSupport />
    </Box>
  );
}

type ProductDetailPanelProps = {
  product: Product;
  gallery: string[];
  color: string;
  width: string;
  size: string;
  error: string;
  selectedOptions: ReactNode;
  wish: boolean;
  onColorChange: (color: string) => void;
  onWidthChange: (width: string) => void;
  onSizeChange: (size: string) => void;
  onAddToCart: () => void;
  onOrder: () => void;
  onWishChange: () => void;
};

/** 상품 상세의 선택 정보와 콘텐츠를 배치합니다. (Arranges product detail selections and content.) */
function ProductDetailPanel({
  product,
  gallery,
  color,
  width,
  size,
  error,
  selectedOptions,
  wish,
  onColorChange,
  onWidthChange,
  onSizeChange,
  onAddToCart,
  onOrder,
  onWishChange,
}: ProductDetailPanelProps) {
  return (
    <Box
      as="article"
      pos="sticky"
      top="calc(var(--layout-site-header-height) + 32px)"
      alignSelf="start"
      maxH="calc(100dvh - var(--layout-site-header-height) - 48px)"
      overflowY="auto"
      overscrollBehavior="contain"
      scrollbarWidth="thin"
      px="0"
      _mobile={{ position: 'static', maxH: 'none', overflowY: 'visible', px: '4', pt: '6' }}
    >
      <Stack gap="8" _mobile={{ gap: '6' }}>
        <ProductDetailHeader onWishChange={onWishChange} product={product} wish={wish} />
        <ProductDetailContent
          selectedOptions={selectedOptions}
          color={color}
          error={error}
          gallery={gallery}
          onAddToCart={onAddToCart}
          onColorChange={onColorChange}
          onOrder={onOrder}
          onSizeChange={onSizeChange}
          onWidthChange={onWidthChange}
          product={product}
          size={size}
          width={width}
        />
        <ProductDetailSupportRegion platform="mobile" />
      </Stack>
    </Box>
  );
}

const ProductDetailRecommendStyles = {
  mobileSlide: css({
    w: 'calc(160px + var(--carousel-item-gutter) + var(--carousel-item-gutter))!',
    '& > *': { w: '100%' },
  }),
};

type ProductDetailRecommendProps = {
  products: Product[];
  title?: string;
};

function ProductDetailRecommend({ products, title = '추천 상품' }: ProductDetailRecommendProps) {
  const platform = usePlatform();
  const isWeb = platform === 'web';

  return (
    <HomeCarouselSection
      desktopCenteredItemCount={5}
      desktopItemGutter={8}
      itemCount={products.length}
      mobileItemGutter={5}
      platform={platform}
      mobileRail="bleed"
      slideClassName={isWeb ? undefined : ProductDetailRecommendStyles.mobileSlide}
      spacing="compact"
      title={title}
      titleVariant="heading6"
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} variant="showcase" />
      ))}
    </HomeCarouselSection>
  );
}

/** Owns the recommendation regions' leading space, common interval, and platform visibility. */
function ProductDetailRecommendations({ products }: { products: Product[] }) {
  const platform = usePlatform();

  return (
    <Stack mt="24" gap="24" _mobile={{ mt: '10' }}>
      <ProductDetailRecommend products={products} />
      {platform === 'web' && (
        <ProductDetailRecommend products={products} title="다른 고객이 함께 본 상품" />
      )}
    </Stack>
  );
}

type ProductDetailFooterProps = {
  recommendations: Product[];
  onAddToCart: () => void;
  onOrder: () => void;
};

/** Composes recommendations and the mobile fixed purchase controls without extra DOM. */
function ProductDetailFooter({ recommendations, onAddToCart, onOrder }: ProductDetailFooterProps) {
  const platform = usePlatform();

  return (
    <>
      <ProductDetailRecommendations products={recommendations} />
      {platform === 'mobile' && (
        <ProductPurchaseActions onAddToCart={onAddToCart} onOrder={onOrder} placement="fixed" />
      )}
    </>
  );
}

type ProductSelectedOptionsProps = {
  items: readonly CartItem[];
  unitPrice: number;
  onQuantityChange: (index: number, quantity: number) => void;
  onRemove: (index: number) => void;
};

/** 선택한 상품 옵션별 수량과 삭제 버튼 및 합계를 표시합니다. (Displays quantity, removal, and totals for selected product options.) */
function ProductSelectedOptions({
  items,
  unitPrice,
  onQuantityChange,
  onRemove,
}: ProductSelectedOptionsProps) {
  if (!items.length) return null;

  return (
    <Stack gap="0" aria-label="선택한 상품 옵션">
      <Box as="ul" m="0" p="0" listStyleType="none">
        {items.map((item, index) => {
          const label = `${item.color}, ${item.size}, ${item.width}`;

          return (
            <li key={JSON.stringify([item.id, item.color, item.width, item.size])}>
              <Stack gap="3" py="4" borderBottom="1px solid var(--color-black-20)">
                <Flex gap="3" alignItems="center" justifyContent="space-between">
                  <Typography variant="body4">{label}</Typography>
                  <Button
                    variant="icon"
                    aria-label={`${label} 삭제`}
                    size="24px"
                    onClick={() => onRemove(index)}
                  >
                    <Icon fontAwesomeIcon={faXmark} size={16} />
                  </Button>
                </Flex>
                <Flex gap="3" alignItems="center" justifyContent="space-between">
                  <NumberStepper
                    ariaLabel={`${label} 수량`}
                    min={1}
                    value={item.quantity}
                    onChange={(quantity) => onQuantityChange(index, quantity)}
                  />
                  <Typography variant="body3" weight="semibold">
                    {(unitPrice * item.quantity).toLocaleString('ko-KR')}원
                  </Typography>
                </Flex>
              </Stack>
            </li>
          );
        })}
      </Box>
      <AmountRow
        label="합계"
        amount={items.reduce((total, item) => total + unitPrice * item.quantity, 0)}
        emphasis
        emphasizeLabel
        py="5"
        borderTop="2px solid var(--color-black-100)"
        aria-live="polite"
      />
    </Stack>
  );
}

/** 상품 옵션 누적 선택과 구매 및 상세 보기를 관리합니다. (Manages accumulated product selections, purchase actions, and detail viewing.) */
function RouteContent() {
  const { add: onAddToCart } = useShop();
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const product = products.find((item) => item.id === id);
  const initialColor = product?.colorThumbnails?.[0]?.label ?? product?.colors[0] ?? '';
  const [color, setColor] = useState(initialColor);
  const [width, setWidth] = useState(
    product ? (productWidthOptions(product, initialColor)[0]?.label ?? '') : '',
  );
  const [selectedItems, setSelectedItems] = useState<CartItem[]>([]);
  const [wish, setWish] = useState(false);
  const [error, setError] = useState('');
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);
  const viewerOrigin = useRef<{ element: HTMLElement | null; scrollY: number } | null>(null);
  const selectedColor = product?.colorThumbnails?.find((option) => option.label === color);
  const gallery = selectedColor
    ? selectedColor.galleryImages?.length
      ? selectedColor.galleryImages
      : [selectedColor.image]
    : product?.galleryImages?.length
      ? product.galleryImages
      : product
        ? [product.primaryImage, product.hoverImage]
        : [];
  const recommendations = products.filter((item) => item.id !== product?.id).slice(0, 6);

  if (!product) return <NotFoundPage />;

  const submit = (order: boolean) => {
    if (!selectedItems.length) {
      setError('사이즈를 선택해 주세요.');
      document
        .getElementById('product-size')
        ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    setError('');
    selectedItems.forEach(onAddToCart);
    if (order) router.push('/checkout');
  };

  return (
    <ProductDetailLayout
      isViewing={viewerIndex !== null}
      viewer={
        viewerIndex !== null && (
          <ProductDetailImageViewer
            images={gallery}
            productName={product.name}
            initialIndex={viewerIndex}
            onClose={() => {
              setViewerIndex(null);
              requestAnimationFrame(() => {
                viewerOrigin.current?.element?.focus({ preventScroll: true });
                window.scrollTo({ top: viewerOrigin.current?.scrollY ?? 0, behavior: 'instant' });
              });
            }}
          />
        )
      }
      footer={
        <ProductDetailFooter
          recommendations={recommendations}
          onAddToCart={() => submit(false)}
          onOrder={() => submit(true)}
        />
      }
    >
      <ProductDetailMedia
        key={`${product.id}-${color}`}
        images={gallery}
        product={product}
        productName={product.name}
        onOpenImage={(index) => {
          viewerOrigin.current = {
            element: document.activeElement as HTMLElement | null,
            scrollY: window.scrollY,
          };
          setViewerIndex(index);
          window.scrollTo({ top: 0, behavior: 'instant' });
        }}
      />
      <ProductDetailPanel
        selectedOptions={
          <ProductSelectedOptions
            items={selectedItems}
            unitPrice={product.price}
            onQuantityChange={(index, quantity) => {
              if (!Number.isSafeInteger(quantity) || quantity < 1) return;
              setSelectedItems((items) =>
                items.map((item, itemIndex) =>
                  itemIndex === index ? { ...item, quantity } : item,
                ),
              );
            }}
            onRemove={(index) =>
              setSelectedItems((items) => items.filter((_, itemIndex) => itemIndex !== index))
            }
          />
        }
        color={color}
        error={error}
        gallery={gallery}
        onAddToCart={() => submit(false)}
        onColorChange={(nextColor) => {
          setColor(nextColor);
          setWidth(productWidthOptions(product, nextColor)[0]?.label ?? '');
          setError('');
        }}
        onOrder={() => submit(true)}
        onSizeChange={(nextSize) => {
          const selectedWidth = productWidthOptions(product, color).find(
            (option) => option.label === width,
          );
          if (!selectedWidth?.sizes.includes(nextSize) || selectedWidth.soldOut.includes(nextSize))
            return;
          setSelectedItems((items) => {
            const exists = items.some(
              (item) => item.color === color && item.width === width && item.size === nextSize,
            );
            return exists
              ? items.map((item) =>
                  item.color === color && item.width === width && item.size === nextSize
                    ? { ...item, quantity: item.quantity + 1 }
                    : item,
                )
              : [...items, { id: product.id, color, width, size: nextSize, quantity: 1 }];
          });
          setError('');
        }}
        onWidthChange={(nextWidth) => {
          setWidth(nextWidth);
          setError('');
        }}
        onWishChange={() => setWish(!wish)}
        product={product}
        size=""
        width={width}
        wish={wish}
      />
    </ProductDetailLayout>
  );
}

const routePreviewComponents = {
  InquiryBoard,
  ProductInquiryLink,
  ProductColorSelector,
  ProductSelectedOptions,
  ProductTechSpecs,
} satisfies Pick<
  typeof import('@/types/component-contracts/app-products-id-page'),
  | 'InquiryBoard'
  | 'ProductInquiryLink'
  | 'ProductColorSelector'
  | 'ProductSelectedOptions'
  | 'ProductTechSpecs'
>;

/** 실제 화면 또는 컨텍스트로 선택한 로컬 구성을 표시합니다. (Displays the route or its context-selected local composition.) */
export default function Page() {
  const preview = useRoutePreview(routePreviewComponents);
  return preview ?? <RouteContent />;
}
