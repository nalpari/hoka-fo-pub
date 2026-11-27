'use client';

import { css } from 'styled-system/css';
import { Box } from 'styled-system/jsx';

import { supportNavigation } from '@/app/support/support.navigation';
import { CustomerCenterLayout } from '@/components/support/CustomerCenterLayout';

import { StoreResults } from './_components/StoreContent';
import { stores } from './store.data';

const styles = { page: css({ _mobile: { pb: '16' } }) };

/** 매장의 주소와 연락처 목록을 표시합니다. (Displays store addresses and contact details.) */
export default function Page() {
  return (
    <CustomerCenterLayout
      title="매장 찾기"
      className={styles.page}
      mobileTitleVariant="h7"
      activePath="/support/store"
      breadcrumbItems={[
        { label: 'Home', href: '/' },
        { label: '고객센터', href: '/support' },
        { label: '매장 찾기' },
      ]}
      groups={supportNavigation}
    >
      <Box mt={{ base: '10', _mobile: '6' }} mx={{ _mobile: '-4' }}>
        <StoreResults stores={stores} />
      </Box>
    </CustomerCenterLayout>
  );
}
