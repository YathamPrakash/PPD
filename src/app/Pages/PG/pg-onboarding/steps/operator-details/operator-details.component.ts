import { Component } from '@angular/core';

@Component({
  selector: 'app-operator-details',
  standalone: true,
  imports: [],
  templateUrl: './operator-details.component.html',
  styleUrl: './operator-details.component.scss'
})
export class OperatorDetailsComponent {


  // =====================================================
  // PAGE CONTENT
  // =====================================================

  pageContent = {
    step: 'STEP 1 OF 7',
    title: 'Your Details',
    description:
      'Tell us about yourself before listing your PG.'
  };


  // =====================================================
  // ACCOUNT DETAILS
  // =====================================================

  accountDetails = {
    label: 'Account',
    name: 'Jaya Prakash',
    email: 'jaya@example.com',
    verified: true,
    verifiedText: 'Verified'
  };


  // =====================================================
  // PHONE
  // =====================================================

  phone = {
    label: 'Phone Number',
    countryCode: '+91',
    placeholder: 'Enter your phone number',
    value: ''
  };


  // =====================================================
  // PROPERTY ADDRESS
  // =====================================================

  addressSection = {

    title: 'Property Address',

    description:
      'Provide the address of the property where you are operating the PG.'
  };


  address = {

    label: 'Address',

    placeholder: 'Enter complete property address',

    value: ''
  };


  city = {

    label: 'City',

    placeholder: 'Enter city',

    value: ''
  };


  state = {

    label: 'State',

    placeholder: 'Enter state',

    value: ''
  };


  pincode = {

    label: 'Pincode',

    placeholder: 'Enter pincode',

    value: ''
  };


  // =====================================================
  // INFORMATION
  // =====================================================

  information = {

    icon: 'ℹ',

    message:
      'These details belong to the person who has taken the property on lease and will manage the PG.'
  };


  // =====================================================
  // BUTTONS
  // =====================================================

  buttons = {

    continue: 'Continue'
  };


  // =====================================================
  // ACTION
  // =====================================================

  onContinue(): void {

    console.log(
      'Operator Details - Continue clicked'
    );

  }

}

