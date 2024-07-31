export enum RouteEnum {
  MAIN = '/',
  SIGN_IN = '/signin',
  SIGN_UP = '/signup',
  VERIFY = '/verify',
  PASSWORD_RECOVERY = '/forgot-password',
  LANGUAGES = '/languages',
  TRANSLATIONS = '/translations',
  USERS = '/users',
  PROFILE = '/users/:id',
  EMAIL_TEMPLATES = '/email-templates',
  EDIT_EMAIL_TEMPLATE = '/email-templates/edit',
  NOT_FOUND = '*',
}
