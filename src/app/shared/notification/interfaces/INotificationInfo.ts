export interface INotificationInfo {
  showInfoNotification(msg: string, options?: object): Promise<any>;
}
