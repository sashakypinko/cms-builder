import { FC, ReactElement } from 'react';
import PageNameEnum from '../../../../../../enums/page-name.enum';
import Landing from './landing';
import About from './about';

const pages = {
  [PageNameEnum.LANDING]: Landing,
  [PageNameEnum.ABOUT]: About,
};

interface Props {
  pageName: PageNameEnum;
}

const PageData: FC<Props> = ({ pageName }): ReactElement => {
  const PageComponent = pages[pageName];

  return <PageComponent />;
};

export default PageData;
