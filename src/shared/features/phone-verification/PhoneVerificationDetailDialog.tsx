import { ContentHeader } from '@/shared/components/molecules/ContentHeader/ContentHeader';
import { SingleActionDialog } from '@/shared/components/molecules/SingleActionDialog/SingleActionDialog';

import { css } from 'styled-system/css';
import { Stack } from 'styled-system/jsx';

const styles = { carrierSection: css({ borderBottom: '1px solid var(--color-black-20)' }) };

const mvnoCarriers = [
  {
    title: 'SKT 알뜰폰',
    names:
      'KCT, SK텔링크, KDM링크, 이마트, 스마텔, 아이즈비전, 에스원, 유니컴즈, 인스코비, 프리텔레콤, 큰사람 컴퓨터, 티브로드, 하나방송, 제주방송, 남인천방송, 서경방송, 광주방송, 금강방송, JCN울산',
  },
  {
    title: 'KT 알뜰폰',
    names:
      '홈플러스, 온세텔레콤, CJ헬로비전, 위너스텔, 에버그린모바일, S로밍, 에넥스텔레콤, KT파워텔, 프리텔레콤, 씨엔커뮤니케이션, 몬스터텔레콤, 머천드코리아, 인스코비, 에스원, 에이에스엔코리아, 세종텔레콤, KT텔레캅, 이지모바일, KT M모바일, 유니컴즈, 엔알컴퍼니, 아이즈비전, 제이씨티, 정성모바일',
  },
  {
    title: 'LG U+ 알뜰폰',
    names:
      '미디어로그, 인스코비, 머천드코리아, 엠티텔레콤, 홈플러스, 이마트, 리더스텔레콤, 씨엔엠브이엔오, 비엔에스솔루션, 인티파크, 에프아이텔, 자티전자, 서경방송, JCN울산, 푸른방송, 남인천방송, 금강방송, 제주방송, 와이엘랜드',
  },
] as const;

type Props = { open: boolean; onOpenChange: (open: boolean) => void };

export function PhoneVerificationDetailDialog({ open, onOpenChange }: Props) {
  return (
    <SingleActionDialog
      open={open}
      onOpenChange={onOpenChange}
      title="알뜰폰 사업자"
      closeLabel="안내 닫기"
      size="md"
      mobilePresentation="fullscreen"
      onConfirm={() => onOpenChange(false)}
    >
      <Stack gap="4">
        {mvnoCarriers.map((carrier, index) => (
          <ContentHeader
            key={carrier.title}
            gap="3"
            pb={index === mvnoCarriers.length - 1 ? '0' : '4'}
            className={index === mvnoCarriers.length - 1 ? undefined : styles.carrierSection}
            titleAs="h2"
            title={<>{carrier.title}</>}
            titleProps={{ variant: 'body3' }}
            description={<>{carrier.names}</>}
            descriptionProps={{ variant: 'body4' }}
          />
        ))}
      </Stack>
    </SingleActionDialog>
  );
}
