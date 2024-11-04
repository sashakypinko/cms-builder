import { type MouseEvent, type ReactElement, useState } from 'react';
import { IconButton, Menu, useTheme } from '@mui/material';
import { TranslateRounded } from '@mui/icons-material';
import i18n from '../../../../config/i18n';
import { useTranslation } from 'react-i18next';

const LanguageSelector = (): ReactElement => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSelect = (code: string): void => {
    i18n.changeLanguage(code).then();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton sx={{ ml: 1 }} onClick={handleOpen} color="inherit">
        <TranslateRounded sx={{ color: theme.palette.background.default }} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{
          horizontal: 'right',
          vertical: 'top',
        }}
        anchorOrigin={{
          horizontal: 'right',
          vertical: 'bottom',
        }}
      >
        {/*  {languages*/}
        {/*  .filter(({ isActive }) => isActive)*/}
        {/*  .map(({ code }: ILanguage) => (*/}
        {/*    <MenuItem*/}
        {/*      key={code}*/}
        {/*      onClick={() => {*/}
        {/*        handleSelect(code);*/}
        {/*      }}*/}
        {/*    >*/}
        {/*      {t(`languages.${code}`)}*/}
        {/*    </MenuItem>*/}
        {/*  ))}*/}
      </Menu>
    </>
  );
};

export default LanguageSelector;
