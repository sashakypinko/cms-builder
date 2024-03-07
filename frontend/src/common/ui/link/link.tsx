import { Link as RouterLink } from 'react-router-dom';
import { type ReactElement, type ReactNode } from 'react';
import { type Theme } from '@mui/material/styles';
import { styled, useTheme } from '@mui/material';

const StyledLink = styled(RouterLink)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.text.primary,
}));

interface Props {
  to: string;
  children: ReactNode;
}

const Link = ({ to, children }: Props): ReactElement => {
  const theme: Theme = useTheme();

  return (
    <StyledLink theme={theme} to={to}>
      {children}
    </StyledLink>
  );
};

export default Link;
