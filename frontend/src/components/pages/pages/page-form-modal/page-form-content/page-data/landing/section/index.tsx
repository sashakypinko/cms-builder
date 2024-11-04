import { Accordion, AccordionDetails, AccordionSummary, Box, Switch } from '@mui/material';
import { FC, ReactElement, ReactNode } from 'react';
import { ExpandMore } from '@mui/icons-material';

interface Props {
  title: string;
  defaultExpanded?: boolean;
  display?: boolean;
  onDisplayChange?: (newValue: boolean) => void;
  children?: ReactNode;
}

const Section: FC<Props> = ({ title, defaultExpanded, children, display, onDisplayChange }): ReactElement => {
  return (
    <Accordion defaultExpanded={defaultExpanded} expanded={children ? undefined : false}>
      <AccordionSummary
        expandIcon={children && <ExpandMore />}
      >
        <Box width="100%" display="flex" alignItems="center" justifyContent="space-between">
          {title}
          {
            onDisplayChange && (
              <Switch
                checked={display}
                onClick={(e) => {
                  e.stopPropagation();
                  onDisplayChange(!display);
                }}
              />
            )
          }
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        {children}
      </AccordionDetails>
    </Accordion>
  );
};

export default Section;
