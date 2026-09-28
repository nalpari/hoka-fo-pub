import { css } from 'styled-system/css';

type ProductInquiryEmptyStateProps = {
  privateOnly: boolean;
};

export function ProductInquiryEmptyState({ privateOnly }: ProductInquiryEmptyStateProps) {
  return (
    <p className={css({ minH: '180px', pt: '42px', color: '#111', textAlign: 'center' })}>
      {privateOnly ? '공개로 등록된 문의글이 없습니다.' : '등록된 문의글이 없습니다.'}
    </p>
  );
}
