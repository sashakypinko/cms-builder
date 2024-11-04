import {Box, Divider, Grid, styled, Typography} from '@mui/material';
import {FC, type ReactElement} from 'react';
import {useTranslation} from 'react-i18next';
import useIsMobile from '../../../hooks/use-is-mobile.hook';
import {Facebook, Instagram} from '@mui/icons-material';

const Title = styled(Typography)(() => ({
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: 2,
    paddingBottom: '16px'
}));

const Text = styled(Typography)(() => ({
    fontSize: 16,
    fontWeight: 300,
}));

const FooterContainer = styled(Box)(() => ({
    display: 'flex',
    justifyContent: 'center',
    padding: '0 16px',
    background: '#f3f3f3',
}));


const Link = styled('a')(() => ({
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: '#000',
    gap: 6,
    paddingBottom: '8px',
}));

const Footer: FC = (): ReactElement => {
    const { t } = useTranslation();
    const isMobile = useIsMobile();

    return (
        <FooterContainer>
            <Box maxWidth={1200} width="100%">
                <Box sx={{ pb: isMobile ? 0 : 10 }} display="flex" justifyContent="center">
                    <Grid container sx={{ padding: '56px 0' }} width="100%" spacing={4}>
                        <Grid item xs={12} sm={6} md={3}>
                            <Title>
                                {t('bank')}
                            </Title>
                            <Text>DE63 3626 4325 6256 4233 34</Text>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Title>
                                {t('address')}
                            </Title>
                            <Text>Harpener Heide 944805 Bochum</Text>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Title>
                                {t('contact')}
                            </Title>
                            <Text>info@christus-gemeinden.de</Text>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Title>
                                {t('networks')}
                            </Title>
                            <Link href="https://facebook.com" target="_blank">
                                <Facebook/>
                                <Text>Facebook</Text>
                            </Link>
                            <Link href="https://instagram.com" target="_blank">
                                <Instagram/>
                                <Text>Instagram</Text>
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
                <Divider />
                <Box sx={{ padding: '34px 0' }}>
                    <Typography fontSize={isMobile ? 12 : 18}>
                        © 2023 Christengemeinde Gottes Wort. Alle Rechte vorbehalten.
                    </Typography>
                </Box>
            </Box>
        </FooterContainer>
    );
};

export default Footer;
