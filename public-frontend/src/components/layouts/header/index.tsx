import {FC, type ReactElement} from 'react';
import {Box, styled, Typography} from '@mui/material';
import LanguageSelector from './language-selector';

const StyledHeader = styled(Box)(({theme}) => ({
    display: 'flex',
    justifyContent: 'space-between',
    boxShadow: '0 1px 20px 0px #b5b5b5',
    alignItems: 'center',
    padding: '24px',
    paddingLeft: '40px',
    paddingRight: '48px',
    [theme.breakpoints.up('xs')]: {
        padding: '18px',
        paddingLeft: '16px',
        paddingRight: '16px',
    },
    [theme.breakpoints.up('md')]: {
        padding: '24px',
        paddingLeft: '40px',
        paddingRight: '48px',
    },
}));

const Logo = styled(Typography)(({theme}) => ({
    color: '#232323',
    fontWeight: 600,
    [theme.breakpoints.up('xs')]: {
        fontSize: 16,
    },
    [theme.breakpoints.up('md')]: {
        fontSize: 20,
    },
}));

const Header: FC = (): ReactElement => {
    return (
        <StyledHeader>
            <Logo variant="h6">CHRISTUSGEMEINDE</Logo>
            <LanguageSelector />
        </StyledHeader>
    );
};

export default Header;
