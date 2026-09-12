import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit
} from '@angular/core';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';

import { PageHeaderComponent } from '../../Shared/components/page-header/page-header.component';

import { FormCardComponent } from '../../Shared/components/form-card/form-card.component';

import {
  FormFieldComponent,
  FormFieldOption
} from '../../Shared/components/form-field/form-field.component';


interface RoomOption {
  id: string;
  name: string;
  beds: BedOption[];
}

interface BedOption {
  id: string;
  name: string;
  available: boolean;
}


@Component({
  selector: 'app-add-tenant',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PageHeaderComponent,
    FormCardComponent,
    FormFieldComponent
  ],
  templateUrl: './add-tenant.component.html',
  styleUrl: './add-tenant.component.scss'
})
export class AddTenantComponent implements OnInit {

  // ============================================================
  // FORM
  // ============================================================

  tenantForm!: FormGroup;

  submitted = false;

  saving = false;


  // ============================================================
  // SELECT OPTIONS
  // ============================================================

  genderOptions: FormFieldOption[] = [
    {
      label: 'Male',
      value: 'Male'
    },
    {
      label: 'Female',
      value: 'Female'
    },
    {
      label: 'Other',
      value: 'Other'
    }
  ];


  emergencyRelationOptions: FormFieldOption[] = [
    {
      label: 'Parent',
      value: 'Parent'
    },
    {
      label: 'Sibling',
      value: 'Sibling'
    },
    {
      label: 'Spouse',
      value: 'Spouse'
    },
    {
      label: 'Friend',
      value: 'Friend'
    },
    {
      label: 'Other',
      value: 'Other'
    }
  ];


  paymentMethodOptions: FormFieldOption[] = [
    {
      label: 'Cash',
      value: 'Cash'
    },
    {
      label: 'UPI',
      value: 'UPI'
    },
    {
      label: 'Bank Transfer',
      value: 'Bank Transfer'
    },
    {
      label: 'Card',
      value: 'Card'
    }
  ];


  // ============================================================
  // ROOM DATA
  // ============================================================

  rooms: RoomOption[] = [
    {
      id: 'room-101',
      name: 'Room 101',
      beds: [
        {
          id: 'bed-a',
          name: 'Bed A',
          available: true
        },
        {
          id: 'bed-b',
          name: 'Bed B',
          available: true
        },
        {
          id: 'bed-c',
          name: 'Bed C',
          available: false
        }
      ]
    },

    {
      id: 'room-102',
      name: 'Room 102',
      beds: [
        {
          id: 'bed-a',
          name: 'Bed A',
          available: true
        },
        {
          id: 'bed-b',
          name: 'Bed B',
          available: false
        }
      ]
    },

    {
      id: 'room-103',
      name: 'Room 103',
      beds: [
        {
          id: 'bed-a',
          name: 'Bed A',
          available: true
        },
        {
          id: 'bed-b',
          name: 'Bed B',
          available: true
        }
      ]
    },

    {
      id: 'room-104',
      name: 'Room 104',
      beds: [
        {
          id: 'bed-a',
          name: 'Bed A',
          available: false
        },
        {
          id: 'bed-b',
          name: 'Bed B',
          available: false
        }
      ]
    }
  ];


  roomOptions: FormFieldOption[] = [];

  bedOptions: FormFieldOption[] = [];


