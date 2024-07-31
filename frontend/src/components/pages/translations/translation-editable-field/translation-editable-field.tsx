import { ChangeEvent, ReactElement, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CircularProgress, IconButton, OutlinedInput, Tooltip } from '@mui/material';
import { CheckRounded, CloseRounded, EditRounded } from '@mui/icons-material';

interface Props {
  value: string;
  onUpdate: (value: string, callback: () => void) => void;
}

const TranslationEditableField = ({ value, onUpdate }: Props): ReactElement => {
  const { t } = useTranslation();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [newValue, setNewValue] = useState<string>(value || '');

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setNewValue(e.target.value);
  };

  const handleSave = (): void => {
    setLoading(true);
    onUpdate(newValue, () => {
      setLoading(false);
      setEditMode(false);
    });
  };

  if (editMode) {
    return (
      <>
        <OutlinedInput
          sx={{
            height: '0 !important',
            padding: '12px !important',
            fontSize: '14px !important',
          }}
          value={newValue}
          onChange={handleChange}
        />
        {loading ? (
          <CircularProgress size={16} color="inherit" />
        ) : (
          <>
            <Tooltip title={t('save')}>
              <IconButton sx={{ ml: 1 }} size="small" onClick={handleSave}>
                <CheckRounded color="success" sx={{ fontSize: '15px' }} />
              </IconButton>
            </Tooltip>
            <Tooltip title={t('cancel')}>
              <IconButton sx={{ ml: 1 }} size="small" onClick={() => setEditMode(false)}>
                <CloseRounded color="error" sx={{ fontSize: '15px' }} />
              </IconButton>
            </Tooltip>
          </>
        )}
      </>
    );
  }

  return (
    <>
      {value}
      <Tooltip title={t('update')}>
        <IconButton sx={{ ml: 1 }} size="small" onClick={() => setEditMode(true)}>
          <EditRounded color="warning" sx={{ fontSize: '15px' }} />
        </IconButton>
      </Tooltip>
    </>
  );
};

export default TranslationEditableField;
