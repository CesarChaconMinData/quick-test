import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingRequestCount = 0;
  private loading = new BehaviorSubject<boolean>(false);
  private isLoadingCurrent = false;

  get isLoading() {
    return this.loading.asObservable();
  }

  get isLoadingShow() {
    return this.isLoadingCurrent;
  }

  show() {
    this.loadingRequestCount++;
    this.isLoadingCurrent = true;
    this.loading.next(true);
  }

  hide() {
    this.loadingRequestCount--;
    if (this.loadingRequestCount <= 0) {
      this.loadingRequestCount = 0;
      this.isLoadingCurrent = false;
      this.loading.next(false);
    }
  }
}
