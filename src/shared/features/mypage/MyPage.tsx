import { Link } from 'react-router-dom';
import { css } from 'styled-system/css';
import { EmptyState } from '@/shared/components/atoms/EmptyState/EmptyState';
import { PersonalizationCard } from '@/shared/components/molecules/MyPage/PersonalizationCard';
import { PageSection } from '@/shared/components/molecules/PageSection/PageSection';
import { SidebarNavigationLayout } from '@/shared/components/layouts/SidebarNavigationLayout/SidebarNavigationLayout';
import { MemberHero } from '@/shared/components/organisms/Member/MemberHero';
import { QuickLinkGrid } from '@/shared/components/organisms/MyPage/QuickLinkGrid';
import { OrderStatusTracker } from '@/shared/components/molecules/OrderStatusTracker/OrderStatusTracker';
import { memberSummary, myPageNavigation, quickLinks } from '@/shared/features/mypage/mypage.data';

const title = css({ m: '0 0 26px', fontSize: '28' /* 기존 30px */ });

const action = css({
  fontSize: '14' /* 기존 13px */,
  textDecoration: 'underline',
  textUnderlineOffset: '4px',
});

export function MyPage() {
  return (
    <SidebarNavigationLayout
      activePath="/mypage"
      groups={myPageNavigation}
      title="MY HOKA"
      titleTo="/mypage"
    >
      <h1 className={title}>MY HOKA</h1>
      <MemberHero member={memberSummary} />
      <QuickLinkGrid items={quickLinks} label="마이페이지 바로가기" />
      <PageSection title="주문 현황">
        <OrderStatusTracker
          items={[
            { label: '전체', count: 0 },
            { label: '결제 완료', count: 0 },
            { label: '상품 준비중', count: 0 },
            { label: '배송중', count: 0 },
            { label: '배송 완료', count: 0 },
          ]}
        />
      </PageSection>
      <PageSection
        title="나에게 맞는 러닝을 시작하세요"
        description="간단한 러닝 프로필을 완성하면 맞춤 제품과 콘텐츠를 추천해 드립니다."
      >
        <PersonalizationCard
          action="프로필 만들기"
          description="목표, 지면, 쿠셔닝 선호도를 바탕으로 다음 러닝을 위한 HOKA를 찾아보세요."
          eyebrow="RUNNING PROFILE"
          title="나의 러닝 스타일 찾기"
          to="/mypage/running-profile"
        />
      </PageSection>
      <PageSection
        title="최근 주문"
        action={
          <Link className={action} to="/mypage/orders">
            전체 보기 →
          </Link>
        }
      >
        <EmptyState
          title="최근 주문이 없습니다."
          description="새로운 러닝을 위한 제품을 둘러보세요."
          action={<Link to="/products">상품 보러가기</Link>}
        />
      </PageSection>
    </SidebarNavigationLayout>
  );
}
