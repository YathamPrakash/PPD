import { Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  //old implementtaion with subject and observable
  //===================================================
  // private errorSubject = new Subject<string>();
  // error$ = this.errorSubject.asObservable();

  // showError(message: string) {
  //   this.errorSubject.next(message);
  // }

   // New Implem,enatt5ion with signal and effect
  //===================================================
  errorMessage = signal<string>('');
  showErrorMessage(message: string) {
    this.errorMessage.set(message);
  }
  clearErrorMessage() {
    this.errorMessage.set('');
  }


}
