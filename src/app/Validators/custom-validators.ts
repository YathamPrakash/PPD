import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';


// null = this validator has no error, so Angular removes / clears that validator's error.
// ValidationErrors = this validator has an error, and Angular stores those errors on the control.
// AbstractControl is a base class in Angular Reactive Forms. It represents a form control and provides common properties/methods used by FormControl, FormGroup, and FormArray.

export function _doCheckStrongPassword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const password = control.value;
        if (!password) {
            return null
        }
        const hasminLength = password.length >= 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumeric = /[0-9]/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        const isValid = hasminLength && hasUpperCase && hasLowerCase && hasNumeric && hasSpecialChar;
        return isValid ? null : { strongPassword: true };
    }
}


export function _doCheckEmailValidator():ValidatorFn {
    return (control:AbstractControl):ValidationErrors | null=>{
        const email=control.value;

        if(!email){
            return null
        }
        const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid=emailRegex.test(email);
        return isValid ? null : { emailValidator: true };
    }
}

export function _doCheckConfirmPassword():ValidatorFn{
    return (control:AbstractControl):ValidationErrors| null =>{
        const password=control.get('password')?.value;
        const confirmPassword=control.get('confirmPassword')?.value;
        if(!password || !confirmPassword){
            return null
        }
        return password === confirmPassword ? null : { passwordMismatch: true };
    }

}
