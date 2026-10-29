import type { Promotions } from '@/components/common/atoms/Badge';

export type ProductWidthOption = {
  label: 'Regular' | 'Wide' | 'X-Wide';
  sizes: string[];
  soldOut: string[];
  lowStockSizes?: string[];
};

export type ProductColorOption = {
  color: string;
  widths: ProductWidthOption[];
};

/**
 * [개발팀 바인딩]
 * Product는 현재 화면 표시 모델이며 서버 DTO 자체가 아닙니다. 어댑터에서 상품 id/이름/가격/이미지/분류/옵션/재고를 변환합니다.
 * colorOptions는 색상별 widths/sizes/soldOut을 연결합니다. colorThumbnails의 id와 label/이미지를 일관되게 매핑하고 다른 상품의 재고를 재사용하지 않습니다.
 * primaryImage/hoverImage/galleryImages에는 승인된 CDN 또는 로컬 경로를 전달합니다. next/image 원격 호스트 설정도 실제 CDN에 맞춰야 합니다.
 * 아래 products 배열과 생성 로직은 시안 fixture입니다. 운영 응답은 ShopShell.state.products 및 각 목록 Provider로 전달합니다.
 */
export type Product = {
  id: string;
  name: string;
  category: '라이프스타일' | '러닝' | '트레일' | '리커버리';
  gender?: "Men's" | "Women's" | 'All Gender';
  price: number;
  originalPrice?: number;
  colors: string[];
  sizes: string[];
  hasSizeGuide?: boolean;
  soldOut: string[];
  lowStockSizes?: string[];
  rating: number;
  reviewCount: number;
  colorOptions?: ProductColorOption[];
  promotion?: Promotions;
  launchStatus: 'COMING' | 'IN_STOCK';
  cushioning: 'Balanced' | 'Plush' | 'Responsive';
  collection: '클리프톤' | '아라히' | '가비오타' | '마하';
  runningType: '데일리 러닝' | '레이스 데이';
  stability: 'Neutral' | 'Stable';
  width: 'Regular' | 'Wide';
  use: 'Everyday Run' | 'Trail Running' | 'Walking';
  primaryImage: string;
  hoverImage: string;
  galleryImages?: string[];
  colorThumbnails?: { id: string; label: string; image: string; galleryImages?: string[] }[];
  detailDescription?: string;
  styleCode?: string;
};

// Bondi 9 color samples for the publishing preview.
// Source: https://www.hoka.com/en/us/womens-everyday-running-shoes/bondi-9/1162012.html
const bondiColorThumbnails = [
  {
    id: 'LRMT',
    label: 'Lilac Cream / Tangerine Glow',
    image: '/images/products/bondi-9/lrmt.png',
  },
  { id: 'BWHT', label: 'Black / White', image: '/images/products/bondi-9/bwht.png' },
  { id: 'VCH', label: 'Vanilla / Birch', image: '/images/products/bondi-9/vch.png' },
  { id: 'FTCL', label: 'Frost / Cielo Blue', image: '/images/products/bondi-9/ftcl.png' },
  { id: 'SNNR', label: 'Sienna / Rose Gold', image: '/images/products/bondi-9/snnr.png' },
  { id: 'MLLW', label: 'Mellow Lilac / Purple Fog', image: '/images/products/bondi-9/mllw.png' },
].map((color) => ({
  ...color,
  galleryImages: [
    color.image,
    ...[2, 3, 4, 5].map(
      (index) => `/images/products/bondi-9/${color.id.toLowerCase()}-${index}.png`,
    ),
  ],
}));

