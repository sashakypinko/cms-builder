import { createContext } from 'react';

export const SidebarContext = createContext({
  opened: false,
  /* eslint-disable @typescript-eslint/no-empty-function */
  toggle: () => {},
});
