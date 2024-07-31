export interface INotification {
  _id: string;
  userId: string;
  title: string;
  content: string;
  route: string;
  viewed: boolean;
  opened: boolean;
  createdAt: string;
  updatedAt: string;
}
