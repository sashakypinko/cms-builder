import {BlockType} from './enum/block-type.enum';
import {ButtonProps} from '@mui/material/Button/Button';
import {BoxProps, LinkProps, TypographyProps} from '@mui/material';
import {BaseProps} from '@mui/material/OverridableComponent';

export const defaultContainerProps: BoxProps = {
  sx: {
    display: 'flex',
    padding: 1,
  },
};

export const defaultTextProps: TypographyProps = {
  sx: {},
};

export const defaultButtonProps: ButtonProps = {
  variant: 'contained',
  sx: {},
};

export const defaultLinkProps: LinkProps = {
  sx: {},

};

export const defaultImageProps: BoxProps = {
  sx: {},

};

export const defaultElementProps: {[key: string]: BaseProps<any>} = {
  [BlockType.TEXT]: defaultTextProps,
  [BlockType.BUTTON]: defaultButtonProps,
  [BlockType.LINK]: defaultLinkProps,
  [BlockType.IMAGE]: defaultImageProps,
};
