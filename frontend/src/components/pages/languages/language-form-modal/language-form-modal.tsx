import { type ReactElement } from 'react';
import Modal from '../../../../common/ui/modal';
import { useTranslation } from 'react-i18next';
import { type ILanguage } from '../../../../services/api/language/dto/language.dto';
import { type TFunction } from 'i18next';
import * as Yup from 'yup';
import { Formik, type FormikHelpers } from 'formik';
import LanguageFormContent from './language-form-content';

const languageInitialValues: ILanguage = {
  code: '',
  isActive: false,
  translations: [],
};

const validationSchema = (t: TFunction) =>
  Yup.object().shape({
    code: Yup.string().required(() => t('validation.required')),
  });

interface Props {
  open: boolean;
  language: ILanguage | null;
  handleSave: (language: ILanguage, { resetForm, setSubmitting, setErrors }: FormikHelpers<ILanguage>) => void;
  handleClose: () => void;
}

const LanguageFormModal = ({ open, language, handleClose, handleSave }: Props): ReactElement => {
  const { t } = useTranslation();

  return (
    <Modal
      title={t(language != null ? 'languages.update.title' : 'languages.create.title')}
      open={open}
      onClose={handleClose}
    >
      <Formik
        initialValues={language || languageInitialValues}
        onSubmit={handleSave}
        validationSchema={validationSchema(t)}
        validateOnBlur
        enableReinitialize
      >
        <LanguageFormContent onClose={handleClose} />
      </Formik>
    </Modal>
  );
};

export default LanguageFormModal;
