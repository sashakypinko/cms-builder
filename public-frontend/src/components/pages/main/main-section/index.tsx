import {FC, ReactElement} from 'react';
import {useTranslation} from 'react-i18next';
import useIsMobile from '../../../../hooks/use-is-mobile.hook';
import {Box, styled, Typography} from '@mui/material';

const Image = styled('img')(() => ({
  position: 'absolute',
  width: '100%',
  top: '50%',
  transform: 'translateY(-50%)',
}));

const Photo = styled('img')(() => ({
  width: '100%',
}));

const Text = styled(Typography)(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  padding: '0 24px',
  top: '10%',
  textAlign: 'center',
  fontFamily: '"M PLUS Rounded 1c", sans-serif',
  color: '#fff',
  [theme.breakpoints.up('xs')]: {
    display: 'none',
    '-webkit-text-stroke': '1px black',
  },
  [theme.breakpoints.up('sm')]: {
    top: '12%',
    fontSize: 36,
  },
  [theme.breakpoints.up('md')]: {
    top: '8%',
    fontSize: 48,
    '-webkit-text-stroke': '2px black',
  },
  [theme.breakpoints.up('lg')]: {
    top: '15%',
    fontSize: 61,
  },
}));

const MainSection: FC = (): ReactElement => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  return (
      <Box sx={{ p: 2, mt: 2 }} display="flex" flexDirection="column" alignItems="center">
        <Box sx={{maxWidth: 1200, position: 'relative', width: '100%'}}>
          <Box sx={{ overflow: 'hidden', borderRadius: 2, maxHeight: 500 }} display="flex">
            <Photo src={require('../../../../assets/img/main-banner.png')} alt="main_photo"/>
            <Box sx={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              background: 'rgba(0,0,0,0.2)',
              borderRadius: 2
            }} />
          </Box>
          <Image src={require(`../../../../assets/img/main-text${isMobile ? '-mobile' : ''}.svg`)} />
          <Text>{t('main.text')}</Text>
        </Box>
      </Box>
  );
};

export default MainSection;
