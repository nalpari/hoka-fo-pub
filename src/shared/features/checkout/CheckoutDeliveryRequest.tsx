import { CheckoutDeliveryMessageField } from './CheckoutDeliveryMessageField';
import { CheckoutDeliveryRequestSelect } from './CheckoutDeliveryRequestSelect';
import { useState } from 'react';
import { Stack } from 'styled-system/jsx';

/** 배송 요청 선택과 직접 입력을 관리합니다. (Manages delivery instructions and custom text.) */
export function CheckoutDeliveryRequest() {
  const [request, setRequest] = useState('');
  const [message, setMessage] = useState('');
  return (
    <Stack gap="3">
      <CheckoutDeliveryRequestSelect value={request} onValueChange={setRequest} />
      {request === 'custom' ? (
        <CheckoutDeliveryMessageField value={message} onValueChange={setMessage} />
      ) : null}
    </Stack>
  );
}
