import { FC, ReactElement } from 'react';
import TextField from '../../../../../../../common/ui/text-field';
import { useTranslation } from 'react-i18next';

const About: FC = (): ReactElement => {
  const { t } = useTranslation();

  return (
    <TextField sx={{ mt: 1 }} label={t('text')} name="data.text" fullWidth />
  );
};

export default About;
