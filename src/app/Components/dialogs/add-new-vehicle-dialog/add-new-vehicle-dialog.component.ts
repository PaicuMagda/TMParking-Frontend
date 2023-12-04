import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-new-vehicle-dialog',
  templateUrl: './add-new-vehicle-dialog.component.html',
  styleUrls: ['./add-new-vehicle-dialog.component.scss'],
})
export class AddNewVehicleDialogComponent {
  addNewVehicleFormGroup: FormGroup;

  isLinear = false;
  file: string | ArrayBuffer | null = null;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.addNewVehicleFormGroup = this.formBuilder.group({
      make: ['', Validators.required],
      model: ['', Validators.required],
      color: ['', Validators.required],
      year: ['', Validators.required],
      owner: ['', Validators.required],
      vin: ['', Validators.required],
      licencePlate: ['', Validators.required],
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      if (file.type.match('image.*')) {
        const reader = new FileReader();

        reader.onload = () => {
          this.file = reader.result;
        };

        reader.readAsDataURL(file);
      } else {
        console.log('Fișierul încărcat nu este o imagine.');
      }
    }
  }
}