  // ============================================================
  // CONSTRUCTOR
  // ============================================================

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) { }


  // ============================================================
  // INIT
  // ============================================================

  ngOnInit(): void {

    this.createForm();

    this.createRoomOptions();

    this.setupRoomChange();

    this.setupDateValidation();
  }


  // ============================================================
  // CREATE FORM
  // ============================================================

  private createForm(): void {

    this.tenantForm = this.fb.group({

      // --------------------------------------------------------
      // PERSONAL INFORMATION
      // --------------------------------------------------------

      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(2)
        ]
      ],

      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(2)
        ]
      ],

      phone: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[6-9]\d{9}$/)
        ]
      ],

      email: [
        '',
        [
          Validators.email
        ]
      ],

      dateOfBirth: [
        ''
      ],

      gender: [
        ''
      ],


      // --------------------------------------------------------
      // EMERGENCY CONTACT
      // --------------------------------------------------------

      emergencyContactName: [
        '',
        Validators.required
      ],

      emergencyContactPhone: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[6-9]\d{9}$/)
        ]
      ],

      emergencyContactRelation: [
        ''
      ],


      // --------------------------------------------------------
      // STAY INFORMATION
      // --------------------------------------------------------

      joiningDate: [
        this.getTodayDate(),
        Validators.required
      ],

      expectedVacatingDate: [
        ''
      ],

      room: [
        '',
        Validators.required
      ],

      bed: [
        '',
        Validators.required
      ],


      // --------------------------------------------------------
      // PAYMENT INFORMATION
      // --------------------------------------------------------

      monthlyRent: [
        '',
        [
          Validators.required,
          Validators.min(0)
        ]
      ],

      securityDeposit: [
        '',
        [
          Validators.min(0)
        ]
      ],

      paymentDueDate: [
        '',
        Validators.required
      ],

      paymentMethod: [
        '',
        Validators.required
      ],


      // --------------------------------------------------------
      // ADDITIONAL INFORMATION
      // --------------------------------------------------------

      address: [
        ''
      ],

      city: [
        ''
      ],

      state: [
        ''
      ],

      pincode: [
        '',
        Validators.pattern(/^\d{6}$/)
      ],

      notes: [
        ''
      ]

    });
  }


  // ============================================================
  // ROOM OPTIONS
  // ============================================================

  private createRoomOptions(): void {

    this.roomOptions = this.rooms
      .filter(
        (room: RoomOption) =>
          this.hasAvailableBeds(room)
      )
      .map(
        (room: RoomOption) => ({
          label: room.name,
          value: room.id
        })
      );
  }


  // ============================================================
  // ROOM CHANGE
  // ============================================================

  private setupRoomChange(): void {

    this.tenantForm
      .get('room')
      ?.valueChanges
      .subscribe((roomId: string) => {

        this.updateBedOptions(roomId);

      });
  }


  // ============================================================
  // UPDATE BED OPTIONS
  // ============================================================

  private updateBedOptions(
    roomId: string
  ): void {

    const selectedRoom =
      this.rooms.find(
        (room: RoomOption) =>
          room.id === roomId
      );


    if (!selectedRoom) {

      this.bedOptions = [];

      this.tenantForm
        .get('bed')
        ?.reset('');

      return;
    }


    this.bedOptions =
      selectedRoom.beds
        .filter(
          (bed: BedOption) =>
            bed.available
        )
        .map(
          (bed: BedOption) => ({
            label: bed.name,
            value: bed.id
          })
        );


    this.tenantForm
      .get('bed')
      ?.reset('');
  }


  // ============================================================
  // AVAILABLE BEDS
  // ============================================================

  private hasAvailableBeds(
    room: RoomOption
  ): boolean {

    return room.beds.some(
      (bed: BedOption) =>
        bed.available
    );
  }


  // ============================================================
  // DATE VALIDATION
  // ============================================================

  private setupDateValidation(): void {

    const joiningDateControl =
      this.tenantForm.get('joiningDate');

    const vacatingDateControl =
      this.tenantForm.get('expectedVacatingDate');


    joiningDateControl
      ?.valueChanges
      .subscribe(() => {

        this.validateVacatingDate();

      });


    vacatingDateControl
      ?.valueChanges
      .subscribe(() => {

        this.validateVacatingDate();

      });
  }


  private validateVacatingDate(): void {

    const joiningDateControl =
      this.tenantForm.get('joiningDate');

    const vacatingDateControl =
      this.tenantForm.get('expectedVacatingDate');


    if (
      !joiningDateControl ||
      !vacatingDateControl
    ) {
      return;
    }


    const joiningDate =
      joiningDateControl.value;

    const vacatingDate =
      vacatingDateControl.value;


    // Vacating date is optional.
    if (!vacatingDate) {

      this.clearVacatingDateError(
        vacatingDateControl
      );

      return;
    }


    if (!joiningDate) {

      this.clearVacatingDateError(
        vacatingDateControl
      );

      return;
    }


    const joining =
      this.parseDate(joiningDate);

    const vacating =
      this.parseDate(vacatingDate);


    if (!joining || !vacating) {

      this.clearVacatingDateError(
        vacatingDateControl
      );

      return;
    }


    if (vacating < joining) {

      vacatingDateControl.setErrors({
        ...(vacatingDateControl.errors || {}),

        vacatingDateBeforeJoiningDate: true
      });

      return;
    }


    this.clearVacatingDateError(
      vacatingDateControl
    );
  }


  private clearVacatingDateError(
    control: any
  ): void {

    if (
      !control.hasError(
        'vacatingDateBeforeJoiningDate'
      )
    ) {
      return;
    }


    const errors = {
      ...(control.errors || {})
    };


    delete errors[
      'vacatingDateBeforeJoiningDate'
    ];


    control.setErrors(
      Object.keys(errors).length > 0
        ? errors
        : null
    );
  }


  private parseDate(
    value: string
  ): Date | null {

    if (!value) {
      return null;
    }


    const parts =
      value.split('-');


    if (parts.length !== 3) {
      return null;
    }


    const year =
      Number(parts[0]);

    const month =
      Number(parts[1]);

    const day =
      Number(parts[2]);


    if (
      !year ||
      !month ||
      !day
    ) {
      return null;
    }


    return new Date(
      year,
      month - 1,
      day
    );
  }


  // ============================================================
  // FORM CONTROL
  // ============================================================

  getControl(
    controlName: string
  ): FormControl {

    return this.tenantForm.get(
      controlName
    ) as FormControl;
  }


  // ============================================================
  // TODAY
  // ============================================================

  private getTodayDate(): string {

    const today =
      new Date();


    const year =
      today.getFullYear();


    const month =
      String(
        today.getMonth() + 1
      ).padStart(2, '0');


    const day =
      String(
        today.getDate()
      ).padStart(2, '0');


    return `${year}-${month}-${day}`;
  }


  // ============================================================
  // SUBMIT
  // ============================================================

  onSubmit(): void {

    this.submitted = true;


    // Run cross-field validation before submit.
    this.validateVacatingDate();


    if (this.tenantForm.invalid) {

      this.tenantForm.markAllAsTouched();

      return;
    }


    this.saving = true;


    const formValue =
      this.tenantForm.value;


    const tenant = {

      ...formValue,

      fullName:
        `${formValue.firstName} ${formValue.lastName}`
          .trim()

    };


    console.log(
      'Tenant to save:',
      tenant
    );


    /*
     * Temporary demo save.
     *
     * Replace this with your TenantService API call
     * when the backend is connected.
     */

    setTimeout(() => {

      this.saving = false;

      this.router.navigate([
        '/tenants'
      ]);

    }, 700);
  }


  // ============================================================
  // CANCEL
  // ============================================================

  onCancel(): void {

    if (this.saving) {
      return;
    }

    this.router.navigate([
      '/layout/tenantlist'
    ]);
  }
}