export interface INotificationError {
  showErrorNotification(msg: string, options?: object): Promise<any>;
}
