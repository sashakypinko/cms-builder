import { FC, ReactElement } from 'react';
import Section from '../section';
import { useTranslation } from 'react-i18next';
import { useFormikContext } from 'formik';
import { IPage, LandingPageData } from '../../../../../../../../services/api/page/dto/page.dto';

const VerseSection: FC = (): ReactElement | null => {
  const { t } = useTranslation();
  const { values, setFieldValue } = useFormikContext<IPage>();

  const { verse } = values.data as LandingPageData;

  return (
    <Section
      title={t('pages.section.verse')}
      display={verse.display}
      onDisplayChange={(value) => setFieldValue('data.verse.display', value)}
    />
  );
};

export default VerseSection;
