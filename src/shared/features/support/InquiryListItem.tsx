import { Box } from 'styled-system/jsx';
import { Accordion } from '@/shared/components/atoms/Accordion/Accordion';
import { InquiryQuestion } from './InquiryQuestion';
import { InquiryAnswer } from './InquiryAnswer';
import { InquiryReadAttachments } from './InquiryReadAttachments';
import type { InquiryAttachment } from './InquiryAttachmentPreview';

type Props = {
  item: { id: string; title: string; answered: boolean };
  attachments?: readonly InquiryAttachment[];
};

export function InquiryListItem({ item, attachments = [] }: Props) {
  const question = <InquiryQuestion item={item} />;
  return (
    <Box py="4" borderBottom="1px solid" borderColor="black.20">
      {item.answered ? (
        <Accordion
          defaultValue={[item.id]}
          multiple={false}
          indicator={null}
          items={[
            {
              value: item.id,
              title: question,
              content: (
                <>
                  <InquiryReadAttachments attachments={attachments} />
                  <InquiryAnswer />
                </>
              ),
            },
          ]}
        />
      ) : (
        <>
          {question}
          <InquiryReadAttachments attachments={attachments} />
        </>
      )}
    </Box>
  );
}
