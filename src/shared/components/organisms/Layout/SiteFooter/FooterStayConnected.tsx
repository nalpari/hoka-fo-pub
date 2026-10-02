'use client';

import { EmailSignupField } from '@/shared/components/atoms/EmailSignupField/EmailSignupField';
import { StatusMessage } from '@/shared/components/atoms/StatusMessage/StatusMessage';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { FooterBrandLogo } from '@/shared/components/organisms/Layout/SiteFooter/FooterBrandLogo';
import { FooterSocialLinks } from '@/shared/components/organisms/Layout/SiteFooter/FooterSocialLinks';
import { Flex } from 'styled-system/jsx';
import { useState } from 'react';

export function FooterStayConnected() {
  const [message, setMessage] = useState<string | null>(null);

  return (
    <Flex direction="column" gap="4">
      <Typography as="h3" variant="formLabel">
        Stay Connected
      </Typography>
      <EmailSignupField
        onSubmit={(email) => setMessage(email.includes('@') ? '구독 신청이 완료되었습니다.' : '이메일 주소를 확인해 주세요.')}
      />
      {message ? <StatusMessage tone={message.includes('완료') ? 'success' : 'error'}>{message}</StatusMessage> : null}
      <FooterSocialLinks />
      <FooterBrandLogo />
    </Flex>
  );
}
