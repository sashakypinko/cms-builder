import { useMemo, useState } from 'react';
import { ThemeEnum } from '../enums/theme.enum';
import { type Theme } from '@mui/material';
import { darkTheme, lightTheme } from '../index';
import { AuthStorage } from '../../../services/storage/auth.storage';

const useColorMode = () => {
  const [mode, setMode] = useState<ThemeEnum>(AuthStorage.getThemeMode() || ThemeEnum.LIGHT_MODE);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode: ThemeEnum) => {
          const newMode = prevMode === ThemeEnum.LIGHT_MODE ? ThemeEnum.DARK_MODE : ThemeEnum.LIGHT_MODE;
          AuthStorage.changeThemeMode(newMode);
          return newMode;
        });
      },
    }),
    [],
  );

  const currentTheme = useMemo((): Theme => (mode === ThemeEnum.LIGHT_MODE ? lightTheme : darkTheme), [mode]);

  return {
    colorMode,
    currentTheme,
  };
};

export default useColorMode;
