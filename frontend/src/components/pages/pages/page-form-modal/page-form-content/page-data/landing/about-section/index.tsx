import { FC, ReactElement } from 'react';
import Section from '../section';
import { useTranslation } from 'react-i18next';
import { useFormikContext } from 'formik';
import { About, IPage, LandingPageData } from '../../../../../../../../services/api/page/dto/page.dto';
import { Box, Button, IconButton, Paper, TextField as MuiTextField } from '@mui/material';
import TextField from '../../../../../../../../common/ui/text-field';
import { DeleteRounded } from '@mui/icons-material';
import IconInput from '../../../../../../../../common/ui/icon-input';

const AboutSection: FC = (): ReactElement | null => {
  const { t } = useTranslation();
  const { values, setFieldValue } = useFormikContext<IPage>();

  const { about } = values.data as LandingPageData;

  const handleAddItem = () => {
    setFieldValue('data.about.items', [
      ...about.items,
      {
        title: '',
        text: '',
        icon: '',
      },
    ]);
  };

  const handleRemoveItem = (index: number) => {
    setFieldValue('data.about.items', [
      ...about.items.slice(0, index),
      ...about.items.slice(index + 1),
    ]);
  };

  const handleItemChange = (value: string, field: string, index: number) => {
    setFieldValue(`data.about.items[${index}][${field}]`, value);
  };

  return (
    <Section
      title={t('pages.section.about')}
      display={about.display}
      onDisplayChange={(value) => setFieldValue('data.about.display', value)}
    >
      <Box display='flex' flexDirection='column' gap={2}>
        <TextField name='data.about.title' label={t('title')} />
        {
          about.items.map(({ title, text, icon }: About, index) => (
            <Paper sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
            }} key={index}>
              <MuiTextField
                label={t('title')}
                value={title}
                onChange={(e) => handleItemChange(e.target.value, 'title', index)}
              />
              <MuiTextField
                label={t('text')}
                value={text}
                onChange={(e) => handleItemChange(e.target.value, 'text', index)}
              />
              <IconInput
                value={icon}
                onChange={(newIcon) => handleItemChange(newIcon, 'icon', index)}
              />
              <Box display='flex' justifyContent='end'>
                <IconButton color='error' onClick={() => handleRemoveItem(index)}>
                  <DeleteRounded />
                </IconButton>
              </Box>
            </Paper>
          ))
        }
        <Button variant='contained' onClick={handleAddItem}>{t('add')}</Button>
      </Box>
    </Section>
  );
};

export default AboutSection;
