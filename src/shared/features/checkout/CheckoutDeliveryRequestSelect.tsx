import { FormField } from '@/shared/components/atoms/FormField/FormField';
import { Select } from '@/shared/components/atoms/Select/Select';

/** 배송 요청의 정해진 옵션을 표시합니다. (Displays preset delivery instruction options.) */
export function CheckoutDeliveryRequestSelect({
  value,
  onValueChange,
}: {
  value: string;
  onValueChange: (value: string) => void;
}) {
  return (
    <FormField htmlFor="delivery-request" label="배송시 요청사항" variant="boxed" required>
      <Select
        id="delivery-request"
        name="deliveryRequest"
        value={value}
        onChange={(event) => onValueChange(event.target.value)}
      >
        <option value="">요청사항을 선택해주세요</option>
        <option value="door">문 앞에 놓아주세요</option>
        <option value="call">배송 전 연락주세요</option>
        <option value="security">경비실에 맡겨주세요</option>
        <option value="custom">직접 입력하기</option>
      </Select>
    </FormField>
  );
}
