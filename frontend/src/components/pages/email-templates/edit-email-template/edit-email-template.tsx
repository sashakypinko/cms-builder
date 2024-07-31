import { ReactElement } from 'react';
import PageCard from '../../../../common/ui/page-card';
import { useTranslation } from 'react-i18next';
import EmailTemplateEditor from '../../../email-template-editor';

const EditEmailTemplate = (): ReactElement => {
  const { t } = useTranslation();

  return (
    <PageCard title={t('email-templates.edit.title')}>
      <EmailTemplateEditor />
    </PageCard>
  );
};

export default EditEmailTemplate;
