import {ChangeEvent, FC, ReactElement} from 'react';
import { DraggableBlock } from '../types';
import { Grid, TextField, Typography } from '@mui/material';
import update from 'immutability-helper';

interface BlockEditorProps {
  block: DraggableBlock | null;
  onChange: (block: DraggableBlock) => void;
}

const unit = 'px';

const BlockEditor: FC<BlockEditorProps> = ({ block, onChange }): ReactElement => {
  const handleChange = (value: string | number, field: string) => {
    if (!block) return;
    onChange(
      update(block, {
        containerProps: {
          sx: {
            [field]: { $set: `${value}px` },
          }
        }
      })
    );
  };

  if (!block) {
    return (
      <Typography>
        Not selected
      </Typography>
    );
  }

  const {
    paddingLeft = '0',
    paddingRight = '0',
    paddingTop = '0',
    paddingBottom = '0',
  } = block.containerProps.sx;

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={3}>
        <TextField
          label="padding-left"
          type="number"
          value={paddingLeft.replace(unit, '')}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e.target.value, 'paddingLeft')}
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <TextField
          label="padding-right"
          type="number"
          value={paddingRight.replace(unit, '')}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e.target.value, 'paddingRight')}
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <TextField
          label="padding-top"
          type="number"
          value={paddingTop.replace(unit, '')}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e.target.value, 'paddingTop')}
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <TextField
          label="padding-bottom"
          type="number"
          value={paddingBottom.replace(unit, '')}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e.target.value, 'paddingBottom')}
        />
      </Grid>
    </Grid>
  );
};

export default BlockEditor;
