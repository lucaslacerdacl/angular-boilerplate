export interface INotificationQuestion {
  showQuestionNotification(msg: string, options?: object): Promise<any>;
}
