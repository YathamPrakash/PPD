import { Component } from '@angular/core';

interface SelectOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-pg-details',
  standalone: true,
  imports: [],
  templateUrl: './pg-details.component.html',
  styleUrl: './pg-details.component.scss'
})
export class PgDetailsComponent {

  // ==========================================
  // PAGE CONTENT
  // ==========================================

  pageContent = {
    step: 'STEP 2 OF 7',

    title: 'PG Details',

    description:
      'Provide the basic details about the PG you want to list.'
  };


  // ==========================================
  // PG NAME
  // ==========================================

  pgName = {
    label: 'PG Name',

    placeholder:
      'Enter your PG name',

    value:
      'StayNest Premium PG'
  };


  // ==========================================
  // PG TYPE
  // ==========================================

  pgType = {

    label: 'PG Type',

    placeholder:
      'Select PG type',

    selectedValue:
      'boys-pg',

    options: <SelectOption[]>[

      {
        value: 'boys-pg',
        label: 'Boys PG'
      },

      {
        value: 'girls-pg',
        label: 'Girls PG'
      },

      {
        value: 'co-living',
        label: 'Co-living'
      }

    ]
  };


  // ==========================================
  // PG DESCRIPTION
  // ==========================================

  description = {

    label: 'PG Description',

    placeholder:
      'Describe your PG, facilities, location and what makes it special.',

    value:
      'A comfortable and fully furnished PG with modern facilities, food, Wi-Fi and a secure environment.'
  };


  // ==========================================
  // PG FOR
  // ==========================================

  pgFor = {

    label:
      'Who is this PG for?',

    selectedValue:
      'working-professionals',

    options: <SelectOption[]>[

      {
        value: 'students',
        label: 'Students'
      },

      {
        value: 'working-professionals',
        label: 'Working Professionals'
      },

      {
        value: 'both',
        label: 'Students & Working Professionals'
      }

    ]
  };


  // ==========================================
  // OCCUPANCY
  // ==========================================

  occupancy = {

    label:
      'Occupancy Type',

    selectedValue:
      'double-sharing',

    options: <SelectOption[]>[

      {
        value: 'single',
        label: 'Single Occupancy'
      },

      {
        value: 'double-sharing',
        label: 'Double Sharing'
      },

      {
        value: 'triple-sharing',
        label: 'Triple Sharing'
      },

      {
        value: 'multiple-sharing',
        label: 'Multiple Sharing'
      }

    ]
  };


  // ==========================================
  // ROOMS
  // ==========================================

  rooms = {

    label:
      'Total Rooms',

    placeholder:
      'Enter number of rooms',

    value:
      '20'
  };


  // ==========================================
  // BEDS
  // ==========================================

  beds = {

    label:
      'Total Beds',

    placeholder:
      'Enter total number of beds',

    value:
      '40'
  };


  // ==========================================
  // INFORMATION
  // ==========================================

  information = {

    icon:
      'ℹ',

    message:
      'You can update your PG details later from the management dashboard.'
  };


  // ==========================================
  // BUTTONS
  // ==========================================

  buttons = {

    back:
      'Back',

    continue:
      'Continue'
  };


  // ==========================================
  // STATIC ACTIONS
  // ==========================================

  onBack(): void {

    console.log(
      'Back button clicked'
    );

  }


  onContinue(): void {

    console.log(
      'PG details continue clicked'
    );

  }

}

