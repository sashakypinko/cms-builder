import { useMemo, useState } from 'react';

const useSidebarToggle = () => {
  const [opened, setOpened] = useState<boolean>(false);

  return useMemo(
    () => ({
      opened,
      toggle: () => {
        setOpened((prevState) => !prevState);
      },
    }),
    [opened],
  );
};

export default useSidebarToggle;
