import { Box } from 'styled-system/jsx';
import { Accordion } from '@/shared/components/atoms/Accordion/Accordion';
import { InquiryQuestion } from './InquiryQuestion';
import { InquiryAnswer } from './InquiryAnswer';

type Props = { item: { id: string; title: string; answered: boolean } };

export function InquiryListItem({ item }: Props) {
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
              content: <InquiryAnswer />,
            },
          ]}
        />
      ) : (
        question
      )}
    </Box>
  );
}
