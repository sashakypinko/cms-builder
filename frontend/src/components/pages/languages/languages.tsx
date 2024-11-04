import { type ReactElement, useMemo, useState } from 'react';
import { Chip, Container, Switch } from '@mui/material';
import Table from '../../../common/ui/table';
import { useTranslation } from 'react-i18next';
import { DeleteRounded, EditRounded, TranslateRounded } from '@mui/icons-material';
import { type TableCell } from '../../../common/ui/table/table';
import { useDispatch, useSelector } from 'react-redux';
import { selectLanguages } from '../../../store/selectors';
import { type TableAction } from '../../../common/ui/table/table-actions-toolbar/table-actions-toolbar';
import LanguageFormModal from './language-form-modal';
import { type ILanguage } from '../../../services/api/language/dto/language.dto';
import { createLanguage, deleteLanguage, updateLanguage } from '../../../store/languages/slice';
import { type FormikHelpers } from 'formik';
import useSnackbar from '../../../hooks/use-snackbar.hook';
import useConfirmation from '../../../hooks/use-confirmation.hook';
import { HttpStatusCode } from 'axios';
import { makeErrorsObjectFromResponse } from '../../../helpers/validation-helpers';

const Languages = (): ReactElement => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { languages, loading } = useSelector(selectLanguages);

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [editableLanguage, setEditableLanguage] = useState<ILanguage | null>(null);
  const { successSnackbar, errorSnackbar } = useSnackbar();
  const { Confirmation, showConfirmation } = useConfirmation();

  const handleModalClose = (): void => {
    setEditableLanguage(null);
    setModalOpen(false);
  };

  const handleSaveLanguage = (
    language: ILanguage,
    { resetForm, setSubmitting, setErrors }: FormikHelpers<ILanguage>,
  ): void => {
    const isNew: boolean = editableLanguage === null;
    const saveAction = isNew ? createLanguage : updateLanguage;
    dispatch(
      saveAction({
        language,
        onSuccess: () => {
          handleModalClose();
          resetForm();
          successSnackbar(t(`languages.${isNew ? 'create' : 'update'}.success`));
        },
        onError: (error) => {
          setSubmitting(false);
          if (error?.statusCode === HttpStatusCode.UnprocessableEntity) {
            setErrors(makeErrorsObjectFromResponse(t, error.errors));
          }
          errorSnackbar(t(`languages.${isNew ? 'create' : 'update'}.error`));
        },
      }),
    );
  };

  const handleUpdateLanguageStatus = (language: ILanguage): void => {
    dispatch(
      updateLanguage({
        language: {
          ...language,
          isActive: !language.isActive,
        },
        onSuccess: () => {
          successSnackbar(t('languages.change-status.success'));
        },
        onError: () => {
          errorSnackbar(t('languages.change-status.error'));
        },
      }),
    );
  };

  const handleDeleteLanguages = (selectedLanguages: ILanguage[]): void => {
    showConfirmation({
      text: t('delete-confirmation'),
      onConfirm: () => {
        dispatch(
          deleteLanguage({
            ids: selectedLanguages.map(({ _id }) => _id || ''),
            onSuccess: () => {
              successSnackbar(t('languages.delete.success'));
            },
            onError: () => {
              errorSnackbar(t('languages.delete.error'));
            },
          }),
        );
      },
    });
  };

  const cells: TableCell[] = useMemo(() => {
    const maxTranslationKeys = languages.reduce(
      (max, current) => {
        if (current.translations.length > max.translations.length) {
          return current;
        }
        return max;
      },
      { translations: [] },
    ).translations.length;

    return [
      {
        field: 'name',
        label: t('name'),
        fieldValue: ({ code }) => t(`languages.${code}`),
        render: ({ code }) => t(`languages.${code}`),
      },
      {
        field: 'code',
        label: t('code'),
      },
      {
        field: 'isActive',
        label: t('status'),
        render: (language: ILanguage): ReactElement => (
          <Switch
            checked={language.isActive}
            onClick={() => {
              handleUpdateLanguageStatus(language);
            }}
            disabled={loading}
          />
        ),
      },
      {
        field: 'translations',
        label: t('translations'),
        render: ({ translations }): ReactElement => (
          <Chip
            label={`${translations.length}/${maxTranslationKeys}`}
            variant="outlined"
            color={translations.length < maxTranslationKeys ? 'warning' : 'success'}
            icon={<TranslateRounded />}
          />
        ),
      },
    ];
  }, [languages]);

  const actions: TableAction[] = [
    {
      tooltip: t('edit'),
      Icon: EditRounded,
      onClick: (value: ILanguage): void => {
        setEditableLanguage(value);
        setModalOpen(true);
      },
    },
    {
      tooltip: t('delete'),
      Icon: DeleteRounded,
      multiple: true,
      onClick: handleDeleteLanguages,
    },
  ];

  return (
    <>
      {Confirmation}
      <Container sx={{ mt: 10 }} maxWidth="xl">
        <Table
          title={t('languages')}
          cells={cells}
          rows={languages}
          actions={actions}
          keyField="_id"
          loading={loading}
          onAddClick={() => {
            setModalOpen(true);
          }}
        />
      </Container>
      <LanguageFormModal
        open={modalOpen}
        language={editableLanguage}
        handleSave={handleSaveLanguage}
        handleClose={handleModalClose}
      />
    </>
  );
};

export default Languages;
