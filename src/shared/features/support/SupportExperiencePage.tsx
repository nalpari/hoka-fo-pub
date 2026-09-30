import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { css, cva } from 'styled-system/css';
import { Button } from '@/shared/components/atoms/Button/Button';
import { Disclosure } from '@/shared/components/molecules/Disclosure/Disclosure';
import { Pagination } from '@/shared/components/atoms/Pagination/Pagination';
import { Select } from '@/shared/components/atoms/Select/Select';
import { TextInput } from '@/shared/components/atoms/TextInput/TextInput';
import { PageHeader } from '@/shared/components/molecules/PageHeader/PageHeader';
import { SidebarNavigationLayout } from '@/shared/components/layouts/SidebarNavigationLayout/SidebarNavigationLayout';
import { supportNavigation } from '@/shared/features/support/support.navigation';

export type SupportExperienceKind =
  'inquiries' | 'inquiry-new' | 'after-sales' | 'member-benefits' | 'mileage';

const content = css({ maxW: '760px', '& h2': { fontSize: '20px' } });
const intro = css({ mb: '28px', color: 'var(--color-text-muted)', fontSize: '14px', lineHeight: '1.6' });
const panel = css({ borderTop: '2px solid #111', borderBottom: '1px solid var(--color-border-subtle)' });
const empty = css({
  display: 'grid',
  minH: '240px',
  placeItems: 'center',
  p: '32px',
  color: 'var(--color-text-muted)',
  textAlign: 'center',
});
const row = css({
  display: 'grid',
  gridTemplateColumns: 'auto 1fr auto',
  gap: '16px',
  alignItems: 'center',
  w: '100%',
  p: '18px 0',
  border: '0',
  borderBottom: '1px solid #e5e5e5',
  bg: 'transparent',
  textAlign: 'left',
  '.platform-mobile &': {
    gridTemplateColumns: '1fr auto',
    '& time': { gridColumn: '1 / -1', fontSize: '12px' },
  },
});
const status = cva({
  base: {
    width: 'max-content',
    px: '8px',
    py: '4px',
    borderRadius: '999px',
    bg: '#eee',
    fontSize: '11px',
    fontWeight: '700',
  },
  variants: { answered: { true: { bg: '#111', color: '#fff' }, false: { color: 'var(--color-text-muted)' } } },
});
const field = css({
  display: 'grid',
  gap: '8px',
  mb: '20px',
  '& label': { fontSize: '14px', fontWeight: '700' },
  '& textarea': {
    minH: '160px',
    w: '100%',
    resize: 'vertical',
    border: '1px solid #bbb',
    p: '12px',
    fontFamily: 'var(--font-family-base)',
  },
});
const error = css({ color: '#db1f2d', fontSize: '12px', fontWeight: '700' });
const actions = css({ display: 'flex', justifyContent: 'flex-end', gap: '8px', mt: '28px' });
const quickLinks = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '8px',
  mt: '40px',
  pt: '22px',
  borderTop: '1px solid var(--color-border-subtle)',
  '.platform-mobile &': { gridTemplateColumns: '1fr' },
  '& a': {
    p: '14px',
    border: '1px solid var(--color-border-subtle)',
    textAlign: 'center',
    fontSize: '13px',
    fontWeight: '700',
  },
});
const tabList = css({
  display: 'flex',
  overflowX: 'auto',
  borderBottom: '1px solid var(--color-border-subtle)',
  '& button': {
    flex: '0 0 auto',
    minH: '44px',
    border: '0',
    borderBottom: '2px solid transparent',
    bg: 'transparent',
    px: '14px',
  },
});
const activeTab = css({ borderBottomColor: '#111 !important', fontWeight: '800' });
const policyCard = css({
  display: 'grid',
  gridTemplateColumns: '92px 1fr',
  gap: '16px',
  p: '20px',
  mt: '16px',
  borderRadius: '8px',
  bg: '#f6f6f6',
  '& b': { display: 'grid', placeItems: 'center', minH: '72px', bg: '#fff', fontSize: '16px' },
  '& h3': { mb: '6px' },
  '& p': { m: '0', color: '#555', fontSize: '13px', lineHeight: '1.6' },
});
const tooltip = css({
  mt: '8px',
  p: '14px',
  borderRadius: '6px',
  bg: '#111',
  color: '#fff',
  fontSize: '12px',
  lineHeight: '1.5',
});

