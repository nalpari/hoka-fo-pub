/**
 * [개발팀 바인딩]
 * LocaleRegion의 id/name/countries에 승인된 국가/사이트 데이터를 전달합니다. 국가 label/code/href와 국기 자산을 일치시킵니다.
 * 아래 목록은 현재 구성 데이터이며 주소 입력 폼의 국가나 결제 통화를 자동 확정하는 API가 아닙니다.
 */

export type LocaleCountry = { code: string; label: string; href: string };

export type LocaleRegion = { id: string; name: string; countries: readonly LocaleCountry[] };

export const localeRegions: readonly LocaleRegion[] = [
  {
    id: 'africa',
    name: 'Africa',
    countries: [
      { code: 'dz', label: 'Algeria', href: 'https://www.hoka.com/en/dz/' },
      { code: 'ma', label: 'Morocco', href: 'https://www.hoka.com/en/ma/' },
      { code: 're', label: 'Réunion', href: 'https://www.hoka.com/en/re/' },
      { code: 'za', label: 'South Africa', href: 'https://www.hoka.com/en/za/' },
      { code: 'tn', label: 'Tunisia', href: 'https://www.hoka.com/en/tn/' },
    ],
  },
  {
    id: 'asia-pacific',
    name: 'Asia Pacific',
    countries: [
      { code: 'au', label: 'Australia', href: 'https://au.hoka.com/' },
      { code: 'id', label: 'Indonesia', href: 'https://www.hoka.com/en/id/' },
      { code: 'nz', label: 'New Zealand', href: 'https://nz.hoka.com/' },
      { code: 'ph', label: 'Philippines', href: 'https://www.hoka.com/en/ph/' },
      { code: 'cn', label: '中国', href: 'https://www.hokaoneone.cn/' },
      { code: 'jp', label: '日本', href: 'https://www.hoka.com/jp/' },
    ],
  },
  {
    id: 'europe',
    name: 'Europe',
    countries: [
      { code: 'al', label: 'Albania', href: 'https://www.hoka.com/en/al/' },
      { code: 'ad', label: 'Andorra', href: 'https://www.hoka.com/en/ad/' },
      { code: 'be', label: 'België (Nederlands)', href: 'https://www.hoka.com/nl/be/' },
      { code: 'be', label: 'Belgique (Français)', href: 'https://www.hoka.com/nl/be/' },
      { code: 'ba', label: 'Bosnia & Herzegovina', href: 'https://www.hoka.com/en/ba/' },
      { code: 'bg', label: 'Bulgaria', href: 'https://www.hoka.com/en/bg/' },
      { code: 'hr', label: 'Croatia', href: 'https://www.hoka.com/en/hr/' },
      { code: 'cy', label: 'Cyprus', href: 'https://www.hoka.com/en/cy/' },
      { code: 'cz', label: 'Czechia', href: 'https://www.hoka.com/en/cz/' },
      { code: 'dk', label: 'Denmark', href: 'https://www.hoka.com/en/dk/' },
      { code: 'de', label: 'Deutschland', href: 'https://www.hoka.com/de/de/' },
      { code: 'es', label: 'España (Español)', href: 'https://www.hoka.com/es/es/' },
      { code: 'ee', label: 'Estonia', href: 'https://www.hoka.com/en/ee/' },
      { code: 'fi', label: 'Finland', href: 'https://www.hoka.com/en/fi/' },
      { code: 'fr', label: 'France', href: 'https://www.hoka.com/fr/fr/' },
      { code: 'gr', label: 'Greece', href: 'https://www.hoka.com/en/gr/' },
      { code: 'hu', label: 'Hungary', href: 'https://www.hoka.com/en/hu/' },
      { code: 'is', label: 'Iceland', href: 'https://www.hoka.com/en/is/' },
      { code: 'ie', label: 'Ireland', href: 'https://www.hoka.com/en/ie/' },
      { code: 'it', label: 'Italia (Italiano)', href: 'https://www.hoka.com/it/it/' },
      { code: 'it', label: 'Italy (English)', href: 'https://www.hoka.com/it/it/' },
      { code: 'je', label: 'Jersey', href: 'https://www.hoka.com/en/je/' },
      { code: 'kz', label: 'Kazakhstan', href: 'https://www.hoka.com/en/kz/' },
      { code: 'lv', label: 'Latvia', href: 'https://www.hoka.com/en/lv/' },
      { code: 'lt', label: 'Lithuania', href: 'https://www.hoka.com/en/lt/' },
      { code: 'lu', label: 'Luxembourg', href: 'https://www.hoka.com/en/lu/' },
      { code: 'mt', label: 'Malta', href: 'https://www.hoka.com/en/mt/' },
      { code: 'md', label: 'Moldova', href: 'https://www.hoka.com/en/md/' },
      { code: 'mc', label: 'Monaco', href: 'https://www.hoka.com/en/mc/' },
      { code: 'me', label: 'Montenegro', href: 'https://www.hoka.com/en/me/' },
      { code: 'nl', label: 'Nederland (Nederlands)', href: 'https://www.hoka.com/nl/nl/' },
      { code: 'nl', label: 'Netherlands (English)', href: 'https://www.hoka.com/nl/nl/' },
      { code: 'mk', label: 'North Macedonia', href: 'https://www.hoka.com/en/mk/' },
      { code: 'no', label: 'Norway', href: 'https://www.hoka.com/en/no/' },
      { code: 'at', label: 'Österreich', href: 'https://www.hoka.com/de/at/' },
      { code: 'pl', label: 'Poland', href: 'https://www.hoka.com/en/pl/' },
      { code: 'pt', label: 'Portugal', href: 'https://www.hoka.com/en/pt/' },
      { code: 'ro', label: 'Romania', href: 'https://www.hoka.com/en/ro/' },
      { code: 'rs', label: 'Serbia', href: 'https://www.hoka.com/en/rs/' },
      { code: 'sk', label: 'Slovakia', href: 'https://www.hoka.com/en/sk/' },
      { code: 'si', label: 'Slovenia', href: 'https://www.hoka.com/en/si/' },
      { code: 'es', label: 'Spain (English)', href: 'https://www.hoka.com/es/es/' },
      { code: 'se', label: 'Sweden', href: 'https://www.hoka.com/en/se/' },
      { code: 'ch', label: 'Switzerland', href: 'https://www.hoka.com/en/ch/' },
      { code: 'gb', label: 'United Kingdom', href: 'https://www.hoka.com/en/gb/' },
    ],
  },
  {
    id: 'middle-east',
    name: 'Middle East',
    countries: [
      { code: 'il', label: 'Israel', href: 'https://www.hoka.com/en/il/' },
      { code: 'tr', label: 'Türkiye', href: 'https://www.hoka.com/en/tr/' },
      { code: 'ae', label: 'United Arab Emirates', href: 'https://www.hoka.com/en/ae/' },
    ],
  },
  {
    id: 'north-america',
    name: 'North America',
    countries: [
      { code: 'ca', label: 'Canada (English)', href: 'https://www.hoka.com/en/ca/' },
      { code: 'ca', label: 'Canada (Français)', href: 'https://www.hoka.com/fr/ca/' },
      { code: 'us', label: 'United States', href: 'https://www.hoka.com/en/us/' },
    ],
  },
  {
    id: 'south-america',
    name: 'South America',
    countries: [
      { code: 'br', label: 'Brasil', href: 'https://www.hokabrasil.com.br/' },
      { code: 'cl', label: 'Chile', href: 'https://cl.hoka.com/' },
    ],
  },
];
