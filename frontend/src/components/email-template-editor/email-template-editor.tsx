import { FC, useState } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { Grid } from '@mui/material';
import update from 'immutability-helper';

import { DraggableBlock } from './types';
import BlockList from './block-list';
import TemplateContainer from './template-container';
import BlockEditor from './block-editor';

const EmailTemplateEditor: FC = () => {
  const [blocks, setBlocks] = useState<DraggableBlock[]>([]);
  const [selectedBlock, setSelectedBlock] = useState<DraggableBlock | null>(null);

  const handleAdd = (block: DraggableBlock) => {
    setBlocks((prevState) => [...prevState, block]);
  };

  const handleOrderChange = (block: DraggableBlock, dragIndex: number, hoverIndex: number) => {
    setBlocks(update(blocks, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, block],
      ],
    }));
  };

  const handleBlockChange = (block: DraggableBlock) => {
    const blockIndex = blocks.findIndex(({ id }) => block.id === id);
    setBlocks([
      ...blocks.slice(0, blockIndex),
      block,
      ...blocks.slice(blockIndex + 1),
    ]);
    setSelectedBlock(block);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <BlockList />
        </Grid>
        <Grid item xs={12} md={5}>
          <TemplateContainer
              blocks={blocks}
              onAdd={handleAdd}
              onOrderChange={handleOrderChange}
              onSelect={setSelectedBlock}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <BlockEditor
            block={selectedBlock}
            onChange={handleBlockChange}
          />
        </Grid>
      </Grid>
    </DndProvider>
  );
};

export default EmailTemplateEditor;
