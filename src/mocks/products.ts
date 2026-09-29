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
  category: string;
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
export const products: Product[] = Array.from({ length: 24 }, (_, i) => ({
  id: `shoe-${i + 1}`,
  name: `${names[i % names.length]} ${i + 1}`,
  category: i % 3 === 0 ? '라이프스타일' : i % 3 === 1 ? '러닝' : '트레일',
  gender: (["Men's", "Women's", 'All Gender'] as const)[i % 3],
  price: 129000 + (i % 5) * 15000,
  colors: i % 2 ? ['Black', 'Silver'] : ['White', 'Lime'],
  sizes: ['230', '240', '250', '260', '270', '280'],
  soldOut: i % 4 === 0 ? ['260', '280'] : [],
  rating: Number((4.2 + (i % 8) * 0.1).toFixed(1)),
  reviewCount: 12 + i * 7,
  colorOptions:
    i % 3 === 0
      ? [
          {
            color: i % 2 ? 'Black' : 'White',
            widths: [
              { label: 'Regular', sizes: ['230', '240', '250', '260', '270', '280'], soldOut: [] },
            ],
          },
          {
            color: i % 2 ? 'Silver' : 'Lime',
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
  stability: i % 3 === 0 ? 'Stable' : 'Neutral',
  width: i % 4 === 0 ? 'Wide' : 'Regular',
  use: (['Everyday Run', 'Trail Running', 'Walking'] as const)[i % 3],
  ...hokaProductImages[i % hokaProductImages.length],
}));
