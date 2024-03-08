import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/service/validators.service';

@Component({
	selector: 'reactive-switches-page',
	templateUrl: './switches-page.component.html',
	styleUrls: ['./switches-page.component.css']
})
export class SwitchesPageComponent implements OnInit {

	constructor (private fb: FormBuilder, private validatorsService: ValidatorsService) {}

	public myForm: FormGroup = this.fb.group ({
		gender: ['M', Validators.required],
		wantNotifications: [true, Validators.required],
		termsAndConditions: [false, Validators.requiredTrue],
	});

	public person = {
		gender: 'F',
		wantNotifications: false,
	};

	ngOnInit (): void {
		this.myForm.reset (this.person);
	}

	isValidField (field: string): boolean | null {
		return this.validatorsService.isValidField (this.myForm, field);
	}

	getFieldError (field: string): string | null{
		if (!this.myForm.controls[field]) return null;
		const errors = this.myForm.controls[field].errors || {};

		for (const key of Object.keys (errors)) {
			switch (key) {
				case 'required':
					return 'Debe de aceptar las condiciones de uso.';
			}
		}
		return null;
	}

	onSave (): void {
		if (this.myForm.invalid) return this.myForm.markAllAsTouched ();
		// this.person = this.myForm.value;
		const { termsAndConditions, ...newPerson } = this.myForm.value;
		this.person = newPerson;
		console.log (this.myForm.value);
		// console.log (this.person);
	}
}