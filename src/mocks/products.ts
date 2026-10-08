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

export type Product = {
  id: string;
  name: string;
  category: '라이프스타일' | '러닝' | '트레일' | '리커버리';
  gender?: "Men's" | "Women's" | 'All Gender';
  price: number;
  colors: string[];
  sizes: string[];
  hasSizeGuide?: boolean;
  soldOut: string[];
  lowStockSizes?: string[];
  rating: number;
  reviewCount: number;
  colorOptions?: ProductColorOption[];
  promotion?: 'Best' | 'New' | 'Exclusive';
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
  detailDescription?: string;
  styleCode?: string;
};

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
  category: (['라이프스타일', '러닝', '트레일', '리커버리'] as const)[i % 4],
  gender: (["Men's", "Women's", 'All Gender'] as const)[i % 3],
  price: 129000 + (i % 5) * 15000,
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
  detailDescription:
    '어떤 날씨에도 편안한 주행을 돕는 리프레시드 클리프턴 11 GTX는 보이지 않는 뒷면부터 앞발의 편안함을 위해 설계되었습니다. 조절 가능한 스피드 레이스 시스템과 강화된 아웃솔은 안정감 있는 착화감을 선사합니다.',
  styleCode: 'HOKADFG34S',
};
