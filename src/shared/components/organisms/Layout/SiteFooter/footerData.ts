export type FooterGroup = {
  title: string;
  links: { label: string; to: string }[];
};

export const footerGroups: FooterGroup[] = [
  {
    title: 'Company',
    links: [
      { label: 'Our Story', to: '/' },
      { label: 'Our Impact', to: '/' },
      { label: 'Blog', to: '/support/notices' },
      { label: 'Careers', to: '/support' },
      { label: 'Affiliate Program', to: '/support' },
      { label: 'Join the Product Testing Team', to: '/support' },
    ],
  },
  {
    title: 'Customer Care',
    links: [
      { label: 'Help Center & FAQs', to: '/support/faq' },
      { label: 'Membership', to: '/support' },
      { label: 'Fly for 30 Guarantee', to: '/support' },
      { label: 'Returns & Exchanges', to: '/support' },
      { label: 'Return Policy', to: '/support' },
      { label: 'Shipping Information', to: '/support' },
      { label: 'Order Status', to: '/support' },
      { label: 'Warranty', to: '/support' },
      { label: 'Counterfeit Warnings & Phishing', to: '/support' },
      { label: 'Gift Card Balance', to: '/support' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Sizing Guide', to: '/support' },
      { label: 'Shoe Finder', to: '/explore/shoe-finder' },
      { label: 'True Fit', to: '/support' },
      { label: 'Care & Cleaning', to: '/support' },
      { label: 'Free Shipping & Free Returns', to: '/support' },
      { label: 'Wishlist', to: '/mypage/recent' },
    ],
  },
  {
    title: 'Shop',
    links: [
      { label: 'Gift Cards', to: '/support' },
      { label: 'SALE', to: '/products?sort=popular' },
      { label: 'Find a Store', to: '/support/store' },
      { label: 'Pro Deal', to: '/support' },
      { label: 'Discount Programs', to: '/support' },
      { label: 'Clifton', to: '/products/shoe-3' },
      { label: 'Bondi', to: '/products/shoe-2' },
      { label: 'Gaviota', to: '/products/shoe-1' },
      { label: 'Mach', to: '/products/shoe-4' },
      { label: 'Arahi', to: '/products/shoe-1' },
      { label: 'Transport', to: '/products/shoe-2' },
      { label: 'Speedgoat', to: '/products/shoe-3' },
      { label: 'Challenger', to: '/products/shoe-4' },
    ],
  },
];

export const legalLinks = [
  'Visit our international sites',
  '© 2026 Deckers Brands',
  'Privacy Policy',
  'Cookies Policy',
  'Cookies Preferences',
  'Terms & Conditions',
  'Website Accessibility',
  'CA Transparency Act',
  'Do Not Sell My Personal Information',
];

export const socials = [
  { label: 'Facebook', file: 'facebook.svg' },
  { label: 'Instagram', file: 'instagram.svg' },
  { label: 'Pinterest', file: 'pinterest.svg' },
  { label: 'Strava', file: 'strava.svg' },
  { label: 'TikTok', file: 'tiktok.svg' },
  { label: 'X', file: 'x.svg' },
  { label: 'YouTube', file: 'youtube.svg' },
] as const;
