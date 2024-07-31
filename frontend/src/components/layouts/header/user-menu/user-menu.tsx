import { type MouseEvent, type ReactElement, useState } from 'react';
import {
  Avatar as AvatarIcon,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  styled,
  Tooltip,
} from '@mui/material';
import { Logout, Settings } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../../store/auth/slice';
import { useTranslation } from 'react-i18next';
import { RouteEnum } from '../../../../routes/enums/route.enum';
import Link from '../../../../common/ui/link';
import { replaceParamsInReactUrl } from '../../../../helpers/url.helper';
import { selectAuthUser } from '../../../../store/selectors';
import Avatar from '../../../../common/ui/avatar';

const UserMenu = (): ReactElement => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const user = useSelector(selectAuthUser);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <Tooltip title={t('profile.profile-settings')}>
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar src={user?.avatar as string | null} />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{
          horizontal: 'right',
          vertical: 'top',
        }}
        anchorOrigin={{
          horizontal: 'right',
          vertical: 'bottom',
        }}
      >
        <Link to={replaceParamsInReactUrl(RouteEnum.PROFILE, { id: user?._id })}>
          <MenuItem sx={{ gap: 2 }} onClick={handleClose}>
            <Avatar src={user?.avatar as string | null} />
            {t('profile.my-profile')}
          </MenuItem>
        </Link>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          {t('profile.settings')}
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          {t('profile.logout')}
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
