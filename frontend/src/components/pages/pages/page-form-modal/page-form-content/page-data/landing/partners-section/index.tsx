import { FC, ReactElement } from 'react';
import Section from '../section';
import { useTranslation } from 'react-i18next';
import { useFormikContext } from 'formik';
import { Partner, IPage, LandingPageData, Image } from '../../../../../../../../services/api/page/dto/page.dto';
import { Box, Button, IconButton, Paper, TextField as MuiTextField } from '@mui/material';
import TextField from '../../../../../../../../common/ui/text-field';
import { DeleteRounded } from '@mui/icons-material';
import ImageField from '../../../../../../../../common/ui/image-field';

const PartnersSection: FC = (): ReactElement | null => {
  const { t } = useTranslation();
  const { values, setFieldValue } = useFormikContext<IPage>();

  const { partners } = values.data as LandingPageData;

  const handleAddItem = () => {
    setFieldValue('data.partners.items', [
      ...partners.items,
      {
        image: null,
        link: '',
      },
    ]);
  };

  const handleRemoveItem = (index: number) => {
    setFieldValue('data.partners.items', [
      ...partners.items.slice(0, index),
      ...partners.items.slice(index + 1),
    ]);
  };

  const handleItemChange = (value: string | Image, field: string, index: number) => {
    setFieldValue(`data.partners.items[${index}][${field}]`, value);
  };

  return (
    <Section
      title={t('pages.section.partners')}
      display={partners.display}
      onDisplayChange={(value) => setFieldValue('data.partners.display', value)}
    >
      <Box display='flex' flexDirection='column' gap={2}>
        <TextField name='data.partners.title' label={t('title')} />
        {
          partners.items.map(({ image, link }: Partner, index) => (
            <Paper sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
            }} key={index}>
              <ImageField image={image} onChange={(file) => handleItemChange(file, 'image', index)} />
              <MuiTextField
                label={t('link')}
                value={link}
                onChange={(e) => handleItemChange(e.target.value, 'link', index)}
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

export default PartnersSection;
