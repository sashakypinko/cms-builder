import { ReactElement, useEffect, useMemo } from 'react';
import { Chip, Container, Grid, IconButton } from '@mui/material';
import Table from '../../../common/ui/table';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { TableCell } from '../../../common/ui/table/table';
import useSnackbar from '../../../hooks/use-snackbar.hook';
import useConfirmation from '../../../hooks/use-confirmation.hook';
import {
  AdminPanelSettingsRounded,
  DeleteRounded,
  NewReleasesRounded,
  PersonOffRounded,
  PersonRounded,
  RemoveRedEyeRounded,
  SettingsRounded,
  SvgIconComponent,
  VerifiedRounded,
} from '@mui/icons-material';
import { selectUsers } from '../../../store/selectors';
import { activateUser, deactivateUser, deleteUser, getUsers } from '../../../store/users/slice';
import { Role } from './enums/role.enum';
import { IUser } from '../../../services/api/user/dto/user.dto';
import useUserRole from '../../../hooks/use-user-role.hook';
import Link from '../../../common/ui/link';
import { replaceParamsInReactUrl } from '../../../helpers/url.helper';
import { RouteEnum } from '../../../routes/enums/route.enum';
import Avatar from '../../../common/ui/avatar';

type RoleIcons = {
  [key in Role]: SvgIconComponent;
};

type RoleColors = {
  [key in Role]: 'success' | 'info';
};

const roleIcons: RoleIcons = {
  [Role.ADMIN]: AdminPanelSettingsRounded,
  [Role.MODERATOR]: SettingsRounded,
};

const roleColors: RoleColors = {
  [Role.ADMIN]: 'success',
  [Role.MODERATOR]: 'info',
};

const Users = (): ReactElement => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { users, loading } = useSelector(selectUsers);
  const { successSnackbar, errorSnackbar } = useSnackbar();
  const { Confirmation, showConfirmation } = useConfirmation();
  const { authUser, hasRole } = useUserRole();

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const handleActivateUser = (id: string) => {
    if (hasRole(Role.ADMIN)) {
      showConfirmation({
        text: t('users.activate-confirmation'),
        onConfirm: () => {
          dispatch(
            activateUser({
              id,
              onSuccess: () => {
                successSnackbar(t('users.activate.success'));
              },
              onError: () => {
                errorSnackbar(t('translations.activate.error'));
              },
            }),
          );
        },
      });
    } else {
      errorSnackbar(t('no-action-permission'));
    }
  };

  const handleDeactivateUser = (id: string) => {
    if (hasRole(Role.ADMIN)) {
      showConfirmation({
        text: t('users.deactivate-confirmation'),
        onConfirm: () => {
          dispatch(
            deactivateUser({
              id,
              onSuccess: () => {
                successSnackbar(t('users.deactivate.success'));
              },
              onError: () => {
                errorSnackbar(t('translations.deactivate.error'));
              },
            }),
          );
        },
      });
    } else {
      errorSnackbar(t('no-action-permission'));
    }
  };

  const handleDeleteUser = (id: string) => {
    if (hasRole(Role.ADMIN)) {
      showConfirmation({
        text: t('users.delete-confirmation'),
        onConfirm: () => {
          dispatch(
            deleteUser({
              id,
              onSuccess: () => {
                successSnackbar(t('users.delete.success'));
              },
              onError: () => {
                errorSnackbar(t('translations.delete.error'));
              },
            }),
          );
        },
      });
    } else {
      errorSnackbar(t('no-action-permission'));
    }
  };

  const cells: TableCell[] = useMemo(() => {
    return [
      {
        field: 'avatar',
        label: '',
        render: ({ avatar }: IUser) => <Avatar src={avatar as string | null} />,
      },
      {
        field: 'firstName',
        label: t('first-name'),
      },
      {
        field: 'lastName',
        label: t('last-name'),
      },
      {
        field: 'email',
        label: t('email'),
      },
      {
        field: 'role',
        label: t('role'),
        render: ({ role }: IUser): ReactElement => {
          const Icon = roleIcons[role];
          return <Chip label={t(`roles.${role}`)} variant="outlined" color={roleColors[role]} icon={<Icon />} />;
        },
      },
      {
        field: 'verified',
        label: t('users.verify'),
        render: ({ verified }: IUser): ReactElement => {
          return verified ? <VerifiedRounded color="success" /> : <NewReleasesRounded color="disabled" />;
        },
      },
      {
        field: 'isActive',
        label: t('users.active'),
        render: ({ _id, isActive }: IUser): ReactElement => {
          if (isActive) {
            return (
              <IconButton onClick={() => handleDeactivateUser(_id || '')} disabled={!hasRole(Role.ADMIN)}>
                <PersonRounded color="success" />
              </IconButton>
            );
          }
          return (
            <IconButton onClick={() => handleActivateUser(_id || '')} disabled={!hasRole(Role.ADMIN)}>
              <PersonOffRounded color="disabled" />
            </IconButton>
          );
        },
      },
      {
        field: 'actions',
        label: t('actions'),
        render: ({ _id }: IUser): ReactElement => {
          return (
            <>
              <Link to={replaceParamsInReactUrl(RouteEnum.PROFILE, { id: _id })}>
                <IconButton disabled={!hasRole(Role.ADMIN)}>
                  <RemoveRedEyeRounded />
                </IconButton>
              </Link>
              <IconButton onClick={() => handleDeleteUser(_id || '')} disabled={!hasRole(Role.ADMIN)}>
                <DeleteRounded />
              </IconButton>
            </>
          );
        },
      },
    ];
  }, [authUser]);

  return (
    <>
      {Confirmation}
      <Container maxWidth="xl">
        <Grid sx={{ mt: 10 }} container>
          <Table keyField="_id" title={t('users')} cells={cells} rows={users} loading={loading} selectable={false} />
        </Grid>
      </Container>
    </>
  );
};

export default Users;
