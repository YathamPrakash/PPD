import { Component } from '@angular/core';

interface Amenity {
    id: string;
    name: string;
    description: string;
    icon: string;
    selected: boolean;
}
@Component({
    selector: 'app-amenties',
    standalone: true,
    imports: [],
    templateUrl: './amenties.component.html',
    styleUrls: ['./amenties.component.scss']
})
export class AmentiesComponent {

    // =====================================================
    // PAGE CONTENT
    // =====================================================

    pageContent = {
        step: 'STEP 3 OF 7',

        title: 'Amenities & Facilities',

        description:
            'Select the facilities and amenities available at your PG.',

        selectionText:
            'Select all amenities that are currently available.'
    };


    // =====================================================
    // AMENITIES
    // =====================================================

    amenities: Amenity[] = [

        {
            id: 'wifi',
            name: 'Wi-Fi',
            description: 'High-speed internet',
            icon: '📶',
            selected: true
        },

        {
            id: 'food',
            name: 'Food',
            description: 'Meals provided',
            icon: '🍱',
            selected: true
        },

        {
            id: 'laundry',
            name: 'Laundry',
            description: 'Laundry facility',
            icon: '🧺',
            selected: false
        },

        {
            id: 'parking',
            name: 'Parking',
            description: 'Vehicle parking',
            icon: '🚗',
            selected: false
        },

        {
            id: 'cctv',
            name: 'CCTV',
            description: '24/7 security monitoring',
            icon: '📹',
            selected: true
        },

        {
            id: 'power-backup',
            name: 'Power Backup',
            description: 'Backup power facility',
            icon: '🔋',
            selected: false
        },

        {
            id: 'housekeeping',
            name: 'Housekeeping',
            description: 'Regular cleaning service',
            icon: '🧹',
            selected: false
        },

        {
            id: 'washing-machine',
            name: 'Washing Machine',
            description: 'Washing facility available',
            icon: '🫧',
            selected: false
        },

        {
            id: 'ac',
            name: 'Air Conditioning',
            description: 'AC available in rooms',
            icon: '❄️',
            selected: false
        },

        {
            id: 'hot-water',
            name: 'Hot Water',
            description: 'Hot water facility',
            icon: '🚿',
            selected: true
        },

        {
            id: 'common-area',
            name: 'Common Area',
            description: 'Shared common area',
            icon: '🛋️',
            selected: false
        },

        {
            id: 'kitchen',
            name: 'Kitchen',
            description: 'Kitchen facility',
            icon: '🍳',
            selected: false
        }
    ];


    // =====================================================
    // BUTTONS
    // =====================================================

    buttons = {

        back: 'Back',

        continue: 'Continue'
    };


    // =====================================================
    // INFORMATION
    // =====================================================

    information = {

        icon: 'ℹ',

        message:
            'Only select facilities that are actually available at your PG. You can update these details later.'
    };


    // =====================================================
    // TOGGLE AMENITY
    // =====================================================

    toggleAmenity(amenity: Amenity): void {

        amenity.selected = !amenity.selected;

        console.log(
            'Amenity:',
            amenity.name,
            'Selected:',
            amenity.selected
        );

    }


    // =====================================================
    // BACK
    // =====================================================

    onBack(): void {

        console.log(
            'Amenities - Back clicked'
        );

    }


    // =====================================================
    // CONTINUE
    // =====================================================

    onContinue(): void {

        const selectedAmenities =
            this.amenities
                .filter(amenity => amenity.selected)
                .map(amenity => amenity.name);

        console.log(
            'Selected Amenities:',
            selectedAmenities
        );

    }

}
