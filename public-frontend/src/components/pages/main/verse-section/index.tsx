import {FC, ReactElement, useEffect, useMemo, useState} from 'react';
import {animated, useSpring} from 'react-spring';
import {useTranslation} from 'react-i18next';
import i18n from 'i18next';
import { useInView } from 'react-intersection-observer';
import useScrollDirection from '../../../../hooks/use-scroll-direction.hook';
import {Box, styled, Typography} from '@mui/material';
import {WbSunnyOutlined} from '@mui/icons-material';

const Container = styled(Box)(() => ({
  background: '#f3f3f3',
  backgroundSize: 'cover',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '80px 20px',
  position: 'relative',
}));

const AnimatedCard = animated(styled(Box)(({ theme }) => ({
  display: 'flex',
  background: '#fff',
  color: '#3a3a3a',
  overflow: 'hidden',
  borderRadius: 10,
  zIndex: 2,
  boxShadow: '2px 2px 5px 0 #dfdfdf',
  [theme.breakpoints.up('xs')]: {
    flexDirection: 'column',
  },
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
  },
})));

const ImageContainer = styled(Box)(({ theme }) => ({
  maxHeight: 460,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  [theme.breakpoints.up('md')]: {
    minWidth: 420,
  },
}));

const Image = styled('img')(() => ({
  maxWidth: '100%',
  maxHeight: 'inherit',
}));

const Title = styled(Typography)(() => ({
  fontWeight: 600,
  textTransform: 'uppercase',
}));

const Reference = styled(Typography)(() => ({
  marginTop: 8,
}));

type IVerse = {
  text: string;
  reference: string;
  image: string;
}

const mockVerse: IVerse = {
  text: `Die Liebe ist langmütig und freundlich, die Liebe eifert nicht, die Liebe treibt nicht Mutwillen, sie bläht
        sich nicht auf, sie verhält sich nicht ungehörig, sie sucht nicht das Ihre, sie lässt sich nicht erbittern,
        sie rechnet das Böse nicht zu.`,
  reference: '1 Korinther 13:4-5',
  image: 'https://imageproxy.youversionapi.com/640x640/https://s3.amazonaws.com/static-youversionapi-com/images/base/33156/1280x1280.jpg',
};


const VerseSection: FC = (): ReactElement | null => {
  const [loading, setLoading] = useState<boolean>(false);
  const [verseData, setVerseData] = useState<IVerse | null>(null);
  const {t} = useTranslation();
  const [ref, inView, scrollEntry] = useInView({ triggerOnce: false, threshold: 0.3 });
  const isScrollDown = useScrollDirection();

  const scrollDown = useMemo(() => isScrollDown(scrollEntry), [scrollEntry]);

  const animation = useSpring({
    from: { opacity: 0, transform: scrollDown ? 'translateY(100%)' : 'translateY(-100%)' },
    to: { opacity: inView ? 1 : 0, transform: inView ? 'translateY(0%)' : scrollDown ? 'translateY(100%)' : 'translateY(-100%)' },
    config: { duration: 400 },
    reset: true,
  });

  useEffect(() => {
    (async () => {
      setLoading(true);

      // TODO: replace with real data
      const verseData = mockVerse;

      if (verseData) {
        setVerseData(verseData);
      }

      setLoading(false);
    })();
  }, [i18n.language]);

  if (!verseData || loading) {
    return null;
  }

  return (
      <Container ref={ref}>
        <AnimatedCard ref={ref} style={animation} maxWidth={1200} width="100%" display="flex">
          <ImageContainer>
            <Image src={verseData.image} alt="verse_image" />
          </ImageContainer>
          <Box sx={{ p: 4 }}>
            <Box sx={{ mb: 4 }} display="flex" alignItems="center" gap={1}>
              <WbSunnyOutlined />
              <Title variant="subtitle1">{t('vers.title')}</Title>
            </Box>
            <Typography variant="h5">{verseData.text}</Typography>
            <Reference variant="subtitle1">{verseData.reference}</Reference>
          </Box>
        </AnimatedCard>
      </Container>
  );
};

export default VerseSection;
