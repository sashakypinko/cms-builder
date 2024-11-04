import { ReactElement, useEffect, useMemo, useState } from 'react';
import { Container, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { FormikHelpers } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { selectLanguages } from '../../../store/selectors';
import Table from '../../../common/ui/table';
import { TableCell } from '../../../common/ui/table/table';
import { TableAction } from '../../../common/ui/table/table-actions-toolbar/table-actions-toolbar';
import { ILanguage } from '../../../services/api/language/dto/language.dto';
import { ParsedTranslation } from '../../../store/utils/prepare-languages-request.util';
import TranslationFormModal from './translation-form-modal';
import { deleteTranslationKeys, updateLanguage } from '../../../store/languages/slice';
import useSnackbar from '../../../hooks/use-snackbar.hook';
import TranslationEditableField from './translation-editable-field';
import { DeleteRounded } from '@mui/icons-material';
import useConfirmation from '../../../hooks/use-confirmation.hook';

const Translations = (): ReactElement => {
  const { t } = useTranslation();
  const { languages, loading } = useSelector(selectLanguages);
  const dispatch = useDispatch();
  const { successSnackbar, errorSnackbar } = useSnackbar();
  const { Confirmation, showConfirmation } = useConfirmation();
  const [firstLanguage, setFirstLanguage] = useState<ILanguage | null>(null);
  const [secondLanguage, setSecondLanguage] = useState<ILanguage | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    setFirstLanguage(languages.find(({ isMain }) => isMain) || null);
    setSecondLanguage(languages.find(({ code }) => code === secondLanguage?.code) || null);
  }, [languages]);

  const handleSelectSecondLanguage = (e: SelectChangeEvent): void => {
    setSecondLanguage(languages.find(({ code }) => code === e.target.value)!);
  };

  const handleSaveTranslation = (
    translation: ParsedTranslation,
    { resetForm, setSubmitting }: FormikHelpers<ParsedTranslation>,
  ): void => {
    if (!firstLanguage) return;
    dispatch(
      updateLanguage({
        language: {
          ...firstLanguage,
          translations: [...(firstLanguage?.translations || []), translation],
        },
        onSuccess: () => {
          handleModalClose();
          resetForm();
          successSnackbar(t('translations.create.success'));
        },
        onError: () => {
          setSubmitting(false);
          errorSnackbar(t('translations.create.error'));
        },
      }),
    );
  };

  const handleUpdateTranslation = (
    language: ILanguage,
    updatedTranslation: ParsedTranslation,
    callback: () => void,
  ): void => {
    const existingTranslationIndex = language.translations.findIndex(
      (translation: ParsedTranslation) => translation.key === updatedTranslation.key,
    );

    const updatedTranslations = [...language.translations];
    if (existingTranslationIndex !== -1) {
      updatedTranslations[existingTranslationIndex] = updatedTranslation;
    } else {
      updatedTranslations.push(updatedTranslation);
    }

    const updatedLanguage = {
      ...language,
      translations: updatedTranslations,
    };

    dispatch(
      updateLanguage({
        language: updatedLanguage,
        onSuccess: () => {
          successSnackbar(t('translations.update.success'));
          callback();
        },
        onError: () => {
          errorSnackbar(t('translations.update.error'));
          callback();
        },
      }),
    );
  };

  const handleDeleteTranslationKeys = (selected: ParsedTranslation[]): void => {
    const keys = selected.map(({ key }) => key);

    showConfirmation({
      text: t('delete-confirmation'),
      onConfirm: () => {
        dispatch(
          deleteTranslationKeys({
            keys,
            onSuccess: () => {
              successSnackbar(t('translations.delete.success'));
            },
            onError: () => {
              errorSnackbar(t('translations.delete.error'));
            },
          }),
        );
      },
    });
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const translations = useMemo(() => {
    if (!firstLanguage) {
      return [];
    }
    return firstLanguage.translations.map((translation: ParsedTranslation) => {
      return {
        key: translation.key,
        [firstLanguage.code]: translation.value,
        ...(secondLanguage
          ? {
              [secondLanguage.code]: secondLanguage.translations.find(
                ({ key }: ParsedTranslation) => key === translation.key,
              )?.value,
            }
          : {}),
      };
    });
  }, [firstLanguage, secondLanguage]);

  const cells: TableCell[] = useMemo(() => {
    const result: TableCell[] = [
      {
        field: 'key',
        label: t('key'),
      },
    ];

    if (firstLanguage) {
      result.push({
        field: firstLanguage.code,
        label: t(`languages.${firstLanguage.code}`),
        render: (row) => (
          <TranslationEditableField
            value={row[firstLanguage.code]}
            onUpdate={(value: string, callback) => {
              handleUpdateTranslation(
                firstLanguage,
                {
                  key: row.key,
                  value,
                },
                callback,
              );
            }}
          />
        ),
      });
    }

    if (secondLanguage) {
      result.push({
        field: secondLanguage.code,
        label: t(`languages.${secondLanguage.code}`),
        render: (row) => (
          <TranslationEditableField
            value={row[secondLanguage.code]}
            onUpdate={(value: string, callback) =>
              handleUpdateTranslation(
                secondLanguage,
                {
                  key: row.key,
                  value,
                },
                callback,
              )
            }
          />
        ),
      });
    }

    return result;
  }, [firstLanguage, secondLanguage]);

  const actions: TableAction[] = [
    {
      tooltip: t('delete'),
      Icon: DeleteRounded,
      multiple: true,
      onClick: handleDeleteTranslationKeys,
    },
  ];

  const SelectLanguageTool = (
    <FormControl
      key="language-selector"
      variant="standard"
      sx={{
        m: 1,
        minWidth: 200,
      }}
    >
      <InputLabel>{t('translations.second-language')}</InputLabel>
      <Select
        value={secondLanguage?.code || ''}
        onChange={handleSelectSecondLanguage}
        label={t('translations.second-language')}
      >
        <MenuItem value="">
          <em>{t('none')}</em>
        </MenuItem>
        {languages
          .filter(({ code }) => code !== firstLanguage?.code)
          .map(({ code }) => (
            <MenuItem key={code} value={code}>
              {t(`languages.${code}`)}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );

  return (
    <>
      {Confirmation}
      <Container maxWidth="xl">
        <Grid sx={{ mt: 10 }} container>
          <Table
            title={t('translations.title')}
            cells={cells}
            rows={translations}
            actions={actions}
            keyField="key"
            tools={[SelectLanguageTool]}
            loading={loading}
            onAddClick={() => setModalOpen(true)}
          />
        </Grid>
      </Container>
      {firstLanguage && (
        <TranslationFormModal open={modalOpen} handleSave={handleSaveTranslation} handleClose={handleModalClose} />
      )}
    </>
  );
};

export default Translations;
