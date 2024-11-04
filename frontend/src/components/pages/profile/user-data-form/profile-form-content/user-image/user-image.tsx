import React, { ReactElement, useMemo } from 'react';
import { Box, Skeleton, styled } from '@mui/material';
import FileField from '../../../../../../common/ui/file-field';

const Image = styled('img')(
  () => `
    width: 140px;
    height: 140px;
    object-fit: cover;
    border-radius: 80px;
`,
);

interface Props {
  image: File | string | null;
  loading: boolean;
  onChange: (file: File) => void;
}

const UserImage = ({ image, onChange, loading }: Props): ReactElement => {
  const avatarUrl = useMemo(() => {
    if (typeof image === 'string') return image;
    if (image) return URL.createObjectURL(image);

    return require('../../../../../../assets/img/default-image.svg');
  }, [image]);

  return (
    <Box display="flex" justifyContent="center">
      <Box sx={{ mt: 3 }}>
        {loading ? (
          <Skeleton sx={{ borderRadius: '50%' }} variant="rectangular" width={140} height={140} />
        ) : (
          <Image src={avatarUrl} />
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

export default UserImage;
