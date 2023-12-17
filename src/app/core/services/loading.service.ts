import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loadingSub = new BehaviorSubject<boolean>(false);
  get loading$(): Observable<boolean> {
    return this.loadingSub.asObservable();
  }
  set loading(loading: boolean) {
    this.loadingSub.next(loading);
  }
}
