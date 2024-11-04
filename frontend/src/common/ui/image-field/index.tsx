import React, { ReactElement, useMemo } from 'react';
import { Box, Skeleton, styled } from '@mui/material';
import FileField from '../file-field';

const Image = styled('img')(
  () => `
    width: auto;
    height: 140px;
`,
);

interface Props {
  image: File | string | null;
  loading?: boolean;
  onChange: (file: File) => void;
}

const ImageField = ({ image, onChange, loading }: Props): ReactElement => {
  const url = useMemo(() => {
    if (typeof image === 'string') return image;
    if (image) return URL.createObjectURL(image);

    return require('../../../assets/img/default-image.svg');
  }, [image]);

  return (
    <Box display="flex" justifyContent="center">
      <Box sx={{ mt: 3 }}>
        {loading ? (
          <Skeleton sx={{ borderRadius: '50%' }} variant="rectangular" width={140} height={140} />
        ) : (
          <Image src={url} alt="image" />
        )}
        <Box width="100%" textAlign="center">
          <FileField variant="text" onChange={onChange} disabled={loading}>
            Change
          </FileField>
        </Box>
      </Box>
    </Box>
  );
};

export default ImageField;
