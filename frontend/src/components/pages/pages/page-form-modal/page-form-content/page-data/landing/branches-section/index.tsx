import { FC, ReactElement } from 'react';
import Section from '../section';
import { useTranslation } from 'react-i18next';
import { useFormikContext } from 'formik';
import { Branch, IPage, LandingPageData } from '../../../../../../../../services/api/page/dto/page.dto';
import { Box, Button, IconButton, Paper, TextField as MuiTextField } from '@mui/material';
import TextField from '../../../../../../../../common/ui/text-field';
import { DeleteRounded } from '@mui/icons-material';

const BranchesSection: FC = (): ReactElement | null => {
  const { t } = useTranslation();
  const { values, setFieldValue } = useFormikContext<IPage>();

  const { branches } = values.data as LandingPageData;

  const handleAddItem = () => {
    setFieldValue('data.branches.items', [
      ...branches.items,
      {
        name: '',
        address: '',
        days: [],
      },
    ]);
  };

  const handleRemoveItem = (index: number) => {
    setFieldValue('data.branches.items', [
      ...branches.items.slice(0, index),
      ...branches.items.slice(index + 1),
    ]);
  };

  const handleItemChange = (value: string, field: string, index: number) => {
    setFieldValue(`data.branches.items[${index}][${field}]`, value);
  };

  return (
    <Section
      title={t('pages.section.branches')}
      display={branches.display}
      onDisplayChange={(value) => setFieldValue('data.branches.display', value)}
    >
      <Box display='flex' flexDirection='column' gap={2}>
        <TextField name='data.branches.title' label={t('title')} />
        {
          branches.items.map(({ name, address, days }: Branch, index) => (
            <Paper sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
            }} key={index}>
              <MuiTextField
                label={t('name')}
                value={name}
                onChange={(e) => handleItemChange(e.target.value, 'name', index)}
              />
              <MuiTextField
                label={t('address')}
                value={address}
                onChange={(e) => handleItemChange(e.target.value, 'address', index)}
              />
              <MuiTextField
                label={t('days')}
                value={days}
                onChange={(e) => handleItemChange(e.target.value, 'days', index)}
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

export default BranchesSection;
