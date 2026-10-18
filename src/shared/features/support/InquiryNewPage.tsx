'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Grid, HStack, Stack, styled } from 'styled-system/jsx';
import { Button } from '@/shared/components/atoms/Button/Button';
import { Dropdown } from '@/shared/components/atoms/Dropdown/Dropdown';
import { TextInput } from '@/shared/components/atoms/TextInput/TextInput';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { CustomerCenterLayout } from '@/shared/components/layouts/CustomerCenterLayout/CustomerCenterLayout';
import { InquiryCautions } from '@/shared/features/support/InquiryCautions';
import { supportNavigation } from '@/shared/features/support/support.navigation';

export function InquiryNewPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const invalid = submitted && (!title.trim() || !body.trim());

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    if (title.trim() && body.trim()) router.push('/support/inquiries');
  };

  return (
    <CustomerCenterLayout
      activePath="/support/inquiries"
      breadcrumbItems={[
        { label: 'Home', href: '/' },
        { label: '고객센터', href: '/support' },
        { label: '1:1 문의하기', href: '/support/inquiries' },
        { label: '1:1 문의등록' },
      ]}
      groups={supportNavigation}
    >
      <Box mb="6">
        <Typography as="h2" web="heading6" mo="heading7">
          1:1 문의등록
        </Typography>
      </Box>
      <form onSubmit={submit}>
        <Stack gap="6">
          <Box p="4" bg="black.10">
            <Grid gridTemplateColumns="max-content 1fr" gap="2">
              <Typography web="body4" mo="body4" tone="tertiary">
                이름
              </Typography>
              <Typography web="body4" mo="body4">
                홍길동
              </Typography>
              <Typography web="body4" mo="body4" tone="tertiary">
                휴대폰 번호
              </Typography>
              <Typography web="body4" mo="body4">
                010-1234-1234
              </Typography>
              <Typography web="body4" mo="body4" tone="tertiary">
                E-mail
              </Typography>
              <Typography web="body4" mo="body4">
                hong123@naver.com
              </Typography>
            </Grid>
          </Box>
          <Stack gap="4">
            <Typography web="heading9" mo="heading9">
              문의 분류
            </Typography>
            <Grid columns={2} gap="2">
              <Dropdown
                ariaLabel="문의 유형"
                label="문의 유형"
                required
                name="inquiry-category"
                defaultValue="반품"
                options={[
                  { value: '반품', label: '반품' },
                  { value: '주문/배송', label: '주문/배송' },
                  { value: '상품', label: '상품' },
                  { value: '회원', label: '회원' },
                ]}
              />
              <Dropdown
                ariaLabel="상세 유형"
                label="상세 유형"
                required
                name="inquiry-detail-category"
                defaultValue="신청/취소 문의"
                options={[
                  { value: '신청/취소 문의', label: '신청/취소 문의' },
                  { value: '진행 상황 문의', label: '진행 상황 문의' },
                  { value: '기타 문의', label: '기타 문의' },
                ]}
              />
            </Grid>
          </Stack>
          <Stack gap="2">
            <Typography as="label" htmlFor="inquiry-title" web="heading9" mo="heading9">
              제목
            </Typography>
            <TextInput
              id="inquiry-title"
              value={title}
              maxLength={50}
              invalid={invalid && !title.trim()}
              aria-describedby={invalid && !title.trim() ? 'inquiry-title-error' : undefined}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="제목을 입력해주세요. (50자 이하)"
              style={{ minHeight: '60px' }}
            />
            {invalid && !title.trim() ? (
              <Typography id="inquiry-title-error" role="alert" web="body5" mo="body5" tone="error">
                제목을 입력해 주세요.
              </Typography>
            ) : null}
          </Stack>
          <Stack gap="2">
            <Typography as="label" htmlFor="inquiry-body" web="heading9" mo="heading9">
              내용
            </Typography>
            <TextInput
              multiline
              id="inquiry-body"
              value={body}
              maxLength={1000}
              invalid={invalid && !body.trim()}
              aria-describedby={invalid && !body.trim() ? 'inquiry-body-error' : undefined}
              onChange={(event) => setBody(event.target.value)}
              placeholder="내용을 입력해주세요."
              style={{ minHeight: '174px', paddingTop: '16px' }}
            />
            <Box textAlign="right">
              <Typography web="body5" mo="body5" tone="tertiary">
                {body.length} / 1,000
              </Typography>
            </Box>
            {invalid && !body.trim() ? (
              <Typography id="inquiry-body-error" role="alert" web="body5" mo="body5" tone="error">
                내용을 입력해 주세요.
              </Typography>
            ) : null}
          </Stack>
          <Stack gap="4">
            <HStack justifyContent="space-between">
              <Typography as="label" htmlFor="inquiry-files" web="heading9" mo="heading9">
                파일 첨부
              </Typography>
              <styled.label htmlFor="inquiry-files" cursor="pointer" textDecoration="underline">
                <Typography web="body4" mo="body4">
                  찾아보기
                </Typography>
              </styled.label>
            </HStack>
            <input
              id="inquiry-files"
              type="file"
              multiple
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={(event) => setFiles(Array.from(event.target.files ?? []).slice(0, 5))}
              hidden
            />
            {files.length ? (
              <Typography web="body4" mo="body4">
                {files.map((file) => file.name).join(', ')}
              </Typography>
            ) : null}
            <Typography as="p" web="body4" mo="body5" tone="tertiary">
              JPG, PNG, PDF 파일은 최대 5개, 파일당 10MB까지 첨부할 수 있습니다.
            </Typography>
          </Stack>
          <InquiryCautions />
          <HStack gap="2" justifyContent="center">
            <Box flex="1" maxW="246px">
              <Button
                fullWidth
                size="tall"
                onClick={() =>
                  confirm('작성 중인 문의를 취소하시겠습니까?') && router.push('/support/inquiries')
                }
              >
                취소
              </Button>
            </Box>
            <Box flex="1" maxW="246px">
              <Button fullWidth size="tall" type="submit" variant="primary">
                문의 등록
              </Button>
            </Box>
          </HStack>
        </Stack>
      </form>
    </CustomerCenterLayout>
  );
}
