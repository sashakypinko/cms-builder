import { type FC } from 'react';

export interface RouteInterface {
  path: string;
  Component: FC<any>;
  authOnly?: boolean;
  notAuthOnly?: boolean;
  allowedFor?: string[];
  redirectTo?: string;
}
