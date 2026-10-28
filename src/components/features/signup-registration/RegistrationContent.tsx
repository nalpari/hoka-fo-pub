import { Stack } from 'styled-system/jsx';
import { Button } from '@/components/common/atoms/Button/Button';
import { StatusMessage } from '@/components/common/atoms/StatusMessage/StatusMessage';
import { AccountFormLayout } from '@/components/common/layouts/AccountFormLayout/AccountFormLayout';
import { RegistrationIdFields } from './RegistrationIdFields';
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
    >
      <form id="registration-form" noValidate onSubmit={props.onSubmit}>
        <Stack gap="6">
          {props.stage === 'information' ? (
            <>
              <RegistrationIdFields
                information={props.information}
                fieldErrors={props.fieldErrors}
                onChange={props.onChange}
                onDuplicateCheck={props.onDuplicateCheck}
                duplicateNotice={props.duplicateNotice}
              />
              <Stack gap="4">
                <RegistrationPersonalFields
                  information={props.information}
                  fieldErrors={props.fieldErrors}
                  onChange={props.onChange}
                />
                <RegistrationAddressFields
                  information={props.information}
                  fieldErrors={props.fieldErrors}
                  onChange={props.onChange}
                  addressOpen={props.addressOpen}
                  onAddressOpen={props.onAddressOpen}
                />
                <RegistrationEmailFields
                  information={props.information}
                  fieldErrors={props.fieldErrors}
                  onChange={props.onChange}
                  domainChoice={props.domainChoice}
                  onDomainChoice={props.onDomainChoice}
                />
              </Stack>
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
