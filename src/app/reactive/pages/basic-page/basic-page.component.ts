import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/service/validators.service';

const priceDefault: number = 0;
const inStorageDefault: number = 0;

const rtx5090 = {
	name: 'RTX 5090',
	price: 2500,
	inStorage: 6
};

@Component({
	selector: 'reactive-basic-page',
	templateUrl: './basic-page.component.html',
	styleUrls: ['./basic-page.component.css']
})
export class BasicPageComponent implements OnInit {

	constructor (private fb: FormBuilder, private validatorsService: ValidatorsService) {}

	public myForm: FormGroup = this.fb.group ({
		name: ['', [Validators.required, Validators.minLength (3)]],
		price: [priceDefault, [Validators.required, Validators.min (0)]],
		inStorage: [inStorageDefault, [Validators.required, Validators.min (0)]],
	});

	ngOnInit (): void {
		this.myForm.reset (rtx5090);
	}

	isValidField (field: string): boolean | null {
		return this.validatorsService.isValidField (this.myForm, field);
		// return this.myForm.controls[field].getError ('required') && this.myForm.controls[field].touched;
	}

	getFieldError (field: string): string | null{
		if (!this.myForm.controls[field]) return null;
		const errors = this.myForm.controls[field].errors || {};

		for (const key of Object.keys (errors)) {
			switch (key) {
				case 'required':
					return 'Este campo es requerido.';
				case 'minlength':
					return `Este campo requiere mínimo ${ errors['minlength'].requiredLength } caracteres.`;
				case 'min':
					return `Este campo debe ser ${ errors['min'].min } o mayor.`;
			}
		}
		return null;
	}

	// public myForm: FormGroup = new FormGroup ({
	// 	name: new FormControl ('', [], []),
	// 	price: new FormControl (priceDefault, [], []),
	// 	inStorage: new FormControl (inStorageDefault, [], []),
	// });

	onSave (): void {
		if (this.myForm.invalid) return this.myForm.markAllAsTouched ();
		console.log (this.myForm.value);
		this.myForm.reset ({ price: priceDefault, inStorage: inStorageDefault });
	}
}