const hokaProductImages = [
  {
    primaryImage:
      'https://dms.deckers.com/hoka/image/upload/f_auto/q_auto/dpr_auto/b_rgb:F7F7F9/w_800/v1787757169/1162012-MLLW_1.png?bgcolor=F3F3F3',
    hoverImage:
      'https://dms.deckers.com/hoka/image/upload/f_auto/q_auto/dpr_auto/b_rgb:F7F7F9/w_800/v1787757169/1162012-MLLW_4.png?bgcolor=F3F3F3',
  },
  {
    primaryImage:
      'https://dms.deckers.com/hoka/image/upload/f_auto/q_auto/dpr_auto/b_rgb:F7F7F9/w_800/v1787757160/1162011-SYSQ_1.png?bgcolor=F3F3F3',
    hoverImage:
      'https://dms.deckers.com/hoka/image/upload/f_auto/q_auto/dpr_auto/b_rgb:F7F7F9/w_800/v1787757160/1162011-SYSQ_4.png?bgcolor=F3F3F3',
  },
  {
    primaryImage:
      'https://dms.deckers.com/hoka/image/upload/f_auto/q_auto/dpr_auto/b_rgb:F7F7F9/w_800/v1782243556/1175853-VGL_1.png?bgcolor=F3F3F3',
    hoverImage:
      'https://dms.deckers.com/hoka/image/upload/f_auto/q_auto/dpr_auto/b_rgb:F7F7F9/w_800/v1782243556/1175853-VGL_2.png?bgcolor=F3F3F3',
  },
  {
    primaryImage:
      'https://dms.deckers.com/hoka/image/upload/f_auto/q_auto/dpr_auto/b_rgb:F7F7F9/w_800/v1787757557/1176573-SLWL_1.png?bgcolor=F3F3F3',
    hoverImage:
      'https://dms.deckers.com/hoka/image/upload/f_auto/q_auto/dpr_auto/b_rgb:F7F7F9/w_800/v1787757557/1176573-SLWL_4.png?bgcolor=F3F3F3',
  },
  {
    primaryImage:
      'https://dms.deckers.com/hoka/image/upload/f_auto/q_auto/dpr_auto/b_rgb:F7F7F9/w_800/v1785409044/1176572-GLCT_1.png?bgcolor=F3F3F3',
    hoverImage:
      'https://dms.deckers.com/hoka/image/upload/f_auto/q_auto/dpr_auto/b_rgb:F7F7F9/w_800/v1785409044/1176572-GLCT_4.png?bgcolor=F3F3F3',
  },
  {
    primaryImage:
      'https://dms.deckers.com/hoka/image/upload/f_auto/q_auto/dpr_auto/b_rgb:F7F7F9/w_800/v1782323049/1164930-VTLV_1.png?bgcolor=F3F3F3',
    hoverImage:
      'https://dms.deckers.com/hoka/image/upload/f_auto/q_auto/dpr_auto/b_rgb:F7F7F9/w_800/v1782323049/1164930-VTLV_2.png?bgcolor=F3F3F3',
  },
] as const;

const names = [
  'Aero Flow Runner',
  'Cloud Ridge Trail',
  'Daily Motion',
  'Summit Pace',
  'Urban Glide',
  'Pulse Knit',
  'Tempo Street',
  'Light Arc',
];

const catalogColors = [
  'red',
  'blue',
  'green',
  'orange',
  'gray',
  'black',
  'white',
  'pink',
  'brown',
  'yellow',
  'purple',
  'cream',
] as const;

export const products: Product[] = Array.from({ length: 24 }, (_, i) => ({
  id: `shoe-${i + 1}`,
  name: `${names[i % names.length]} ${i + 1}`,
  colorThumbnails: bondiColorThumbnails,
  category: (['라이프스타일', '러닝', '트레일', '리커버리'] as const)[i % 4],
  gender: (["Men's", "Women's", 'All Gender'] as const)[i % 3],
  // Publishing example: Daily Motion 3 is 20% off.
  price: i === 2 ? 232000 : 129000 + (i % 5) * 15000,
  originalPrice: i === 2 ? 290000 : undefined,
  colors: [catalogColors[i % catalogColors.length], catalogColors[(i + 5) % catalogColors.length]],
  sizes: ['230', '240', '250', '260', '270', '280'],
  soldOut: i % 4 === 0 ? ['260', '280'] : [],
  rating: Number((4.2 + (i % 8) * 0.1).toFixed(1)),
  reviewCount: 12 + i * 7,
  colorOptions:
    i % 3 === 0
      ? [
          {
            color: catalogColors[i % catalogColors.length],
            widths: [
              { label: 'Regular', sizes: ['230', '240', '250', '260', '270', '280'], soldOut: [] },
            ],
          },
          {
            color: catalogColors[(i + 5) % catalogColors.length],
            widths: [
              {
                label: 'Regular',
                sizes: ['230', '240', '250', '260', '270', '280'],
                soldOut: ['260'],
              },
              { label: 'Wide', sizes: ['240', '250', '260', '270', '280'], soldOut: ['280'] },
            ],
          },
        ]
      : undefined,
  promotion: i % 5 === 0 ? 'New' : undefined,
  launchStatus: i % 6 === 0 ? 'COMING' : 'IN_STOCK',
  cushioning: (['Balanced', 'Plush', 'Responsive'] as const)[i % 3],
  collection: (['클리프톤', '아라히', '가비오타', '마하'] as const)[i % 4],
  runningType: (['데일리 러닝', '레이스 데이'] as const)[i % 2],
  stability: i % 3 === 0 ? 'Stable' : 'Neutral',
  width: i % 4 === 0 ? 'Wide' : 'Regular',
  use: (['Everyday Run', 'Trail Running', 'Walking'] as const)[i % 3],
  ...hokaProductImages[i % hokaProductImages.length],
}));

