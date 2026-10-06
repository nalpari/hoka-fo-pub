import type { Platform } from '@/shared/lib/device';
import { Hero } from '@/shared/components/organisms/Hero/Hero';

type HomeHeroSectionProps = { platform: Platform };

export function HomeHeroSection({ platform }: HomeHeroSectionProps) {
  return (
    <Hero
      ariaLabel="TECTON X 4 캠페인"
      platform={platform}
      slides={[
        {
          content: {
            title: 'TECTON X 4',
            description: (
              <>
                <span>새롭게 선보이는 초고속 ProFly X 기술로</span>
                <br />
                당신의 최고 기록에 도전하세요.
              </>
            ),
          },
          desktopImage: '/images/temp/MainBannerWeb.png',
          mobileImage: '/images/temp/MainBannerMobile.png',
          actions: [
            { label: '남성 바로가기', to: '/products' },
            { label: '여성 바로가기', to: '/products' },
          ],
        },
        {
          content: {
            title: 'TRAIL READY',
            description: (
              <>
                거친 지형에서도 흔들림 없이,
                <br />
                다음 모험을 향해 달려보세요.
              </>
            ),
          },
          desktopImage: '/images/temp/home-hero-trail-desktop.png',
          mobileImage: '/images/temp/home-hero-trail-mobile.png',
          actions: [
            { label: '트레일 러닝 보러가기', to: '/products?category=Trail%20Running' },
          ],
        },
        {
          content: {
            title: 'RUN THE CITY',
            description: (
              <>
                도시의 모든 리듬을 따라,
                <br />
                가볍고 빠르게 달려보세요.
              </>
            ),
          },
          desktopImage: '/images/temp/home-hero-city-desktop.png',
          mobileImage: '/images/temp/home-hero-city-mobile.png',
          actions: [
            { label: '로드 러닝 보러가기', to: '/products?category=Road%20Running' },
          ],
        },
      ]}
    />
  );
}
