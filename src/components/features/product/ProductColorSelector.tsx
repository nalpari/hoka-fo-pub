import type { Product } from '@/mocks/products';
import { ProductColorSelector as ColorSelector } from '@/components/common/molecules/ProductOptionSelectors/ProductColorSelector';

type ProductColorSelectorProps = {
  colors: string[];
  gallery: string[];
  colorThumbnails?: Product['colorThumbnails'];
  value: string;
  onValueChange: (color: string) => void;
};

/** 상품의 컬러 이미지와 갤러리 대체 이미지를 공통 선택 UI에 전달합니다. (Prepares product color images and gallery fallbacks for the shared selector.) */
export function ProductColorSelector({
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
