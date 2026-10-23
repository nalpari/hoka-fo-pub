import { Stack } from 'styled-system/jsx';
import { css } from 'styled-system/css';
import { FormField } from '@/shared/components/atoms/FormField/FormField';
import { Select } from '@/shared/components/atoms/Select/Select';
import { TextareaField } from '@/shared/components/molecules/FormFields/TextareaField';
import { CharacterCount } from '@/shared/components/molecules/FormFields/CharacterCount';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { claimReasonLabels } from './order-policy';
import type { ClaimReason } from './orders.types';

type Props = {
  id: string;
  reason: ClaimReason;
  details: string;
  onReasonChange: (reason: ClaimReason) => void;
  onDetailsChange: (details: string) => void;
};

/** 신청 사유·상세 내용과 반품비 안내를 표시합니다. (Displays claim reason, details, and return fee guidance.) */
export function ClaimReasonFields({ id, reason, details, onReasonChange, onDetailsChange }: Props) {
  return (
    <Stack gap="3">
      <FormField htmlFor={`${id}-reason`} label="사유" variant="boxed" required>
        <Select
          id={`${id}-reason`}
          value={reason}
          onChange={(event) => onReasonChange(event.target.value as ClaimReason)}
        >
          <option value="">사유를 선택해 주세요.</option>
          {Object.entries(claimReasonLabels).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Select>
      </FormField>
      <TextareaField
        id={`${id}-details`}
        label="상세내용 (선택)"
        variant="boxed"
        inputProps={{
          multiline: true,
          value: details,
          maxLength: 250,
          rows: 5,
          placeholder: '자세한 내용을 적어주시면 처리에 도움이 됩니다.',
          onChange: (event) => onDetailsChange(event.target.value),
        }}
        renderControl={(control) => (
          <Stack gap="2" w="100%">
            {control}
            <CharacterCount
              length={details.length}
              limit={250}
              tone="subtle"
              className={css({ textAlign: 'right' })}
            />
          </Stack>
        )}
      />
      <Typography variant="body5" tone="subtle">
        *단순 변심·사이즈 사유의 반품비는 5,000원입니다. 상품 불량·오배송은 반품비가 부과되지
        않습니다. 상품 수령 후 7일 이내에 신청할 수 있으며, 사용 흔적이나 상품 훼손 시 반품이 어려울
        수 있습니다.
      </Typography>
    </Stack>
  );
}