const inquiries = [
  {
    id: '1',
    title: '주문 상품의 배송 현황을 확인하고 싶어요.',
    date: '2026.09.16',
    answered: true,
  },
  { id: '2', title: '사이즈 교환 가능 여부 문의', date: '2026.09.13', answered: false },
  { id: '3', title: '쿠폰 적용 대상 확인', date: '2026.09.10', answered: true },
  { id: '4', title: '재입고 알림을 다시 받고 싶어요.', date: '2026.09.07', answered: true },
  { id: '5', title: '주문 취소 후 환불 일정 문의', date: '2026.09.03', answered: false },
  { id: '6', title: '상품 소재 관련 문의', date: '2026.08.30', answered: true },
];

function SupportFrame({ activePath, children }: { activePath: string; children: React.ReactNode }) {
  return (
    <SidebarNavigationLayout
      activePath={activePath}
      groups={supportNavigation}
      title="SUPPORT"
      titleTo="/support"
    >
      <section className={content}>{children}</section>
    </SidebarNavigationLayout>
  );
}

function QuickLinks() {
  return (
    <nav className={quickLinks} aria-label="고객지원 바로가기">
      <Link to="/support">고객센터</Link>
      <Link to="/support/faq">FAQs</Link>
      <Link to="/support/inquiries">1:1 문의하기</Link>
    </nav>
  );
}

function SupportNotice({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <Disclosure title="유의 사항" open={open} onOpenChange={setOpen}>
      {children}
    </Disclosure>
  );
}

function InquiryPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const pageItems = inquiries.slice((page - 1) * 5, page * 5);
  const selectedItem = inquiries.find((item) => item.id === selected);
  return (
    <SupportFrame activePath="/support/inquiries">
      <PageHeader title="1:1 문의하기" />
      <p className={intro}>궁금한 사항을 남겨 주시면 확인 후 답변해 드립니다.</p>
      <div className={actions}>
        <Link to="/support/inquiries/new">
          <Button variant="primary">문의하기</Button>
        </Link>
      </div>
      <div className={panel}>
        {pageItems.map((item) => (
          <div key={item.id}>
            <Button
              className={row}
              onClick={() => setSelected(selected === item.id ? null : item.id)}
            >
              <span className={status({ answered: item.answered })}>
                {item.answered ? '답변완료' : '접수완료'}
              </span>
              <strong>{item.title}</strong>
              <time>{item.date}</time>
            </Button>
            {selectedItem?.id === item.id ? (
              <article
                className={css({
                  p: '20px',
                  bg: '#fafafa',
                  borderBottom: '1px solid var(--color-border-subtle)',
                  fontSize: '13px',
                  lineHeight: '1.7',
                })}
              >
                <b>Q</b>
                <p>문의하신 내용입니다. 주문·상품 정보 확인 후 답변을 안내해 드립니다.</p>
                {item.answered ? (
                  <>
                    <b>A</b>
                    <p>안녕하세요. 고객센터 답변입니다. 요청하신 사항을 확인하여 안내드립니다.</p>
                  </>
                ) : (
                  <p className={error}>답변을 준비 중입니다.</p>
                )}
              </article>
            ) : null}
          </div>
        ))}
      </div>
      <Pagination page={page} total={2} onChange={setPage} />
      <SupportNotice>
        <p>
          상품 관련 문의는 상품 상세 페이지의 문의 기능을 이용해 주세요. 등록된 문의는 수정 및
          삭제할 수 없습니다.
        </p>
      </SupportNotice>
      <QuickLinks />
    </SupportFrame>
  );
}

function InquiryNewPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const invalid = submitted && (!title.trim() || !body.trim());
  const submit = () => {
    setSubmitted(true);
    if (title.trim() && body.trim()) navigate('/support/inquiries');
  };
  return (
    <SupportFrame activePath="/support/inquiries">
      <PageHeader title="1:1 문의 등록" />
      <div className={field}>
        <label htmlFor="inquiry-type">문의 유형</label>
        <Select id="inquiry-type">
          <option>주문 / 배송</option>
          <option>교환 / 반품</option>
          <option>상품</option>
          <option>회원</option>
        </Select>
      </div>
      <div className={field}>
        <label htmlFor="inquiry-title">제목</label>
        <TextInput
          id="inquiry-title"
          invalid={invalid && !title.trim()}
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="제목을 입력해 주세요"
        />
        {invalid && !title.trim() ? <span className={error}>제목을 입력해 주세요.</span> : null}
      </div>
      <div className={field}>
        <label htmlFor="inquiry-body">내용</label>
        <textarea
          id="inquiry-body"
          aria-invalid={invalid && !body.trim()}
          value={body}
          maxLength={1000}
          onChange={(event) => setBody(event.target.value)}
          placeholder="문의 내용을 입력해 주세요"
        />
        {invalid && !body.trim() ? <span className={error}>문의 내용을 입력해 주세요.</span> : null}
        <small>{body.length} / 1,000</small>
      </div>
      <div className={field}>
        <label htmlFor="inquiry-files">첨부 파일 (선택)</label>
        <TextInput
          id="inquiry-files"
          type="file"
          multiple
          accept=".jpg,.jpeg,.png,.mp4"
          onChange={(event) => setFiles(Array.from(event.target.files ?? []).slice(0, 5))}
        />
        {files.length ? (
          <small>{files.map((file) => file.name).join(', ')}</small>
        ) : (
          <small>JPG, PNG, MP4 파일을 최대 5개까지 첨부할 수 있습니다.</small>
        )}
      </div>
      <div className={actions}>
        <Button
          onClick={() =>
            confirm('작성 중인 문의를 취소하시겠습니까?') && navigate('/support/inquiries')
          }
        >
          취소
        </Button>
        <Button variant="primary" onClick={submit}>
          등록
        </Button>
      </div>
    </SupportFrame>
  );
}

function AfterSalesPage() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const valid = name.trim().length > 1 && /^01[0-9]{8,9}$/.test(phone.replace(/-/g, ''));
  return (
    <SupportFrame activePath="/support/after-sales">
      <PageHeader title="A/S 처리현황" />
      <p className={intro}>
        이름과 휴대폰 번호를 입력하면 나의 A/S 처리 현황을 확인할 수 있습니다.
      </p>
      <div className={field}>
        <label htmlFor="as-name">이름</label>
        <TextInput
          id="as-name"
          invalid={submitted && name.trim().length < 2}
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="이름을 입력해 주세요"
        />
        {submitted && name.trim().length < 2 ? (
          <span className={error}>이름을 입력해 주세요.</span>
        ) : null}
      </div>
      <div className={field}>
        <label htmlFor="as-phone">휴대폰 번호</label>
        <TextInput
          id="as-phone"
          invalid={submitted && !/^01[0-9]{8,9}$/.test(phone.replace(/-/g, ''))}
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          placeholder="01012341234"
        />
        {submitted && !/^01[0-9]{8,9}$/.test(phone.replace(/-/g, '')) ? (
          <span className={error}>올바른 휴대폰 번호를 입력해 주세요.</span>
        ) : null}
      </div>
      <Button fullWidth variant="primary" onClick={() => setSubmitted(true)}>
        검색
      </Button>
      {submitted ? (
        valid ? (
          <div className={panel}>
            {[
              '접수완료 · Clifton 9 · 수선',
              '처리중 · Bondi 9 · 점검',
              '처리완료 · Mach X · 교환',
            ].map((item, index) => (
              <article className={row} key={item}>
                <span className={status({ answered: index === 2 })}>
                  {index === 2 ? '처리완료' : '처리중'}
                </span>
                <strong>{item}</strong>
                <time>2026.09.{12 - index}</time>
              </article>
            ))}
          </div>
        ) : (
          <div className={empty}>조회된 A/S 내역이 없습니다.</div>
        )
      ) : null}
      <h2 className={css({ mt: '36px' })}>A/S 처리 절차</h2>
      <ol
        className={css({
          display: 'grid',
          gap: '12px',
          mt: '16px',
          color: '#555',
          fontSize: '14px',
        })}
      >
        <li>전국 매장에서 A/S 접수 및 상품 전달</li>
        <li>A/S Center에서 상품 확인 및 판정</li>
        <li>수선 후 접수 매장으로 발송</li>
        <li>매장 방문하여 상품 수령</li>
      </ol>
      <QuickLinks />
    </SupportFrame>
  );
}

