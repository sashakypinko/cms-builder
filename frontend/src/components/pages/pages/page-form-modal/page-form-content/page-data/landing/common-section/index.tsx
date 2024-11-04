import { FC, ReactElement } from 'react';
import Section from '../section';
import { useTranslation } from 'react-i18next';
import { useFormikContext } from 'formik';
import { IPage, LandingPageData, NetworkLink } from '../../../../../../../../services/api/page/dto/page.dto';
import { Box, Button, IconButton, Paper, TextField as MuiTextField } from '@mui/material';
import TextField from '../../../../../../../../common/ui/text-field';
import { DeleteRounded } from '@mui/icons-material';
import IconInput from '../../../../../../../../common/ui/icon-input';

const CommonSection: FC = (): ReactElement | null => {
  const { t } = useTranslation();
  const { values, setFieldValue } = useFormikContext<IPage>();

  const { common } = values.data as LandingPageData;

  const handleAddLink = () => {
    setFieldValue('data.common.links', [
      ...common.links,
      {
        link: '',
        icon: '',
      },
    ]);
  };

  const handleRemoveLink = (index: number) => {
    setFieldValue('data.common.links', [
      ...common.links.slice(0, index),
      ...common.links.slice(index + 1),
    ]);
  };

  const handleLinkChange = (value: string, field: string, index: number) => {
    setFieldValue(`data.common.links[${index}][${field}]`, value);
  };

  return (
    <Section title={t('pages.section.common')} defaultExpanded>
      <Box display='flex' flexDirection='column' gap={2}>
        <TextField name='data.common.bank' label={t('bank')} />
        <TextField name='data.common.address' label={t('address')} />
        <TextField name='data.common.contact' label={t('contact')} />
        {
          common.links.map(({ link, icon }: NetworkLink, index) => (
            <Paper sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
            }} key={index}>
              <MuiTextField
                label={t('link')}
                value={link}
                onChange={(e) => handleLinkChange(e.target.value, 'link', index)}
              />
              <IconInput
                value={icon}
                onChange={(newIcon) => handleLinkChange(newIcon, 'icon', index)}
              />
              <Box display='flex' justifyContent='end'>
                <IconButton color='error' onClick={() => handleRemoveLink(index)}>
                  <DeleteRounded />
                </IconButton>
              </Box>
            </Paper>
          ))
        }
        <Button variant='contained' onClick={handleAddLink}>{t('add')}</Button>
      </Box>
    </Section>
  );
};

export default CommonSection;
