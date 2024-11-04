import {CSSProperties, FC, ReactElement} from 'react';
import {Box, styled, Typography} from '@mui/material';
import {animated} from '@react-spring/web';
import {SvgIconComponent} from '@mui/icons-material';
import {PickAnimated, SpringValues} from '@react-spring/core';

const AnimatedCard = animated(styled(Box)(() => ({
    position: 'relative',
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 16,
    gap: 28,
})));

interface Props {
    Icon: SvgIconComponent;
    title: string;
    text: string;
    style: SpringValues<PickAnimated<any>>;
}

const Card: FC<Props> = ({Icon, title, text, style}): ReactElement => {
    return (
        <AnimatedCard style={style}>
            <Icon sx={{fontSize: 56}}/>
            <Typography variant="body1" fontWeight={600} letterSpacing={4}>{title}</Typography>
            <Typography variant="subtitle2" textAlign="center" letterSpacing={0.5}>
                {text}
            </Typography>
        </AnimatedCard>
    );
};

export default Card;
