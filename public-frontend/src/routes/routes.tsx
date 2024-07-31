import React, { type ReactElement } from 'react';
import { Route, Routes as CommonRoutes } from 'react-router-dom';
import { Main } from '../components/pages';
import { type RouteInterface } from './interfaces/route.interface';
import { RouteEnum } from './enums/route.enum';

const routes: RouteInterface[] = [
  {
    path: RouteEnum.MAIN,
    Component: Main,
  },
];

const Routes = (): ReactElement => {
  return (
    <CommonRoutes>
      {routes.map((route: RouteInterface, key: number) => (
        <Route key={key} path={route.path} Component={route.Component} />
      ))}
      <Route path={RouteEnum.NOT_FOUND} Component={() => <div>404 Not Found</div>} />
    </CommonRoutes>
  );
};

export default Routes;
