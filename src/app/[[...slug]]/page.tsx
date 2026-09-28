import { headers } from 'next/headers';
import { AdaptiveRoot } from '@/app/AdaptiveRoot';
import { detectPlatform } from '@/shared/lib/device';

export default async function Page() {
  const requestHeaders = await headers();
  const platform = detectPlatform(requestHeaders.get('user-agent'));

  return <AdaptiveRoot platform={platform} />;
}
