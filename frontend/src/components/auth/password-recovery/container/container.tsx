import { ReactElement, ReactNode } from 'react';
import { Box, Typography } from '@mui/material';

interface Props {
  title: string;
  subtitle?: string;
  description?: string;
  children: ReactNode;
}

const Container = ({ children, title, subtitle, description }: Props): ReactElement => {
  return (
    <Box>
      <Typography variant="h3" sx={{ mb: 3 }}>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          {subtitle}
        </Typography>
      )}
      {description && <Typography sx={{ mb: 7 }}>{description}</Typography>}
      <Box sx={{ mt: 1 }}>{children}</Box>
    </Box>
  );
};

export default Container;
