import { Component } from '@angular/core';
interface PhotoCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  required: boolean;
}
@Component({
  selector: 'app-pg-photos',
  standalone: true,
  imports: [],
  templateUrl: './pg-photos.component.html',
  styleUrl: './pg-photos.component.scss'
})
export class PgPhotosComponent {


  // =====================================================
  // PAGE CONTENT
  // =====================================================

  pageContent = {

    step: 'STEP 4 OF 7',

    title: 'PG Photos',

    description:
      'Add clear photos of your PG to help guests understand your property.',

    uploadTitle:
      'Upload photos of your PG',

    uploadDescription:
      'Add photos of the property, rooms and available facilities.',

    chooseButton:
      'Choose Photos',

    supportedFormats:
      'JPG, PNG • Maximum 10 MB per image'
  };


  // =====================================================
  // PHOTO CATEGORIES
  // =====================================================

  photoCategories: PhotoCategory[] = [

    {
      id: 'exterior',
      name: 'PG Exterior',
      description: 'Upload photos of the building exterior.',
      icon: '🏢',
      required: true
    },

    {
      id: 'common-area',
      name: 'Common Area',
      description: 'Show shared spaces and common areas.',
      icon: '🛋️',
      required: false
    },

    {
      id: 'bedroom',
      name: 'Bedroom',
      description: 'Show available rooms and sleeping areas.',
      icon: '🛏️',
      required: true
    },

    {
      id: 'bathroom',
      name: 'Bathroom',
      description: 'Show the bathroom facilities.',
      icon: '🚿',
      required: false
    },

    {
      id: 'kitchen',
      name: 'Kitchen',
      description: 'Show the kitchen and cooking facilities.',
      icon: '🍳',
      required: false
    },

    {
      id: 'dining',
      name: 'Dining Area',
      description: 'Show the dining or meal area.',
      icon: '🍽️',
      required: false
    }
  ];


  // =====================================================
  // PHOTO REQUIREMENTS
  // =====================================================

  photoRequirements = {

    title: 'Photo guidelines',

    items: [

      'Use clear and good-quality photos.',

      'Photos should represent the actual property.',

      'Avoid blurry or heavily edited images.',

      'Do not upload photos containing sensitive information.'
    ]
  };


  // =====================================================
  // INFORMATION
  // =====================================================

  information = {

    icon: 'ℹ',

    message:
      'You can add or update property photos later from the PG management dashboard.'
  };


  // =====================================================
  // BUTTONS
  // =====================================================

  buttons = {

    back: 'Back',

    continue: 'Continue'
  };


  // =====================================================
  // STATIC ACTIONS
  // =====================================================

  onChoosePhotos(): void {

    console.log(
      'Choose Photos clicked'
    );

  }


  onBack(): void {

    console.log(
      'PG Photos - Back clicked'
    );

  }


  onContinue(): void {

    console.log(
      'PG Photos - Continue clicked'
    );

  }

}

