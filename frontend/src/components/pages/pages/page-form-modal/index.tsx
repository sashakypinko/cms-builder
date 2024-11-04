import { type ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { type TFunction } from 'i18next';
import * as Yup from 'yup';
import { Formik, type FormikHelpers } from 'formik';
import PageFormContent from './page-form-content';
import Modal from '../../../../common/ui/modal';
import { AboutPageData, IPage, LandingPageData } from '../../../../services/api/page/dto/page.dto';
import PageNameEnum from '../../../../enums/page-name.enum';

const initialValues: IPage = {
  name: null,
  languageId: '',
  data: null,
};

const initialDataValues:  { [key in PageNameEnum]: LandingPageData | AboutPageData } = {
  [PageNameEnum.ABOUT]: {
    text: '',
  },
  [PageNameEnum.LANDING]: {
    common: {
      bank: '',
      address: '',
      contact: '',
      links: [],
    },
    main: {
      image: null,
    },
    about: {
      display: true,
      title: '',
      items: [],
    },
    verse: {
      display: true,
    },
    branches: {
      display: true,
      title: '',
      items: [],
    },
    partners: {
      display: true,
      title: '',
      items: [],
    },
    location: {
      display: true,
      title: '',
      schedule: [],
    },
  },
};

const validationSchema = (t: TFunction) =>
  Yup.object().shape({
    name: Yup.string().required(() => t('validation.required')),
    languageId: Yup.string().required(() => t('validation.required')),
  });

interface Props {
  open: boolean;
  page: IPage | null;
  handleSave: (page: IPage, { resetForm, setSubmitting, setErrors }: FormikHelpers<IPage>) => void;
  handleClose: () => void;
}

const Index = ({ open, page, handleClose, handleSave }: Props): ReactElement => {
  const { t } = useTranslation();

  return (
    <Modal
      sx={{ minWidth: 600 }}
      title={t(page != null ? 'pages.update.title' : 'pages.create.title')}
      open={open}
      onClose={handleClose}
    >
      <Formik
        initialValues={page || initialValues}
        onSubmit={handleSave}
        validationSchema={validationSchema(t)}
        validateOnBlur
        enableReinitialize
      >
        <PageFormContent
          initialDataValues={initialDataValues}
          onClose={handleClose}
        />
      </Formik>
    </Modal>
  );
};

export default Index;
