import { Grid } from 'styled-system/jsx';
import { SizeGuideMeasurementImage } from './SizeGuideMeasurementImage';
import { SizeGuideMeasurementInstructions } from './SizeGuideMeasurementInstructions';
import type { Gender, GuideCategory } from './size-guide.data';

export function SizeGuideMeasurements({
  category,
  gender,
}: {
  category: GuideCategory;
  gender: Gender;
}) {
  return (
    <Grid
      gridTemplateColumns={{ base: '280px minmax(0, 1fr)', _mobile: '1fr' }}
      gap="6"
      alignItems="start"
    >
      <SizeGuideMeasurementImage category={category} gender={gender} />
      <SizeGuideMeasurementInstructions category={category} />
    </Grid>
  );
}
