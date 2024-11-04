import {FC, ReactElement} from 'react';
import {Box, styled} from '@mui/material';
import {Title} from '../about-section';
import {useTranslation} from 'react-i18next';
import BranchItem from './branch-item';

const Image = styled('img')(() => ({
    height: 'min-content',
}));

const Links = styled(Box)(({theme}) => ({
    gap: 48,
    [theme.breakpoints.up('xs')]: {
        flexDirection: 'column',
    },
    [theme.breakpoints.up('md')]: {
        flexDirection: 'row',
    },
}));

const BranchesContainer = styled(Box)(({theme}) => ({
    display: 'grid',
    padding: '40px 0',
    marginTop: 40,
    justifyItems: 'center',
    [theme.breakpoints.up('xs')]: {
        gridTemplateColumns: '1fr',
        gap: 80,
    },
    [theme.breakpoints.up('sm')]: {
        gridTemplateColumns: 'repeat(2, 1fr)',
    },
    [theme.breakpoints.up('md')]: {
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 32,
    },
}));


const BranchesSection: FC = (): ReactElement => {
    const {t} = useTranslation();

    return (
        <Box id="fillials" sx={{mt: 4, pb: 10, p: 2}} display="flex" flexDirection="column"
             alignItems="center">
            <Box maxWidth={1200} width="100%">
                <Title variant="h4">{t('fillials.title')}</Title>
                <BranchesContainer>
                    <BranchItem
                        name="Bochum"
                        date={`${t('sundays')} 10:00`} address="Harpener Heide 9 44805 Bochum"
                        delay={0}
                    />
                    <BranchItem
                        name="Lüdinghausen"
                        date={`${t('sundays')} 10:00`}
                        address="An der Vogelrute 5 59348 Lüdinghausen"
                        delay={50}
                    />
                    <BranchItem
                        name="Wuppertal"
                        date={`${t('sundays')} 10:00`}
                        address="Otto-Hausmann-Ring 184 42115 Wuppertal"
                        delay={100}
                    />
                    <BranchItem
                        name="Lünen"
                        date={`${t('sundays')} 10:00`} address="Am Friedhof 18 44532 Lünen"
                        delay={150}
                    />
                </BranchesContainer>
                <Links sx={{mt: 12, mb: 8}} display="flex" justifyContent="space-between" alignItems="center">
                    <a href="https://helping-hands-scm.de" rel="noreferrer" target="_blank">
                        <Image src="img/helping-hands.png"/>
                    </a>
                    <a href="https://www.bfp.de" rel="noreferrer" target="_blank">
                        <Image src="img/bfp.png"/>
                    </a>
                    <a href="https://www.youversion.com" rel="noreferrer" target="_blank">
                        <Image src="img/youversion.png"/>
                    </a>
                </Links>
            </Box>
        </Box>
    );
};

export default BranchesSection;
