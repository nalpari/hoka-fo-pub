import { css } from 'styled-system/css';
import { Center, Stack } from 'styled-system/jsx';
import { Button } from '@/shared/components/atoms/Button/Button';
import { Icon } from '@/shared/components/atoms/Icon/Icon';
import type { VerificationMethod } from './IdentityVerificationContent';
const styles = {
  illustration: css({
    border: '1px solid var(--color-black-20)',
    color: 'text.primary',
    '& > img': { w: '80px!', h: '80px!' },
  }),
};

type Props = {
  method: { id: VerificationMethod; label: string; iconName: string };
  onSelect: (method: VerificationMethod) => void;
};

export function VerificationMethodCard({ method, onSelect }: Props) {
  return (
    <Stack gap="6" minW="0">
      <Center h="160px" position="relative" className={styles.illustration} aria-hidden="true">
        <Icon name={method.iconName} size="80px" />
      </Center>
      <Button variant="primary" fullWidth onClick={() => onSelect(method.id)}>
        {method.label}
      </Button>
    </Stack>
  );
}
