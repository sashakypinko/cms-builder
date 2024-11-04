import {Box, Divider, styled, Typography} from '@mui/material';
import {useTranslation} from 'react-i18next';
import {
    AutoStoriesOutlined,
    ChurchOutlined,
    LocationOnOutlined,
} from '@mui/icons-material';
import {useInView} from 'react-intersection-observer';
import {animated, useSpring} from '@react-spring/web';
import GoogleMaps from '../../../shared/google-maps';
import {Title} from '../about-section';

const Card = styled(Box)(({theme}) => ({
    marginTop: 40,
    display: 'flex',
    width: '100%',
    maxWidth: 1200,
    color: '#3a3a3a',
    [theme.breakpoints.up('xs')]: {
        flexDirection: 'column',
    },
    [theme.breakpoints.up('md')]: {
        flexDirection: 'row',
    },
}));

const MapContainer = styled(Box)(({theme}) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '2px 4px 12px 2px #dfdfdf',
    [theme.breakpoints.up('xs')]: {
        minWidth: '100%',
    },
    [theme.breakpoints.up('md')]: {
        minWidth: '50%',
    },
}));

const ScheduleItem = styled(Box)(() => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 6,
}));

const AnimatedLeftSide = animated(MapContainer);
const AnimatedRightSide = animated(Box);

const LocationSection = () => {
    const {t} = useTranslation();
    const [ref, inView] = useInView({triggerOnce: false, threshold: 0.1});

    const leftSideAnimation = useSpring({
        from: {opacity: 0.6, transform: 'translateX(-30%)'},
        to: {opacity: inView ? 1 : 0.6, transform: inView ? 'translateX(0%)' : 'translateX(-30%)'},
        config: {duration: 400},
        reset: true,
    });

    const rightSideAnimation = useSpring({
        from: {opacity: 0.6, transform: 'translateX(30%)'},
        to: {opacity: inView ? 1 : 0.6, transform: inView ? 'translateX(0%)' : 'translateX(30%)'},
        config: {duration: 400},
        reset: true,
    });

    return (
        <Box id="location" sx={{mt: 4, mb: 10, p: 2}} display="flex" flexDirection="column" alignItems="center">
            <Title variant="h4">{t('location.title')}</Title>
            <Card ref={ref}>
                <AnimatedLeftSide style={leftSideAnimation}>
                    <GoogleMaps
                        zoom={17}
                        selectedPosition={{lat: 51.50082216506806, lng: 7.252703905105591}}
                        ContainerProps={{
                            sx: {
                                width: '100%',
                                height: 320,
                            },
                        }}
                    />
                </AnimatedLeftSide>
                <AnimatedRightSide style={rightSideAnimation} sx={{p: 4}} width="100%">
                    <Box display="flex" alignItems="center" gap={2}>
                        <LocationOnOutlined sx={{fontSize: 24, color: '#000'}}/>
                        <Typography variant="body1" fontWeight={600} letterSpacing={2}>
                            Harpener Heide 944805 Bochum
                        </Typography>
                    </Box>

                    <Divider sx={{mt: 3, mb: 3}}/>

                    <Box display="flex" flexDirection="column" gap={3}>
                        <ScheduleItem>
                            <Box display="flex" alignItems="center" gap={2}>
                                <ChurchOutlined sx={{fontSize: 24, color: '#000'}}/>
                                <Typography variant="body1" fontWeight={600} letterSpacing={2}>
                                    {t('location.schedule.1')}:
                                </Typography>
                            </Box>
                            <Typography variant="body2" fontWeight={600} letterSpacing={1}>
                                {t('sundays')} 14:00
                            </Typography>
                        </ScheduleItem>
                        <ScheduleItem>
                            <Box display="flex" alignItems="center" gap={2}>
                                <AutoStoriesOutlined sx={{fontSize: 24, color: '#000'}}/>
                                <Typography variant="body1" fontWeight={600} letterSpacing={2}>
                                    {t('location.schedule.2')}:
                                </Typography>
                            </Box>
                            <Typography variant="body2" fontWeight={600} letterSpacing={1}>
                                {t('tuesdays')} 18:00
                            </Typography>
                        </ScheduleItem>
                    </Box>
                </AnimatedRightSide>
            </Card>
        </Box>
    );
};

export default LocationSection;
