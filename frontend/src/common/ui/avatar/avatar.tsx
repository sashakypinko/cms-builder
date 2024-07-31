import { Avatar as AvatarIcon, styled } from '@mui/material';

const Image = styled('img')({
  width: 32,
  height: 32,
  objectFit: 'cover',
  borderRadius: '80px',
});

interface Props {
  src: string | null;
}

const Avatar = ({ src }: Props) => {
  if (src) {
    return <Image src={src} alt="avatar" />;
  }

  return <AvatarIcon sx={{ width: 32, height: 32 }} />;
};

export default Avatar;
