import {type ReactElement, useContext} from 'react';
import {Box, styled, Typography, useTheme, Link} from '@mui/material';
import {SidebarContext} from '../sidebar/context/sidebar.context';

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

const Header = (): ReactElement => {
    const theme = useTheme();
    const sidebar = useContext(SidebarContext);

    return (
        <StyledHeader>
            <Logo variant="h6">CHRISTUSGEMEINDE</Logo>
            <Box display="flex" alignItems="center" gap={2}>
                <Link
                    sx={{fontSize: 16, fontWeight: 600, textDecoration: 'none', cursor: 'pointer'}}
                    color="#232323"
                    onClick={() => scrollToSection('location')}
                >
                    {t('contacts')}
                </Link>
                <IconButton onClick={handleLanguageChange}>
                    <Language sx={{color: '#232323'}}/>
                </IconButton>
            </Box>
        </StyledHeader>
    );
};

export default Header;
