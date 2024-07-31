import { BlockType } from './enum/block-type.enum';
import { BaseProps } from '@mui/material/OverridableComponent';

export type DraggableBlock = {
    id: string,
    type: BlockType,
    elementProps: BaseProps<any>,
    containerProps: BaseProps<any>,
};
