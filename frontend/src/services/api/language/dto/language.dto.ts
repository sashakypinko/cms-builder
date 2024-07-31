export interface ILanguage {
  _id?: string;
  code: string;
  isActive: boolean;
  translations: any;
  isMain?: boolean;
}
