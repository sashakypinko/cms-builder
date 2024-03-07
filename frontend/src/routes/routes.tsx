import React, { type ReactElement, useMemo } from 'react';
import { Navigate, Route, Routes as CommonRoutes } from 'react-router-dom';
import SignIn from '../components/auth/sign-in';
import SignUp from '../components/auth/sign-up';
import { Main, Languages, Translations, Users } from '../components/pages';
import useAuthorized from '../hooks/use-authorized.hook';
import { type RouteInterface } from './interfaces/route.interface';
import { RouteEnum } from './enums/route.enum';
import Verify from '../components/auth/verify';

const DEFAULT_REDIRECT: string = RouteEnum.SIGN_IN;

const routes: RouteInterface[] = [
  {
    path: RouteEnum.SIGN_IN,
    Component: SignIn,
    notAuthOnly: true,
    redirectTo: RouteEnum.MAIN,
  },
  {
    path: RouteEnum.SIGN_UP,
    Component: SignUp,
    notAuthOnly: true,
    redirectTo: RouteEnum.MAIN,
  },
  {
    path: RouteEnum.VERIFY,
    Component: Verify,
    notAuthOnly: true,
    redirectTo: RouteEnum.MAIN,
  },
  {
    path: RouteEnum.MAIN,
    Component: Main,
    authOnly: true,
  },
  {
    path: RouteEnum.LANGUAGES,
    Component: Languages,
    authOnly: true,
  },
  {
    path: RouteEnum.TRANSLATIONS,
    Component: Translations,
    authOnly: true,
  },
  {
    path: RouteEnum.USERS,
    Component: Users,
    authOnly: true,
  },
];

const Routes = (): ReactElement => {
  const isAuthorized: boolean | null = useAuthorized();

  const allowedRoutes: RouteInterface[] = useMemo(() => {
    if (isAuthorized !== null) {
      return routes.map((route: RouteInterface) => {
        if ((route.authOnly && isAuthorized) || (route.notAuthOnly && !isAuthorized)) {
          return route;
        }

        return {
          ...route,
          Component: () => <Navigate to={route.redirectTo || DEFAULT_REDIRECT} />,
        };
      });
    }
    return [];
  }, [isAuthorized]);

  return (
    <CommonRoutes>
      {allowedRoutes.map((route: RouteInterface, key: number) => (
        <Route key={key} path={route.path} Component={route.Component} />
      ))}
      <Route path={RouteEnum.NOT_FOUND} Component={() => <div>404 Not Found</div>} />
    </CommonRoutes>
  );
};

export default Routes;
