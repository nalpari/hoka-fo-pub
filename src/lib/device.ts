export type Platform = 'web' | 'mobile';

export function detectPlatform(userAgent: string | null | undefined): Platform {
  const normalizedUserAgent = userAgent ?? '';
  const phone = /Android.*Mobile|iPhone|iPod|Windows Phone/i.test(normalizedUserAgent);
  const tablet = /iPad|Tablet|Android(?!.*Mobile)/i.test(normalizedUserAgent);

  return phone || tablet ? 'mobile' : 'web';
}
