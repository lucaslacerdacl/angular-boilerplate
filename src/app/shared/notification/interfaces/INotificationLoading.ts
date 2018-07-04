export interface INotificationLoading {
  openLoading(options?: object): Promise<any>;

  closeLoading(): void;
}