function PolicyPage({ kind }: { kind: 'member-benefits' | 'mileage' }) {
  const [active, setActive] = useState(kind === 'mileage' ? '마일리지 적립/사용' : '공통 혜택');
  const [tip, setTip] = useState<string | null>(null);
  const mileageTabs = ['마일리지 적립/사용', '온라인 통합 마일리지', '마일리지 소멸', '기타 안내'];
  const tiers = [
    ['VIP', '구매금액 100만원 이상 & 5회 이상 구매', '분기별 15% 할인 쿠폰 4장'],
    ['MANIA', '구매금액 30만원 이상 & 2회 이상 구매', '분기별 10% 할인 쿠폰 4장'],
    ['FAMILY', '회원가입 시 기본 설정 등급', '분기별 5% 할인 쿠폰 4장'],
  ];
  return (
    <SupportFrame activePath={kind === 'mileage' ? '/support/mileage' : '/support/member-benefits'}>
      <PageHeader title={kind === 'mileage' ? '통합 마일리지 안내' : '온라인 회원 등급 안내'} />
      {kind === 'mileage' ? (
        <>
          <nav className={tabList}>
            {mileageTabs.map((item) => (
              <Button
                key={item}
                className={active === item ? activeTab : ''}
                onClick={() => setActive(item)}
              >
                {item}
              </Button>
            ))}
          </nav>
          <article className={css({ py: '28px', minH: '280px', lineHeight: '1.8' })}>
            <h2>{active}</h2>
            <p>
              온라인과 오프라인에서 적립 및 사용할 수 있는 통합 마일리지 정책을 안내합니다. 정책별
              적용 기준과 소멸 조건은 주문 시점에 따라 달라질 수 있습니다.
            </p>
          </article>
        </>
      ) : (
        <>
          <h2 className={css({ mt: '30px' })}>공통 혜택</h2>
          <div
            className={css({
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '12px',
              mt: '14px',
              '.platform-mobile &': { gridTemplateColumns: '1fr' },
            })}
          >
            {[
              '신규 가입 5천원 할인쿠폰',
              '첫 구매 감사 1만원 할인쿠폰',
              '기념일 축하 1만원 할인쿠폰',
              'MY HOKA 이벤트쿠폰',
            ].map((item) => (
              <Button
                key={item}
                className={css({
                  minH: '110px',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  p: '18px',
                  textAlign: 'left',
                })}
                onClick={() => setTip(tip === item ? null : item)}
              >
                <b>{item}</b>
                <small>자세히 보기 ⓘ</small>
                {tip === item ? (
                  <span className={tooltip}>
                    쿠폰은 발급 후 한 달 동안 사용할 수 있으며, 적용 조건은 쿠폰 상세에서 확인할 수
                    있습니다.
                  </span>
                ) : null}
              </Button>
            ))}
          </div>
          <h2 className={css({ mt: '38px' })}>온라인 회원등급 및 혜택 안내</h2>
          {tiers.map(([tier, criteria, benefit]) => (
            <article className={policyCard} key={tier}>
              <b>{tier}</b>
              <div>
                <h3>{criteria}</h3>
                <p>
                  {benefit}
                  <br />
                  온라인과 오프라인 혜택은 중복 적용되지 않을 수 있습니다.
                </p>
              </div>
            </article>
          ))}
        </>
      )}
      <SupportNotice>
        <p>
          등급은 최근 구매 실적을 기준으로 산정되며, 쿠폰·마일리지 정책은 운영 상황에 따라 변경될 수
          있습니다.
        </p>
      </SupportNotice>
    </SupportFrame>
  );
}

export function SupportExperiencePage({ kind }: { kind: SupportExperienceKind }) {
  if (kind === 'inquiries') return <InquiryPage />;
  if (kind === 'inquiry-new') return <InquiryNewPage />;
  if (kind === 'after-sales') return <AfterSalesPage />;
  return <PolicyPage kind={kind} />;
}
