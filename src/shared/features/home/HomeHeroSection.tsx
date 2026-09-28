import type { Platform } from '@/shared/lib/device';
import { Hero } from '@/shared/components/organisms/Hero/Hero';

type HomeHeroSectionProps = { platform: Platform };

export function HomeHeroSection({ platform }: HomeHeroSectionProps) {
  return (
    <Hero
      ariaLabel="TECTON X 4 캠페인"
      content={{
        title: 'TECTON X 4',
        description: (
          <>
            <span>새롭게 선보이는 초고속 ProFly X 기술로</span>
            <br />
            당신의 최고 기록에 도전하세요.
          </>
        ),
      }}
      desktop={{ image: '/images/temp/MainBannerWeb.png' }}
      mobile={{ image: '/images/temp/MainBannerMobile.png' }}
      platform={platform}
      actions={[
        { label: '남성 바로가기', to: '/products' },
        { label: '여성 바로가기', to: '/products' },
      ]}
    />
  );
}
