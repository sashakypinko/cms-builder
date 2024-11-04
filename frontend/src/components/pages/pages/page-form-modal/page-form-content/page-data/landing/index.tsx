import { FC, ReactElement } from 'react';
import { useFormikContext } from 'formik';
import { IPage } from '../../../../../../../services/api/page/dto/page.dto';
import MainSection from './main-section';
import AboutSection from './about-section';
import VerseSection from './verse-section';
import BranchesSection from './branches-section';
import PartnersSection from './partners-section';
import LocationSection from './location-section';
import CommonSection from './common-section';

const Landing: FC = (): ReactElement | null => {
  const { values } = useFormikContext<IPage>();

  if (!values.data) {
    return null;
  }

  return (
    <>
      <CommonSection />
      <MainSection />
      <AboutSection />
      <VerseSection />
      <BranchesSection />
      <PartnersSection />
      <LocationSection />
    </>
  );
};

export default Landing;
