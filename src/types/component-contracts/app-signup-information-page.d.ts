// Type-only contracts for moved local components; never import these declarations as runtime values.
import {
  type RegistrationContentProps,
  type RegistrationInformation,
} from '@/app/signup/information/registration.types';
import { type MarketingPreferences } from '@/app/signup/information/registration.types';
type Props = Pick<RegistrationContentProps, 'information' | 'fieldErrors' | 'onChange'> & {
  fieldKey: keyof RegistrationInformation;
  label: string;
  placeholder: string;
  type?: string;
  fieldId?: string;
  disabled?: boolean;
};
declare function RegistrationField({
  fieldKey: key,
  label,
  placeholder,
  type,
  fieldId,
  disabled,
  information,
  fieldErrors,
  onChange,
}: Props): import('react').JSX.Element;
type RegistrationIdFieldsProps = Pick<
  RegistrationContentProps,
  'information' | 'fieldErrors' | 'onChange' | 'onDuplicateCheck' | 'duplicateNotice'
>;
/** 회원 아이디를 입력하고 중복확인 동작을 제공합니다. (Collects the member ID and exposes its duplicate-check action.) */
declare function RegistrationIdFields(
  props: RegistrationIdFieldsProps,
): import('react').JSX.Element;
type RegistrationEmailFieldsProps = Pick<
  RegistrationContentProps,
  'information' | 'fieldErrors' | 'onChange' | 'domainChoice' | 'onDomainChoice'
>;
declare function RegistrationEmailFields(
  props: RegistrationEmailFieldsProps,
): import('react').JSX.Element;
type RegistrationPersonalFieldsProps = Pick<
  RegistrationContentProps,
  'information' | 'fieldErrors' | 'onChange'
>;
declare function RegistrationPersonalFields(
  props: RegistrationPersonalFieldsProps,
): import('react').JSX.Element;
type RegistrationAddressFieldsProps = Pick<
  RegistrationContentProps,
  'information' | 'fieldErrors' | 'onChange' | 'addressOpen' | 'onAddressOpen'
>;
declare function RegistrationAddressFields(
  props: RegistrationAddressFieldsProps,
): import('react').JSX.Element;
type RegistrationPreferenceRowProps = {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
};
declare function RegistrationPreferenceRow({
  label,
  value,
  onValueChange,
}: RegistrationPreferenceRowProps): import('react').JSX.Element;
type RegistrationAdditionalFieldsProps = Pick<
  RegistrationContentProps,
  'preferences' | 'onPreferenceChange'
>;
declare function RegistrationAdditionalFields(
  props: RegistrationAdditionalFieldsProps,
): import('react').JSX.Element;
export type {
  RegistrationInformation,
  MarketingPreferences,
} from '@/app/signup/information/registration.types';
declare function RegistrationContent(props: RegistrationContentProps): import('react').JSX.Element;
type MarketingConsentItem = {
  label: string;
  value: string;
};
type MarketingConsentSummaryModalProps = {
  open: boolean;
  items: readonly MarketingConsentItem[];
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
};
declare function MarketingConsentSummaryModal({
  open,
  items,
  onOpenChange,
  onConfirm,
}: MarketingConsentSummaryModalProps): import('react').JSX.Element;
type RegistrationMarketingConsentSummaryModalProps = {
  preferences: MarketingPreferences;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
};
declare function RegistrationMarketingConsentSummaryModal({
  preferences,
  onOpenChange,
  onConfirm,
}: RegistrationMarketingConsentSummaryModalProps): import('react').JSX.Element;
/** 해당 경로의 화면과 상호작용을 구성합니다. (Composes the route screen and its interactions.) */
export default function Page(): import('react').JSX.Element;
export {
  RegistrationField,
  RegistrationIdFields,
  RegistrationEmailFields,
  RegistrationPersonalFields,
  RegistrationAddressFields,
  RegistrationPreferenceRow,
  RegistrationAdditionalFields,
  RegistrationContent,
  MarketingConsentSummaryModal,
  type MarketingConsentItem,
  type MarketingConsentSummaryModalProps,
  RegistrationMarketingConsentSummaryModal,
};
