import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  public toasts: any[] = [];

  public showError(error: string): void {
    this.show({
      body: error
    }, {
      classname: 'text-bg-danger'
    })
  }

  public showSuccess(message: string): void {
    this.show({
      body: message
    }, {
      classname: 'text-bg-success'
    })
  }

  private show(content: any = {}, options: any = {}): void {
    this.toasts.push({content, options})
  }

  public remove(toast: any): void {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }
}
