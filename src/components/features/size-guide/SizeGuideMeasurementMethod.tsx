import { Stack } from 'styled-system/jsx';
import { Typography } from '@/components/common/atoms/Typography/Typography';

type SizeGuideMeasurementMethodProps = {
  title: string;
  steps: readonly string[];
  description?: string;
};

export function SizeGuideMeasurementMethod({
  title,
  steps,
  description,
}: SizeGuideMeasurementMethodProps) {
  return (
    <Stack gap="2">
      <Typography variant="body3" weight="bold">
        [{title}]
      </Typography>
      <Stack as="ol" gap="1" listStyleType="none" m="0" p="0">
        {steps.map((step, index) => (
          <Typography as="li" key={step} variant="body4">
            STEP {index + 1}. {step}
          </Typography>
        ))}
      </Stack>
      {description && <Typography variant="body4">{description}</Typography>}
    </Stack>
  );
}
