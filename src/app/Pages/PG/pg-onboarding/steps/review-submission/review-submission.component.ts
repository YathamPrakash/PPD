import { Component } from '@angular/core';

interface ReviewItem {
  label: string;
  value: string;
}

interface ReviewSection {
  id: string;
  title: string;
  icon: string;
  items: ReviewItem[];
}
@Component({
  selector: 'app-review-submission',
  standalone: true,
  imports: [],
  templateUrl: './review-submission.component.html',
  styleUrl: './review-submission.component.scss'
})
export class ReviewSubmissionComponent {



  // =====================================================
  // PAGE CONTENT
  // =====================================================

  pageContent = {

    step: 'STEP 7 OF 7',

    title: 'Review & Submit',

    description:
      'Review the information you provided before submitting your PG listing for verification.',

    reviewMessage:
      'Please make sure all the information below is correct before submitting.',

    submitMessage:
      'Once submitted, the property owner will be contacted for verification and approval.'
  };


  // =====================================================
  // REVIEW DATA
  // =====================================================

  reviewSections: ReviewSection[] = [

    {
      id: 'operator',

      title: 'Your Details',

      icon: '👤',

      items: [

        {
          label: 'Name',
          value: 'Jaya Prakash'
        },

        {
          label: 'Email',
          value: 'jaya@example.com'
        },

        {
          label: 'Phone',
          value: '+91 98765 43210'
        },

        {
          label: 'City',
          value: 'Bangalore'
        }

      ]
    },


    {
      id: 'pg',

      title: 'PG Details',

      icon: '🏠',

      items: [

        {
          label: 'PG Name',
          value: 'StayNest Comfort PG'
        },

        {
          label: 'PG Type',
          value: 'Co-living'
        },

        {
          label: 'PG For',
          value: 'Students & Working Professionals'
        },

        {
          label: 'Occupancy',
          value: 'Double Sharing'
        },

        {
          label: 'Total Rooms',
          value: '20'
        },

        {
          label: 'Total Beds',
          value: '40'
        }

      ]
    },


    {
      id: 'amenities',

      title: 'Amenities',

      icon: '✨',

      items: [

        {
          label: 'Available Amenities',
          value: 'Wi-Fi, Food, CCTV, Hot Water, Parking'
        }

      ]
    },


    {
      id: 'photos',

      title: 'PG Photos',

      icon: '📷',

      items: [

        {
          label: 'Photos Added',
          value: '8 Photos'
        },

        {
          label: 'Required Photos',
          value: 'Exterior, Bedroom'
        }

      ]
    },


    {
      id: 'owner',

      title: 'Property Owner',

      icon: '👤',

      items: [

        {
          label: 'Owner Name',
          value: 'Ramesh Kumar'
        },

        {
          label: 'Phone',
          value: '+91 99887 66554'
        },

        {
          label: 'Email',
          value: 'owner@example.com'
        },

        {
          label: 'Relationship',
          value: 'I have taken the property on lease'
        }

      ]
    },


    {
      id: 'lease',

      title: 'Lease Details',

      icon: '📄',

      items: [

        {
          label: 'Lease Start',
          value: '01 January 2026'
        },

        {
          label: 'Lease End',
          value: '31 December 2028'
        },

        {
          label: 'Lease Duration',
          value: '3 Years'
        },

        {
          label: 'Monthly Lease Amount',
          value: '₹45,000'
        },

        {
          label: 'Security Deposit',
          value: '₹2,00,000'
        },

        {
          label: 'Agreement Type',
          value: 'Registered Lease Agreement'
        }

      ]
    }

  ];


  // =====================================================
  // VERIFICATION FLOW
  // =====================================================

  verification = {

    title: 'What happens after submission?',

    steps: [

      {
        number: 1,
        title: 'Listing Submitted',
        description:
          'Your PG details will be submitted for verification.'
      },

      {
        number: 2,
        title: 'Owner Verification',
        description:
          'The property owner will receive a verification request.'
      },

      {
        number: 3,
        title: 'Owner Approval',
        description:
          'The owner must approve the property listing.'
      },

      {
        number: 4,
        title: 'Management Access',
        description:
          'After approval, you can manage the PG through StayNest.'
      }

    ]
  };


  // =====================================================
  // SUBMISSION AGREEMENT
  // =====================================================

  agreement = {

    text:
      'I confirm that the information provided above is accurate and that I have permission to operate the PG at this property.',

    requiredMessage:
      'You must confirm the above information before submitting.',

    accepted: false
  };


  // =====================================================
  // BUTTONS
  // =====================================================

  buttons = {

    back: 'Back',

    submit: 'Submit for Verification'
  };


  // =====================================================
  // TOGGLE AGREEMENT
  // =====================================================

  toggleAgreement(): void {

    this.agreement.accepted =
      !this.agreement.accepted;

    console.log(
      'Agreement accepted:',
      this.agreement.accepted
    );

  }


  // =====================================================
  // EDIT SECTION
  // =====================================================

  onEdit(section: ReviewSection): void {

    console.log(
      'Edit section:',
      section.title
    );

  }


  // =====================================================
  // BACK
  // =====================================================

  onBack(): void {

    console.log(
      'Review - Back clicked'
    );

  }


  // =====================================================
  // SUBMIT
  // =====================================================

  onSubmit(): void {

    if (!this.agreement.accepted) {

      console.log(
        this.agreement.requiredMessage
      );

      return;
    }

    console.log(
      'PG Listing submitted for verification'
    );

  }

}

