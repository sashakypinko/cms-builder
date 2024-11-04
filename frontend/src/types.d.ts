declare namespace App {
  namespace Store {
    export interface Auth {
      authData: AuthResponseInterface | null;
      loading: boolean;
      error: unknown;
    }

    export interface Languages {
      languages: ILanguage[];
      loading: boolean;
      error: unknown;
    }

    export interface Users {
      users: IUser[];
      loading: boolean;
      error: unknown;
    }

    export interface Notifications {
      notifications: INotification[];
      loading: boolean;
      error: unknown;
    }

    export interface Pages {
      pages: IPage[];
      loading: boolean;
      error: unknown;
    }

    export interface UI {
      successSnackbar: string;
      errorSnackbar: string;
      infoSnackbar: string;
    }
  }
}
