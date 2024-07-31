import { type ReactNode } from 'react';
import { Box, Typography, Container, Paper } from '@mui/material';

interface Props {
  title: string;
  children: ReactNode;
}

const PageCard = ({ title, children }: Props) => {
  return (
    <Container sx={{ mt: 10 }} maxWidth="xl">
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2, p: 2 }}>
          <Typography sx={{ padding: '0 24px' }} variant="h5">
            {title}
          </Typography>
          {children}
        </Paper>
      </Box>
    </Container>
  );
};

export default PageCard;
