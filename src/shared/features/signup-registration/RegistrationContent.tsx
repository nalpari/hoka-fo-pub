import { Stack } from 'styled-system/jsx';
import { Button } from '@/shared/components/atoms/Button/Button';
import { StatusMessage } from '@/shared/components/atoms/StatusMessage/StatusMessage';
import { AddressSearchModal } from '@/shared/components/organisms/Address/AddressSearchModal';
import { AccountFormLayout } from '@/shared/components/layouts/AccountFormLayout/AccountFormLayout';
import { RegistrationEmailFields } from './RegistrationEmailFields';
import { RegistrationPersonalFields } from './RegistrationPersonalFields';
import { RegistrationAddressFields } from './RegistrationAddressFields';
import { RegistrationAdditionalFields } from './RegistrationAdditionalFields';
import type { RegistrationContentProps } from './registration.types';

export type { RegistrationInformation, MarketingPreferences } from './registration.types';

export function RegistrationContent(props: RegistrationContentProps) {
  return (
    <AccountFormLayout
      title={props.stage === 'information' ? '회원 정보' : '부가 정보'}
      actionsSpacing="compact"
      actions={
        <>
          <Button variant="secondary" fullWidth onClick={props.onCancel}>
            취소
          </Button>
          <Button variant="primary" type="submit" form="registration-form" fullWidth>
            다음
          </Button>
        </>
      }
      dialogs={
        <AddressSearchModal
          open={props.addressOpen}
          onOpenChange={props.onAddressOpen}
          postalCode={props.information.postalCode}
          address={props.information.address}
          idPrefix="registration"
          onPostalCodeChange={(value) => props.onChange('postalCode', value)}
          onAddressChange={(value) => props.onChange('address', value)}
        />
      }
    >
      <form id="registration-form" noValidate onSubmit={props.onSubmit}>
        <Stack gap="4">
          {props.stage === 'information' ? (
            <>
              <RegistrationEmailFields
                information={props.information}
                fieldErrors={props.fieldErrors}
                onChange={props.onChange}
                domainChoice={props.domainChoice}
                onDomainChoice={props.onDomainChoice}
                onDuplicateCheck={props.onDuplicateCheck}
                duplicateNotice={props.duplicateNotice}
              />
              <RegistrationPersonalFields
                information={props.information}
                fieldErrors={props.fieldErrors}
                onChange={props.onChange}
              />
              <RegistrationAddressFields
                information={props.information}
                fieldErrors={props.fieldErrors}
                onChange={props.onChange}
                onAddressOpen={props.onAddressOpen}
              />
            </>
          ) : (
            <RegistrationAdditionalFields
              preferences={props.preferences}
              onPreferenceChange={props.onPreferenceChange}
            />
          )}
          {props.notice ? <StatusMessage tone="error">{props.notice}</StatusMessage> : null}
        </Stack>
      </form>
    </AccountFormLayout>
  );
}
