import { ReactElement, useEffect, useMemo, useState } from 'react';
import { Container, Grid, IconButton } from '@mui/material';
import Table from '../../../common/ui/table';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { TableCell } from '../../../common/ui/table/table';
import useSnackbar from '../../../hooks/use-snackbar.hook';
import useConfirmation from '../../../hooks/use-confirmation.hook';
import { DeleteRounded, EditRounded } from '@mui/icons-material';
import useUserRole from '../../../hooks/use-user-role.hook';
import { Role } from '../users/enums/role.enum';
import { selectLanguages, selectPages } from '../../../store/selectors';
import { createPage, deletePage, getPages, updatePage } from '../../../store/pages/slice';
import PageFormModal from './page-form-modal';
import { IPage } from '../../../services/api/page/dto/page.dto';
import { FormikHelpers } from 'formik';
import { HttpStatusCode } from 'axios';
import { makeErrorsObjectFromResponse } from '../../../helpers/validation-helpers';
import { ILanguage } from '../../../services/api/language/dto/language.dto';

const Users = (): ReactElement => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [editablePage, setEditablePage] = useState<IPage | null>(null);

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { pages, loading } = useSelector(selectPages);
  const { languages } = useSelector(selectLanguages);
  const { successSnackbar, errorSnackbar } = useSnackbar();
  const { Confirmation, showConfirmation } = useConfirmation();
  const { authUser, hasRole } = useUserRole();

  useEffect(() => {
    dispatch(getPages());
  }, []);

  const handleSavePage = (
    page: IPage,
    { resetForm, setSubmitting, setErrors }: FormikHelpers<IPage>,
  ): void => {
    const isNew: boolean = editablePage === null;
    const saveAction = isNew ? createPage : updatePage;
    dispatch(
      saveAction({
        page,
        onSuccess: () => {
          handleModalClose();
          resetForm();
          successSnackbar(t(`pages.${isNew ? 'create' : 'update'}.success`));
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

  const handleDeletePage = (id: string) => {
    if (hasRole(Role.ADMIN)) {
      showConfirmation({
        text: t('pages.delete-confirmation'),
        onConfirm: () => {
          dispatch(
            deletePage({
              id,
              onSuccess: () => {
                successSnackbar(t('pages.delete.success'));
              },
              onError: () => {
                errorSnackbar(t('pages.delete.error'));
              },
            }),
          );
        },
      });
    } else {
      errorSnackbar(t('no-action-permission'));
    }
  };

  const handleModalClose = (): void => {
    setEditablePage(null);
    setModalOpen(false);
  };

  const cells: TableCell[] = useMemo(() => {
    return [
      {
        field: '_id',
        label: t('id'),
      },
      {
        field: 'name',
        label: t('name'),
      },
      {
        field: 'languageId',
        label: t('language'),
        render: (row: IPage) => t(`languages.${languages.find(({ _id }: ILanguage) => _id === row.languageId)?.code}`),
      },
      {
        field: 'actions',
        label: t('actions'),
        render: (page: IPage): ReactElement => {
          return (
            <>
              <IconButton onClick={() => {
                setEditablePage(page);
                setModalOpen(true);
              }} disabled={!hasRole(Role.ADMIN)}>
                <EditRounded />
              </IconButton>
              <IconButton onClick={() => handleDeletePage(page._id || '')} disabled={!hasRole(Role.ADMIN)}>
                <DeleteRounded />
              </IconButton>
            </>
          );
        },
      },
    ];
  }, [t, pages, authUser, languages]);

  return (
    <>
      {Confirmation}
      <Container maxWidth='xl'>
        <Grid sx={{ mt: 10 }} container>
          <Table
            keyField='_id'
            title={t('pages')}
            cells={cells} rows={pages} loading={loading} selectable={false}
            onAddClick={() => {
              setModalOpen(true);
            }} />
        </Grid>
      </Container>
      <PageFormModal
        open={modalOpen}
        page={editablePage}
        handleSave={handleSavePage}
        handleClose={handleModalClose}
      />
    </>
  );
};

export default Users;
