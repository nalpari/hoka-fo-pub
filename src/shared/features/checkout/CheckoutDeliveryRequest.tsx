import { CharacterCount } from '@/shared/components/molecules/FormFields/CharacterCount';
import { useState } from 'react';
import { Stack } from 'styled-system/jsx';
import { css } from 'styled-system/css';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

export function CheckoutDeliveryRequest() {
  const [request, setRequest] = useState('');
  const [message, setMessage] = useState('');

  return (
    <>
      <Stack gap="1" border="1px solid var(--colors-black-40)" p="2">
        <Typography as="label" htmlFor="delivery-request" variant="body5">
          * 배송시 요청사항
        </Typography>
        <select
          id="delivery-request"
          name="deliveryRequest"
          value={request}
          onChange={(event) => setRequest(event.target.value)}
          className={css({
            border: '0',
            w: '100%',
            h: '24px',
            px: '0',
            bg: 'white',
          })}
        >
          <option value="">요청사항을 선택해주세요</option>
          <option value="door">문 앞에 놓아주세요</option>
          <option value="call">배송 전 연락주세요</option>
          <option value="security">경비실에 맡겨주세요</option>
          <option value="custom">직접 입력하기</option>
        </select>
      </Stack>
      {request === 'custom' ? (
        <Stack gap="2" border="1px solid var(--colors-black-40)" p="3">
          <Typography as="label" htmlFor="delivery-message" variant="body5">
            * 요청사항
          </Typography>
          <textarea
            id="delivery-message"
            name="deliveryMessage"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            maxLength={250}
            placeholder="내용을 입력해주세요."
            className={css({
              w: '100%',
              minH: '130px',
              resize: 'vertical',
              border: '0',
              fontSize: '14px',
            })}
          />
          <CharacterCount
            length={message.length}
            limit={250}
            tone="subtle"
            className={css({ textAlign: 'right' })}
          />
        </Stack>
      ) : null}
    </>
  );
}
