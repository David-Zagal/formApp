import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import * as customValidators from 'src/app/shared/validators/validators';
import { ValidatorsService } from './../../../shared/service/validators.service';
import { EmailValidatorService } from '../../../shared/validators/email-validator.service';

@Component({
	selector: 'auth-register-page',
	templateUrl: './register-page.component.html',
	styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {

	constructor (private fb: FormBuilder, private validatorsService: ValidatorsService, private emailValidatorService: EmailValidatorService) {}

	public myForm: FormGroup = this.fb.group ({
		name: ['', [Validators.required, Validators.pattern (this.validatorsService.firstNameAndLastnamePattern)]],
		// email: ['', [Validators.required, Validators.email]],
		// email: ['', [Validators.required, Validators.pattern (this.validatorsService.emailPattern)], [new EmailValidatorService ()]],
		email: ['', [Validators.required, Validators.pattern (this.validatorsService.emailPattern)], [this.emailValidatorService]],
		username: ['', [Validators.required, this.validatorsService.cantBeStrider]],
		password: ['', [Validators.required, Validators.minLength (6)]],
		password2: ['', [Validators.required]],
	}, {
		validators: [
			this.validatorsService.isFieldOneEqualFieldTwo ('password', 'password2'),
		]
	});

	isValidField (field: string): boolean | null {
		return this.validatorsService.isValidField (this.myForm, field);
	}

	onSave (): void {
		this.myForm.markAllAsTouched ();
	}
}