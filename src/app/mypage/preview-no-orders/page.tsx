import { redirect } from 'next/navigation';

/** 삭제된 주문 요약 미리보기 주소를 마이페이지로 연결합니다. (Redirects the retired order summary preview to the account overview.) */
export default function Page() {
  redirect('/mypage');
}
