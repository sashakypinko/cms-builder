import { Box } from '@mui/material';
import { FC, ReactElement } from 'react';
import { BlockType } from '../enum/block-type.enum';
import { useDrag } from 'react-dnd';
import { useTranslation } from 'react-i18next';

const Block: FC<{ type: BlockType; label: string }> = ({ type, label }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type,
    item: { type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <Box ref={drag} sx={{ opacity: isDragging ? 0.5 : 1, padding: '8px', border: '1px dashed gray' }}>
      {label}
    </Box>
  );
};

const BlockList = (): ReactElement => {
  const { t } = useTranslation();

  const draggableItems = [
    { type: BlockType.TITLE, label: t('email-template-editor.title-block.label') },
    { type: BlockType.SUBTITLE, label: t('email-template-editor.subtitle-block.label') },
    { type: BlockType.TEXT, label: t('email-template-editor.text-block.label') },
    { type: BlockType.BUTTON, label: t('email-template-editor.button-block.label') },
    { type: BlockType.LINK, label: t('email-template-editor.link-block.label') },
    { type: BlockType.IMAGE, label: t('email-template-editor.image-block.label') },
  ];

  return (
    <Box>
      {draggableItems.map(({ type, label }, index) => (
        <Block key={index} type={type} label={label} />
      ))}
    </Box>
  );
};

export default BlockList;
