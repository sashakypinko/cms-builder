import { FC, ReactElement } from 'react';
import Section from '../section';
import { useTranslation } from 'react-i18next';
import { useFormikContext } from 'formik';
import { Schedule, IPage, LandingPageData } from '../../../../../../../../services/api/page/dto/page.dto';
import { Box, Button, IconButton, Paper, TextField as MuiTextField } from '@mui/material';
import TextField from '../../../../../../../../common/ui/text-field';
import { DeleteRounded } from '@mui/icons-material';
import IconInput from '../../../../../../../../common/ui/icon-input';

const LocationSection: FC = (): ReactElement | null => {
  const { t } = useTranslation();
  const { values, setFieldValue } = useFormikContext<IPage>();

  const { location } = values.data as LandingPageData;

  const handleAddItem = () => {
    setFieldValue('data.location.schedule', [
      ...location.schedule,
      {
        label: '',
        date: '',
        icon: '',
      },
    ]);
  };

  const handleRemoveItem = (index: number) => {
    setFieldValue('data.location.schedule', [
      ...location.schedule.slice(0, index),
      ...location.schedule.slice(index + 1),
    ]);
  };

  const handleItemChange = (value: string, field: string, index: number) => {
    setFieldValue(`data.location.schedule[${index}][${field}]`, value);
  };

  return (
    <Section
      title={t('pages.section.location')}
      display={location.display}
      onDisplayChange={(value) => setFieldValue('data.location.display', value)}
    >
      <Box display='flex' flexDirection='column' gap={2}>
        <TextField name='data.location.title' label={t('title')} />
        {
          location.schedule.map(({ label, date, icon }: Schedule, index) => (
            <Paper sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
            }} key={index}>
              <MuiTextField
                label={t('label')}
                value={label}
                onChange={(e) => handleItemChange(e.target.value, 'label', index)}
              />
              <MuiTextField
                label={t('date')}
                value={date}
                onChange={(e) => handleItemChange(e.target.value, 'date', index)}
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

export default LocationSection;