const cliftonGalleryImages = Array.from(
  { length: 8 },
  (_, index) => `/images/products/clifton-11-gtx/gallery-${index + 1}.png`,
);

products[0] = {
  ...products[0],
  name: 'Clifton 11 GTX',
  category: '러닝',
  gender: "Men's",
  price: 240000,
  colors: ['Black / Outer Orbit', 'Oat Milk / Stone', 'White / Frost', 'Cosmic Grey'],
  sizes: [
    '220',
    '225',
    '230',
    '235',
    '240',
    '245',
    '250',
    '255',
    '260',
    '265',
    '270',
    '275',
    '280',
    '285',
    '290',
    '295',
    '300',
  ],
  soldOut: ['300'],
  rating: 4,
  reviewCount: 472,
  promotion: 'Exclusive',
  collection: '클리프톤',
  width: 'Regular',
  colorOptions: [
    {
      color: 'Black / Outer Orbit',
      widths: [
        {
          label: 'Regular',
          sizes: [
            '220',
            '225',
            '230',
            '235',
            '240',
            '245',
            '250',
            '255',
            '260',
            '265',
            '270',
            '275',
            '280',
            '285',
            '290',
            '295',
            '300',
          ],
          soldOut: ['300'],
        },
        {
          label: 'Wide',
          sizes: [
            '230',
            '235',
            '240',
            '245',
            '250',
            '255',
            '260',
            '265',
            '270',
            '275',
            '280',
            '285',
            '290',
          ],
          soldOut: [],
        },
        {
          label: 'X-Wide',
          sizes: ['240', '245', '250', '255', '260', '265', '270', '275', '280'],
          soldOut: [],
        },
      ],
    },
  ],
  primaryImage: cliftonGalleryImages[0],
  hoverImage: cliftonGalleryImages[1],
  galleryImages: cliftonGalleryImages,
  // The Bondi thumbnails inherited from the generated base would hide the Clifton colour options and gallery.
  colorThumbnails: undefined,
  detailDescription:
    '어떤 날씨에도 견딜 수 있도록 설계된 실루엣인 클리프턴 11 GTX는 보이지 않는 핏 멤브레인, 밀폐된 메쉬 갑피, 발수 코팅으로 외부 환경을 완벽히 차단합니다. 조절 가능한 스피드 레이스로 쉽게 착용할 수 있고, 날씨에 강한 접지력 포드와 반사 디테일까지 갖춘 클리프턴 11 GTX는 날씨와 상관없이 빛나도록 설계되었습니다.',
  styleCode: 'HOKADFG34S',
};

// Preview single-line name truncation and the full catalog color selection.
products.splice(1, 0, {
  ...products[1],
  id: 'shoe-25',
  name: 'HOKA Clifton Ultra Long Distance Everyday Running All Weather Limited Edition Special Collection',
  colors: [...catalogColors],
  colorThumbnails: catalogColors.map((color, index) => ({
    ...bondiColorThumbnails[index % bondiColorThumbnails.length],
    id: color,
    label: color,
  })),
  colorOptions: catalogColors.map((color) => ({
    color,
    widths: [{ label: 'Regular', sizes: [...products[1].sizes], soldOut: [] }],
  })),
  soldOut: [],
  launchStatus: 'IN_STOCK',
});
