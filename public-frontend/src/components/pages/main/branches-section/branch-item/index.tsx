import {useInView} from 'react-intersection-observer';
import useScrollDirection from '../../../../../hooks/use-scroll-direction.hook';
import useIsMobile from '../../../../../hooks/use-is-mobile.hook';
import {FC, ReactElement, useMemo} from 'react';
import {animated, useSpring} from 'react-spring';
import {Box, styled, Typography} from '@mui/material';
import {AccessTimeRounded, LocationOnOutlined} from '@mui/icons-material';

const AnimatedBranchItem = animated(styled(Box)({
    maxWidth: 200,
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
}));

interface Props {
    name: string;
    date: string;
    address: string;
    delay: number;
}
const BranchItem: FC<Props> = ({name, date, address, delay}): ReactElement => {
    const [ref, inView, scrollEntry] = useInView({triggerOnce: false, threshold: 0.1});
    const isScrollDown = useScrollDirection();
    const isMobile = useIsMobile();

    const scrollDown = useMemo(() => isScrollDown(scrollEntry), [scrollEntry]);

    const transformAxis = isMobile ? 'X' : 'Y';

    const animation = useSpring({
        from: {
            opacity: 0,
            transform: scrollDown ? `translate${transformAxis}(100%)` : `translate${transformAxis}(-100%)`
        },
        to: {
            opacity: inView ? 1 : 0,
            transform: inView ? `translate${transformAxis}(0%)` : scrollDown ? `translate${transformAxis}(100%)` : `translate${transformAxis}(-100%)`
        },
        config: {duration: 200},
        delay,
        reset: true,
    });

    return (
        <AnimatedBranchItem ref={ref} style={animation}>
            <Typography paddingBottom={1} variant="h6" fontWeight={600} letterSpacing={1}>{name}</Typography>
            <Box display="flex" gap={1}>
                <AccessTimeRounded sx={{fontSize: 24, color: '#000'}}/>
                <Typography variant="subtitle1" letterSpacing={0.5}>
                    {date}
                </Typography>
            </Box>
            <Box display="flex" gap={1}>
                <LocationOnOutlined sx={{fontSize: 24, color: '#000'}}/>
                <Typography variant="body1" letterSpacing={0.5}>
                    {address}
                </Typography>
            </Box>
        </AnimatedBranchItem>
    );
};

export default BranchItem;
