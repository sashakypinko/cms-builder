import {type ReactElement} from 'react';
import {Box} from '@mui/material';
import MainSection from './main-section';
import AboutSection from './about-section';
import VerseSection from './verse-section';
import BranchesSection from './branches-section';
import LocationSection from './location-section';

const MainPage = (): ReactElement => {
    return (
        <Box overflow="hidden">
            <MainSection/>
            <AboutSection/>
            <VerseSection/>
            <BranchesSection/>
            <LocationSection/>
        </Box>
    );
};

export default MainPage;
