import {FC, ReactElement} from 'react';
import {Box, styled, Typography} from '@mui/material';
import Card from './card';
import {ChurchOutlined, FavoriteBorderRounded, WorkspacesOutlined} from '@mui/icons-material';
import {useSpring} from 'react-spring';
import {useTranslation} from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import useIsMobile from '../../../../hooks/use-is-mobile.hook';
import {PickAnimated, SpringValues} from '@react-spring/core';

export const Title = styled(Typography)(({theme}) => ({
    color: '#161722',
    textTransform: 'uppercase',
    textAlign: 'center',
    marginTop: 32,
    marginBottom: 16,
    fontWeight: 700,
    [theme.breakpoints.up('xs')]: {
        fontSize: 26,
    },
    [theme.breakpoints.up('sm')]: {
        fontSize: 28,
    },
    [theme.breakpoints.up('md')]: {
        fontSize: 30,
    },
    [theme.breakpoints.up('lg')]: {
        fontSize: 32,
    },
    [theme.breakpoints.up('xl')]: {
        fontSize: 34,
    },
}));

const CardsContainer = styled(Box)(({theme}) => ({
    marginTop: 40,
    display: 'flex',
    justifyContent: 'space-between',
    gap: 40,
    [theme.breakpoints.up('xs')]: {
        flexDirection: 'column',
    },
    [theme.breakpoints.up('md')]: {
        flexDirection: 'row',
    },
}));

const getMobileAnimation = (inView: boolean) => ({
    from: {opacity: 0, transform: 'translateX(-100%)'},
    to: {opacity: inView ? 1 : 0, transform: inView ? 'translateX(0%)' : 'translateX(100%)'},
    config: {duration: 400},
    reset: true,
});

const CardAbout: FC = (): ReactElement => {
    const {t} = useTranslation();
    const [ref, inView] = useInView({triggerOnce: false, threshold: 0.1});
    const animation = useSpring(getMobileAnimation(inView));

    return (
        <Box width="fit-content" ref={ref}>
            <Card
                Icon={ChurchOutlined}
                title={t('about.about-us.title')}
                text={t('about.about-us.text')}
                style={animation}
            />
        </Box>
    );
};

const CardInternal: FC = (): ReactElement => {
    const {t} = useTranslation();
    const [ref, inView] = useInView({triggerOnce: false, threshold: 0.1});
    const isMobile = useIsMobile();

    const animation: SpringValues<PickAnimated<any>> = useSpring(
        isMobile
            ? getMobileAnimation(inView)
            : {
                from: {opacity: 0},
                to: {opacity: inView ? 1 : 0},
                config: {duration: 400},
                reset: true,
            }
    );

    return (
        <Box width="fit-content" ref={ref}>
            <Card
                Icon={WorkspacesOutlined}
                title={t('about.internal.title')}
                text={t('about.internal.text')}
                style={animation}
            />
        </Box>
    );
};

const CardExternal: FC = (): ReactElement => {
    const {t} = useTranslation();
    const [ref, inView] = useInView({triggerOnce: false, threshold: 0.1});
    const isMobile = useIsMobile();

    const animation = useSpring(
        isMobile
            ? getMobileAnimation(inView)
            : {
                from: {opacity: 0, transform: 'translateX(100%)'},
                to: {opacity: inView ? 1 : 0, transform: inView ? 'translateX(0%)' : 'translateX(100%)'},
                config: {duration: 400},
                reset: true,
            }
    );

    return (
        <Box width="fit-content" ref={ref}>
            <Card
                Icon={FavoriteBorderRounded}
                title={t('about.external.title')}
                text={t('about.external.text')}
                style={animation}
            />
        </Box>
    );
};

const AboutSection: FC = (): ReactElement => {
    const {t} = useTranslation();

    return (
        <Box sx={{padding: '40px 16px 100px 16px'}} display="flex" flexDirection="column" alignItems="center">
            <Box maxWidth={1200} width="100%">
                <Title variant="h4">{t('about.title')}</Title>
                <CardsContainer>
                    <CardAbout/>
                    <CardInternal/>
                    <CardExternal/>
                </CardsContainer>
            </Box>
        </Box>
    );
};

export default AboutSection;
