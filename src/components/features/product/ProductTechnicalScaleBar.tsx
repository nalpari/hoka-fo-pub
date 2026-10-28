import { Box } from 'styled-system/jsx';
import type { ProductTechnicalScaleData } from './productDetailPresentation';

type ProductTechnicalScaleBarProps = Pick<ProductTechnicalScaleData, 'level'>;

export function ProductTechnicalScaleBar({ level }: ProductTechnicalScaleBarProps) {
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
