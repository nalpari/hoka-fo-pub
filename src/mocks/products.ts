export type ProductWidthOption = {
  label: 'Regular' | 'Wide';
  sizes: string[];
  soldOut: string[];
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
