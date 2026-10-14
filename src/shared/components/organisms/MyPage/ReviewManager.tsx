import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { useState } from 'react';
import { SegmentedControl } from '@/shared/components/atoms/SegmentedControl/SegmentedControl';
import { css } from 'styled-system/css';
import { RatingInput, type RatingValue } from '@/shared/components/atoms/RatingInput/RatingInput';
import { Button } from '@/shared/components/atoms/Button/Button';
import { Pagination } from '@/shared/components/atoms/Pagination/Pagination';
import { Select } from '@/shared/components/atoms/Select/Select';
import { TextInput } from '@/shared/components/atoms/TextInput/TextInput';

const tabs = css({
  display: 'flex',
  borderBottom: '1px solid var(--color-border-subtle)',
  '& button': {
    minW: '150px',
    border: '0',
    borderBottom: '2px solid transparent',
    bg: 'transparent',
  },
});

const active = css({
  borderBottomColor: 'var(--color-black-100) !important',
  fontWeight: 'var(--font-weights-extrabold)',
});

const list = css({ borderTop: '2px solid var(--color-black-100)', mt: '18px' });

const item = css({
  display: 'grid',
  gridTemplateColumns: '80px 1fr auto',
  gap: '4',
  alignItems: 'center',
  p: '4 0',
  borderBottom: '1px solid var(--color-border-subtle)',
  '.platform-mobile &': { gridTemplateColumns: '64px 1fr', '& button': { gridColumn: '1 / -1' } },
});

const image = css({
  display: 'grid',
  width: '72px',
  aspectRatio: '1',
  placeItems: 'center',
  bg: 'var(--color-black-20)',
  color: 'var(--color-text-tertiary)',
});

const form = css({
  mt: '22px',
  p: '22px',
  border: '1px solid var(--color-border-subtle)',
  '& textarea': {
    w: '100%',
    minH: '140px',
    mt: '2',
    p: '3',
    border: '1px solid var(--color-border-tertiary)',
    fontFamily: 'var(--font-family-base)',
  },
});

const error = css({
  display: 'block',
  mt: '1.5',
});

const purchases = Array.from({ length: 12 }, (_, index) => ({
  id: String(index + 1),
  date: `2026.09.${String(18 - index).padStart(2, '0')}`,
  product: index % 2 ? 'Mach 6' : 'Clifton 10',
  option: 'Black / 250',
}));

/** Purchase review list and form with shared validation, attachment, and pagination patterns. */

export function ReviewManager() {
  const [tab, setTab] = useState<'ready' | 'written'>('ready');
  const [page, setPage] = useState(1);
  const [editing, setEditing] = useState<string | null>(null);
  const [rating, setRating] = useState<RatingValue>(0);
  const [body, setBody] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const visible = tab === 'ready' ? purchases : purchases.slice(0, 3);
  const pageItems = visible.slice((page - 1) * 10, page * 10);
  const invalid = submitted && (!rating || !body.trim());
  const close = () => {
    setEditing(null);
    setRating(0);
    setBody('');
    setFiles([]);
    setSubmitted(false);
  };
  return (
    <section aria-label="상품리뷰 관리">
      <SegmentedControl
        ariaLabel="리뷰 상태"
        className={tabs}
        onValueChange={(nextTab) => {
          setTab(nextTab);
          setPage(1);
        }}
        value={tab}
        unstyled
        itemClassName={(_, selected) => (selected ? active : '')}
        options={[
          { value: 'ready', label: '작성 가능한 리뷰' },
          { value: 'written', label: '내가 작성한 리뷰' },
        ]}
      />
      <div
        className={css({
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mt: '18px',
        })}
      >
        <Select aria-label="리뷰 정렬" className={css({ width: '132px' })}>
          <option>최근 구매순</option>
          <option>작성일순</option>
        </Select>
        <strong>{visible.length}건</strong>
      </div>
      {!visible.length ? (
        <p className={css({ py: '20', textAlign: 'center', color: 'var(--color-text-tertiary)' })}>
          작성할 리뷰가 없습니다.
        </p>
      ) : (
        <div className={list}>
          {pageItems.map((review) => (
            <article className={item} key={review.id}>
              <div className={image}>IMG</div>
              <div>
                <small>{review.date} 구매</small>
                <strong className={css({ display: 'block', mt: '1' })}>{review.product}</strong>
                <Typography variant="body4" tone="tertiary">
                  옵션: {review.option}
                </Typography>
                {tab === 'written' ? (
                  <Typography
                    as="p"
                    variant="body4"
                    className={css({
                      m: '6px 0 0',
                    })}
                  >
                    ★★★★★ 편안하고 만족스럽습니다.
                  </Typography>
                ) : null}
              </div>
              <Button variant="primary" size="short" onClick={() => setEditing(review.id)}>
                {tab === 'ready' ? '리뷰 작성하기' : '수정하기'}
              </Button>
            </article>
          ))}
        </div>
      )}
      {visible.length > 10 ? (
        <Pagination page={page} total={Math.ceil(visible.length / 10)} onChange={setPage} />
      ) : null}
      {editing ? (
        <section className={form} aria-label="리뷰 작성">
          <h2>상품리뷰 작성</h2>
          <p>실제 착용하신 경험을 들려주세요.</p>
          <div>
            <b>
              상품은 만족스러우셨나요?{' '}
              <span className={css({ color: 'var(--color-red-100)' })}>*</span>
            </b>
            <RatingInput ariaLabel="상품 만족도" value={rating} onValueChange={setRating} />
            {invalid && !rating ? (
              <Typography variant="body5" weight="bold" tone="error" className={error}>
                별점을 선택해 주세요.
              </Typography>
            ) : null}
          </div>
          <div className={css({ mt: '18px' })}>
            <b>
              리뷰내용 <span className={css({ color: 'var(--color-red-100)' })}>*</span>
            </b>
            <textarea
              aria-label="리뷰내용"
              maxLength={1000}
              value={body}
              onChange={(event) => setBody(event.target.value)}
              placeholder="내용을 입력해 주세요."
            />
            {invalid && !body.trim() ? (
              <Typography variant="body5" weight="bold" tone="error" className={error}>
                리뷰 내용을 입력해 주세요.
              </Typography>
            ) : null}
            <small className={css({ display: 'block', textAlign: 'right' })}>
              {body.length} / 1,000
            </small>
          </div>
          <div className={css({ mt: '18px' })}>
            <b>사진/영상 첨부 (선택)</b>
            <TextInput
              aria-label="사진/영상 첨부"
              className={css({ mt: '2' })}
              type="file"
              multiple
              accept=".jpg,.jpeg,.png,.mp4"
              onChange={(event) =>
                setFiles(
                  Array.from(event.target.files ?? [])
                    .filter((file) => file.size <= 10 * 1024 * 1024)
                    .slice(0, 5),
                )
              }
            />
            <small>
              {files.length
                ? files.map((file) => file.name).join(', ')
                : 'JPG, PNG, MP4 파일을 최대 5개, 파일당 10MB까지 첨부할 수 있습니다.'}
            </small>
          </div>
          <div
            className={css({
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '2',
              mt: '22px',
            })}
          >
            <Button onClick={() => confirm('리뷰 작성을 취소하시겠습니까?') && close()}>
              취소
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                setSubmitted(true);
                if (rating && body.trim()) close();
              }}
            >
              확인
            </Button>
          </div>
        </section>
      ) : null}
    </section>
  );
}
