import { computed, Injectable, signal } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { inject } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  toastr = inject(ToastrService);
  private activeRequests = signal(0);
  readonly isLoading = computed(
    () => this.activeRequests() > 0
  );

  constructor() {
    console.log('isLoading:', this.isLoading());
   }

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
    //this.errorMessage.set(message);
    this.toastr.error(message, 'Error');
  }
  clearErrorMessage() {
    //  this.errorMessage.set('');
  }

  show(): void {
    this.activeRequests.update(count => {
      console.log('Loader show:', count + 1);
      return count + 1;
    });
  }

  hide(): void {
    this.activeRequests.update(count => {
      console.log('Loader hide:', Math.max(0, count - 1));
      return Math.max(0, count - 1);
    });
  }

}
