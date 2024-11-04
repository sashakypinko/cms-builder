import { IPage } from '../../services/api/page/dto/page.dto';

export type PagesState = {
  pages: IPage[];
  loading: boolean;
  error: any;
};

export type PageActionPayload = {
  page: IPage;
  onSuccess: () => void;
  onError: (error: any) => void;
};

export type DeletePageActionPayload = {
  id: string;
  onSuccess: () => void;
  onError: (error: any) => void;
};

