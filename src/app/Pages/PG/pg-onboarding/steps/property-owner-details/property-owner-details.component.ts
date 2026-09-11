import { Component } from '@angular/core';
interface RelationshipOption {
  value: string;
  label: string;
}
@Component({
  selector: 'app-property-owner-details',
  standalone: true,
  imports: [],
  templateUrl: './property-owner-details.component.html',
  styleUrl: './property-owner-details.component.scss'
})
export class PropertyOwnerDetailsComponent {


  // =====================================================
  // PAGE CONTENT
  // =====================================================

  pageContent = {

    step: 'STEP 5 OF 7',

    title: 'Property Owner Details',

    description:
      'Provide the details of the actual property owner. The owner will be contacted for property verification and approval.',

    note:
      'The property owner is the person who legally owns the building or property.'
  };


  // =====================================================
  // OWNER DETAILS
  // =====================================================

  ownerName = {

    label: 'Property Owner Name',

    placeholder: 'Enter the full name of the property owner',

    value: ''
  };


  // =====================================================
  // OWNER PHONE
  // =====================================================

  ownerPhone = {

    label: 'Property Owner Phone Number',

    countryCode: '+91',

    placeholder: 'Enter owner phone number',

    value: ''
  };


  // =====================================================
  // OWNER EMAIL
  // =====================================================

  ownerEmail = {

    label: 'Property Owner Email',

    placeholder: 'Enter owner email address',

    value: ''
  };


  // =====================================================
  // RELATIONSHIP
  // =====================================================

  relationship = {

    label: 'Your Relationship With The Owner',

    placeholder: 'Select relationship',

    selectedValue: '',

    options: <RelationshipOption[]>[

      {
        value: 'lease-holder',
        label: 'I have taken the property on lease'
      },

      {
        value: 'authorized-operator',
        label: 'I am authorized to manage the property'
      },

      {
        value: 'property-manager',
        label: 'I am the property manager'
      },

      {
        value: 'other',
        label: 'Other'
      }

    ]
  };


  // =====================================================
  // OWNER ADDRESS
  // =====================================================

  ownerAddress = {

    label: 'Owner Address',

    placeholder: 'Enter the permanent address of the property owner',

    value: ''
  };


  // =====================================================
  // VERIFICATION
  // =====================================================

  verification = {

    title: 'Owner Verification',

    description:
      'After you submit the PG listing, the property owner will receive a verification request. The owner must approve the listing before management access is granted.',

    status: 'Pending Owner Approval'
  };


  // =====================================================
  // INFORMATION
  // =====================================================

  information = {

    icon: 'ℹ',

    message:
      'Owner approval is required before the PG can be fully managed through StayNest.'
  };


  // =====================================================
  // BUTTONS
  // =====================================================

  buttons = {

    back: 'Back',

    continue: 'Continue'
  };


  // =====================================================
  // ACTIONS
  // =====================================================

  onBack(): void {

    console.log(
      'Property Owner Details - Back clicked'
    );

  }


  onContinue(): void {

    console.log(
      'Property Owner Details - Continue clicked'
    );

  }

}

