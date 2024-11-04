import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material';

const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const theme = useTheme();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < theme.breakpoints.values.md);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return isMobile;
};

export default useIsMobile;
