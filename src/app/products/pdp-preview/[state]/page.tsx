import { notFound } from 'next/navigation';

import { RouteContent } from '@/app/products/[id]/_components/ProductDetailContent';
import { productDetailPreviews } from '@/app/products/[id]/productDetailPreviews';

export function generateStaticParams() {
  return productDetailPreviews.map(({ state }) => ({ state }));
}

/** PDP 시안 상태를 직접 표시합니다. (Displays a PDP design state directly.) */
export default async function Page({ params }: PageProps<'/products/pdp-preview/[state]'>) {
  const { state } = await params;
  const preview = productDetailPreviews.find((entry) => entry.state === state);
  if (!preview) notFound();

  return <RouteContent key={preview.state} preview={preview.state} />;
}
