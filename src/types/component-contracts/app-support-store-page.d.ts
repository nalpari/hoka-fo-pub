// Type-only contracts for moved local components; never import these declarations as runtime values.
/** Keeps the existing map sample undistorted within the PC/mobile preview frames. */
declare function StoreMapPreview({ storeName }: { storeName: string }): import('react').JSX.Element;
type StoreResult = {
  name: string;
  address: string;
  phone: string;
  hours?: string;
};
declare function StoreResults({
  stores,
}: {
  stores: readonly StoreResult[];
}): import('react').JSX.Element;
/** 매장 검색 조건과 검색 결과를 관리합니다. (Manages store search filters and results.) */
export default function Page(): import('react').JSX.Element;
export { StoreMapPreview, StoreResults, type StoreResult };
