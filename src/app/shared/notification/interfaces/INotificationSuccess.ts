export interface INotificationSuccess {
  showSuccessNotification(msg: string, options?: object): Promise<any>;
}
