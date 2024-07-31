import {FC, ReactElement, ReactNode, useCallback, useRef} from 'react';
import {DragSourceMonitor, DropTargetMonitor, useDrag, useDrop, XYCoord} from 'react-dnd';
import { BlockType } from '../enum/block-type.enum';
import { DraggableBlock } from '../types';
import TitleBlock from '../blocks/title-block';
import SubtitleBlock from '../blocks/subtitle-block';
import TextBlock from '../blocks/text-block';
import ButtonBlock from '../blocks/button-block';
import LinkBlock from '../blocks/link-block';
import ImageBlock from '../blocks/image-block';
import {v4} from 'uuid';
import {defaultContainerProps, defaultElementProps} from '../default-props-values';
import {BaseProps} from '@mui/material/OverridableComponent';
import { Box } from '@mui/material';

const blockComponents: { [key: string]: FC } = {
  [BlockType.TITLE]: TitleBlock,
  [BlockType.SUBTITLE]: SubtitleBlock,
  [BlockType.TEXT]: TextBlock,
  [BlockType.BUTTON]: ButtonBlock,
  [BlockType.LINK]: LinkBlock,
  [BlockType.IMAGE]: ImageBlock,
};

const DropZone: FC<{ onDrop: (item: any) => void; children: ReactNode }> = ({ onDrop, children }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: Object.values(BlockType),
    drop: (item) => {
      onDrop(item);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      style={{
        backgroundColor: isOver ? '#ececec' : '#fff',
        minHeight: '100px',
        padding: '16px',
        border: '1px solid gray',
      }}
    >
      {children}
    </div>
  );
};

interface DraggableItemProps {
  id: string;
  index: number;
  onMove: (dragIndex: number, hoverIndex: number) => void;
  onClick: () => void;
  children: ReactNode;
}

const DraggableItem: FC<DraggableItemProps> = ({ id, index, onMove, onClick, children }) => {
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: 'ITEM',
    hover: (item: { index: number; id: number }, monitor: DropTargetMonitor) => {
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      onMove(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'ITEM',
    item: { id, index },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.5 : 1;
  drag(drop(ref));

  return (
      <div ref={ref} style={{ opacity, cursor: 'move' }} onClick={onClick}>
        {children}
      </div>
  );
};

interface Props {
  blocks: DraggableBlock[];
  onSelect: (block: DraggableBlock) => void;
  onAdd: (block: DraggableBlock) => void;
  onOrderChange: (block: DraggableBlock, dragIndex: number, hoverIndex: number) => void;
}

const TemplateContainer = ({ blocks, onAdd, onOrderChange, onSelect }: Props): ReactElement => {
  const handleDrop = useCallback(
    (block: DraggableBlock) => {
      onAdd({
        ...block,
        id: v4(),
        elementProps: defaultElementProps[block.type],
        containerProps: defaultContainerProps,
      });
    },
    [blocks],
  );

  const handleMove = (dragIndex: number, hoverIndex: number) => {
    const draggedBlock = blocks[dragIndex];
    onOrderChange(draggedBlock, dragIndex, hoverIndex);
  };

  return (
    <DropZone onDrop={handleDrop}>
      {blocks.map((block, index) => {
        const BlockComponent: FC<BaseProps<any>> = blockComponents[block.type];
        return (
          <DraggableItem
            key={block.id}
            index={index}
            id={block.id}
            onMove={handleMove}
            onClick={() => onSelect(block)}
          >
            <Box {...block.containerProps}>
              <BlockComponent {...block.elementProps} />
            </Box>
          </DraggableItem>
        );
      })}
    </DropZone>
  );
};

export default TemplateContainer;
