import { Component } from '@angular/core';
import { OperatorDetailsComponent } from './steps/operator-details/operator-details.component';
import { LeaseDetailsComponent } from './steps/lease-details/lease-details.component';
import { PgDetailsComponent } from './steps/pg-details/pg-details.component';
import { PgPhotosComponent } from './steps/pg-photos/pg-photos.component';
import { PropertyOwnerDetailsComponent } from './steps/property-owner-details/property-owner-details.component';
import { ReviewSubmissionComponent } from './steps/review-submission/review-submission.component';
import { AmentiesComponent } from './steps/amenties/amenties.component';



interface OnboardingStep {
  number: number;
  label: string;
  shortLabel: string;

}


interface SubmissionFlowItem {
  number: number;
  title: string;
}


@Component({
  selector: 'app-pg-onboarding',
  standalone: true,
  imports: [OperatorDetailsComponent, LeaseDetailsComponent, PgDetailsComponent, PgPhotosComponent, PropertyOwnerDetailsComponent, ReviewSubmissionComponent, AmentiesComponent],
  templateUrl: './pg-onboarding.component.html',
  styleUrls: ['./pg-onboarding.component.scss']
})
export class PgOnboardingComponent {
  // =====================================================
  // CURRENT STEP
  // =====================================================

  currentStep = 1;


  // =====================================================
  // SUBMISSION STATE
  // =====================================================

  isSubmitted = false;


  // =====================================================
  // PAGE CONTENT
  // =====================================================

  pageContent = {
    eyebrow: 'LIST YOUR PG',
    title: 'List your PG on StayNest',
    description: 'Complete the details below to list your PG and start managing your property.',
    completedStatus: 'Pending Owner Approval',
    completedTitle: 'PG submitted successfully',
    completedDescription: 'Your PG listing has been submitted and is now waiting for property owner verification.'

  };


  // =====================================================
  // ONBOARDING STEPS
  // =====================================================

  steps: OnboardingStep[] = [

    {
      number: 1,
      label: 'Operator Details',
      shortLabel: 'Operator'
    },

    {
      number: 2,
      label: 'PG Details',
      shortLabel: 'PG'
    },

    {
      number: 3,
      label: 'Amenities',
      shortLabel: 'Amenities'
    },

    {
      number: 4,
      label: 'PG Photos',
      shortLabel: 'Photos'
    },

    {
      number: 5,
      label: 'Property Owner',
      shortLabel: 'Owner'
    },

    {
      number: 6,
      label: 'Lease Details',
      shortLabel: 'Lease'
    },

    {
      number: 7,
      label: 'Review & Submit',
      shortLabel: 'Review'
    }

  ];


  // =====================================================
  // SUBMISSION FLOW
  // =====================================================

  submissionFlow: SubmissionFlowItem[] = [

    {
      number: 1,
      title: 'Listing Submitted'
    },

    {
      number: 2,
      title: 'Owner Verification'
    },

    {
      number: 3,
      title: 'Owner Approval'
    },

    {
      number: 4,
      title: 'Management Access'
    }

  ];


  // =====================================================
  // CURRENT STEP DATA
  // =====================================================

  get currentStepData(): OnboardingStep {

    return this.steps[this.currentStep - 1];

  }


  // =====================================================
  // NEXT
  // =====================================================

  nextStep(): void {

    if (this.currentStep < this.steps.length) {

      this.currentStep++;

      this.scrollToTop();

    }

  }


  // =====================================================
  // BACK
  // =====================================================

  previousStep(): void {

    if (this.currentStep > 1) {

      this.currentStep--;

      this.scrollToTop();

    }

  }


  // =====================================================
  // GO TO STEP
  // =====================================================

  goToStep(stepNumber: number): void {

    if (
      stepNumber >= 1 &&
      stepNumber <= this.currentStep
    ) {

      this.currentStep = stepNumber;

      this.scrollToTop();

    }

  }


  // =====================================================
  // COMPLETED
  // =====================================================

  isStepCompleted(stepNumber: number): boolean {

    return stepNumber < this.currentStep;

  }


  // =====================================================
  // ACTIVE
  // =====================================================

  isStepActive(stepNumber: number): boolean {

    return stepNumber === this.currentStep;

  }


  // =====================================================
  // SUBMIT
  // =====================================================

  submitOnboarding(): void {

    this.isSubmitted = true;

    this.scrollToTop();

    console.log(
      'PG onboarding submitted successfully'
    );

  }


  // =====================================================
  // NEW LISTING
  // =====================================================

  startNewListing(): void {

    this.currentStep = 1;

    this.isSubmitted = false;

    this.scrollToTop();

  }


  // =====================================================
  // SCROLL
  // =====================================================

  private scrollToTop(): void {

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

  }

}