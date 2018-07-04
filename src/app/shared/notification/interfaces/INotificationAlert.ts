export interface INotificationAlert {
  showAlertNotification(msg: string, options?: object): Promise<any>;
}
