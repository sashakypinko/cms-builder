import { FC, ReactElement } from 'react';
import Section from '../section';
import { useTranslation } from 'react-i18next';
import ImageField from '../../../../../../../../common/ui/image-field';
import { useFormikContext } from 'formik';
import { IPage, LandingPageData } from '../../../../../../../../services/api/page/dto/page.dto';

const MainSection: FC = (): ReactElement | null => {
  const { t } = useTranslation();
  const { isSubmitting, values, setFieldValue } = useFormikContext<IPage>();

  const { main } = values.data as LandingPageData;

  return (
    <Section title={t('pages.section.main')}>
      <ImageField
        image={main.image}
        onChange={(file) => setFieldValue('data.main.image', file)}
        loading={isSubmitting}
      />
    </Section>
  );
};

export default MainSection;
