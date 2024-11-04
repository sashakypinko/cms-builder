import { type ReactElement } from 'react';
import { Form, useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';
import { CircularProgress, SelectChangeEvent, styled } from '@mui/material';
import Button from '../../../../../common/ui/button';
import PageNameEnum from '../../../../../enums/page-name.enum';
import { AboutPageData, IPage, LandingPageData } from '../../../../../services/api/page/dto/page.dto';
import PageData from './page-data';
import SelectInput from '../../../../../common/ui/select-input';
import SelectField from '../../../../../common/ui/select-field';
import { useSelector } from 'react-redux';
import { selectLanguages } from '../../../../../store/selectors';

const Actions = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'end',
}));

interface Props {
  initialDataValues: { [key in PageNameEnum]: LandingPageData | AboutPageData };
  onClose: () => void;
}

const PageFormContent = ({ initialDataValues, onClose }: Props): ReactElement => {
  const { languages } = useSelector(selectLanguages);
  const { isSubmitting, values, setFieldValue } = useFormikContext<IPage>();
  const { t } = useTranslation();

  const handleNameChange = (e: SelectChangeEvent<PageNameEnum>) => {
    const newValue = e.target.value as PageNameEnum;
    setFieldValue('name', newValue);
    setFieldValue('data', initialDataValues[newValue]);
  };

  return (
    <Form>
      <SelectInput
        label={t('name')}
        value={values.name}
        options={Object.values(PageNameEnum).map((value) => ({
          value,
          label: t(`pages.${value}`),
        }))}
        onChange={handleNameChange}
        fullWidth
      />
      <SelectField
        label={t('language')}
        name='languageId'
        options={languages.map((lang) => ({
          value: lang._id,
          label: t(`languages.${lang.code}`),
        }))}
        fullWidth
      />
      {values.name && <PageData pageName={values.name} />}
      <Actions>
        <Button disabled={isSubmitting} onClick={onClose}>
          {t('cancel')}
        </Button>
        <Button
          type='submit'
          endIcon={isSubmitting ? <CircularProgress size={20} color='inherit' /> : null}
          disabled={isSubmitting}
        >
          {t('save')}
        </Button>
      </Actions>
    </Form>
  );
};

export default PageFormContent;
