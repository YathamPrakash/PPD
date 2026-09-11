import { Component } from '@angular/core';

interface LeaseOption {
  value: string;
  label: string;
}

interface LeaseDocument {
  id: string;
  name: string;
  description: string;
  required: boolean;
}

@Component({
  selector: 'app-lease-details',
  standalone: true,
  imports: [],
  templateUrl: './lease-details.component.html',
  styleUrl: './lease-details.component.scss'
})
export class LeaseDetailsComponent {



  // =====================================================
  // PAGE CONTENT
  // =====================================================

  pageContent = {
    step: 'STEP 6 OF 7',

    title: 'Lease Details',

    description:
      'Provide the lease details for the property you are using to operate this PG.',

    note:
      'These details help us verify that you have permission to operate the PG at this property.'
  };


  // =====================================================
  // LEASE START DATE
  // =====================================================

  leaseStartDate = {
    label: 'Lease Start Date',
    placeholder: 'Select lease start date',
    value: ''
  };


  // =====================================================
  // LEASE END DATE
  // =====================================================

  leaseEndDate = {
    label: 'Lease End Date',
    placeholder: 'Select lease end date',
    value: ''
  };


  // =====================================================
  // LEASE DURATION
  // =====================================================

  leaseDuration = {

    label: 'Lease Duration',

    placeholder: 'Select lease duration',

    selectedValue: '',

    options: <LeaseOption[]>[

      {
        value: 'less-than-1-year',
        label: 'Less than 1 Year'
      },

      {
        value: '1-year',
        label: '1 Year'
      },

      {
        value: '2-years',
        label: '2 Years'
      },

      {
        value: '3-years',
        label: '3 Years'
      },

      {
        value: 'more-than-3-years',
        label: 'More than 3 Years'
      }

    ]
  };


  // =====================================================
  // FINANCIAL DETAILS
  // =====================================================

  financialSection = {

    title: 'Financial Details',

    description:
      'Provide the financial terms agreed with the property owner.'
  };


  leaseAmount = {

    label: 'Monthly Lease Amount',

    placeholder: 'Enter monthly lease amount',

    currency: '₹',

    value: ''
  };


  securityDeposit = {

    label: 'Security Deposit',

    placeholder: 'Enter security deposit amount',

    currency: '₹',

    value: ''
  };


  // =====================================================
  // AGREEMENT TYPE
  // =====================================================

  agreementType = {

    label: 'Lease Agreement Type',

    selectedValue: '',

    options: <LeaseOption[]>[

      {
        value: 'registered',
        label: 'Registered Lease Agreement'
      },

      {
        value: 'notarized',
        label: 'Notarized Lease Agreement'
      },

      {
        value: 'rental-agreement',
        label: 'Rental Agreement'
      },

      {
        value: 'other',
        label: 'Other'
      }

    ]
  };


  // =====================================================
  // DOCUMENTS
  // =====================================================

  documentsSection = {

    title: 'Lease Documents',

    description:
      'Upload documents related to the lease agreement.'
  };


  leaseDocuments: LeaseDocument[] = [

    {
      id: 'lease-agreement',

      name: 'Lease Agreement',

      description:
        'Upload a copy of the signed lease agreement.',

      required: true
    },

    {
      id: 'supporting-document',

      name: 'Supporting Document',

      description:
        'Optional document supporting your right to operate the property.',

      required: false
    }

  ];


  // =====================================================
  // VERIFICATION
  // =====================================================

  verification = {

    title: 'Lease Verification',

    status: 'Verification Required',

    description:
      'The lease information and uploaded documents may be reviewed during property verification.'
  };


  // =====================================================
  // INFORMATION
  // =====================================================

  information = {

    icon: 'ℹ',

    message:
      'Make sure the lease details match the agreement between you and the property owner.'
  };


  // =====================================================
  // BUTTONS
  // =====================================================

  buttons = {

    back: 'Back',

    continue: 'Review Details'
  };


  // =====================================================
  // ACTIONS
  // =====================================================

  onUploadDocument(document: LeaseDocument): void {

    console.log(
      'Upload document:',
      document.name
    );

  }


  onBack(): void {

    console.log(
      'Lease Details - Back clicked'
    );

  }


  onContinue(): void {

    console.log(
      'Lease Details - Continue clicked'
    );

  }

}