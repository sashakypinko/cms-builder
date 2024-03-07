import { type ReactElement } from 'react';
import Modal from '../../../../common/ui/modal';
import { useTranslation } from 'react-i18next';
import { type TFunction } from 'i18next';
import * as Yup from 'yup';
import { Formik, FormikHelpers } from 'formik'
import TranslationFormContent from './translation-form-content';
import { ParsedTranslation } from '../../../../store/utils/prepare-languages-request.util'

interface Props {
  open: boolean;
  handleSave: (translation: ParsedTranslation, {
    resetForm,
    setSubmitting
  }: FormikHelpers<ParsedTranslation>) => void;
  handleClose: () => void;
}

const TranslationFormModal = ({
  open,
  handleClose,
  handleSave
}: Props): ReactElement => {
  const { t } = useTranslation()

  const translationInitialValues: ParsedTranslation = {
    key: '',
    value: '',
  };

  const validationSchema = (t: TFunction) =>
    Yup.object().shape({
      key: Yup.string().required(() => t('validation.required')),
      value: Yup.string().required(() => t('validation.required')),
    });

  return (
    <Modal title={t('translations.create.title')} open={open} onClose={handleClose}>
      <Formik
        initialValues={translationInitialValues}
        onSubmit={handleSave}
        validationSchema={validationSchema(t)}
        validateOnBlur
      >
        <TranslationFormContent onClose={handleClose} />
      </Formik>
    </Modal>
  );
};

export default TranslationFormModal;
