import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink,Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HomeHeaderComponent } from '../../../Shared/components/home-header/home-header.component';
import { HomeFooterComponent } from '../../../Shared/components/home-footer/home-footer.component';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { _doCheckStrongPassword, _doCheckEmailValidator, _doCheckConfirmPassword } from '../../../Validators/custom-validators';
import { ApiServiceService } from '../../../Services/api-service.service';
import { CommonService } from '../../../Services/common.service';
import { finalize } from 'rxjs';
import { CanComponentDeactivate } from '../../../Shared/models/can-component-deactivate';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [HomeHeaderComponent, HomeFooterComponent, CommonModule, ReactiveFormsModule,RouterLink ],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements CanComponentDeactivate  {
  intent: 'guest' | 'pg-operator' = 'guest';
  registrationForm!: FormGroup;
  isSubmitted = false;
  showPassword = false;
  showConfirmPassword = false;

  constructor(private route: ActivatedRoute, private fb: FormBuilder,
    private apiService: ApiServiceService,
    private commonService: CommonService,
    private router: Router
  ) {
    this.route.queryParams.subscribe(params => {
      this.intent = params['intent'] || 'guest';
    });
  }

  canDeactivate(): boolean {
    return this.registrationForm.dirty;
  }

  @HostListener('window:beforeunload', ['$event'])
  _doHandleBeforeUnload(event: BeforeUnloadEvent): void {

    if (this.registrationForm.dirty) {
      event.preventDefault();
      event.returnValue = '';
    }
  }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, _doCheckEmailValidator()]],
      password: ['', [Validators.required, _doCheckStrongPassword()]],
      dateOfBirth: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      role: [this.intent, [Validators.required]],
      termsAndConditions: [false, [Validators.requiredTrue]]
    },
      {
        validators: _doCheckConfirmPassword()
      })
  }

  _doTogglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  _doToggleConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
  _doSubmitRegistration() {
    this.router.navigate(['/pg-onboarding']);
    console.log(this.registrationForm);
    this.isSubmitted = true;
    if (this.registrationForm.invalid) {
      this.registrationForm.markAllAsTouched();
      return;
    }
    else {
      const payload = {
        userName: this.registrationForm.get('userName')?.value,
        email: this.registrationForm.get('email')?.value,
        password: this.registrationForm.get('password')?.value,
        dateOfBirth: this.registrationForm.get('dateOfBirth')?.value,
        gender: this.registrationForm.get('gender')?.value,
        role: this.registrationForm.get('role')?.value,
      };
      console.log(this.registrationForm.value);
      this.apiService.post('auth/register', payload).pipe(
        finalize(() => {
          console.log('Registration request completed.');
         // this.registrationForm.reset();
        })
      ).subscribe({
        next: (resonse) => {
          console.log('Registration successful:', resonse);
          this.commonService.showErrorMessage('Registration successful! Please login.');
        },
        error: (error) => {
          console.error('Registration failed:', error);
        }
      })
    }
  }
}
