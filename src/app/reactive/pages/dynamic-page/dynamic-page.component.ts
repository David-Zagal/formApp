import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/service/validators.service';

@Component({
	selector: 'reactive-dynamic-page',
	templateUrl: './dynamic-page.component.html',
	styleUrls: ['./dynamic-page.component.css']
})
export class DynamicPageComponent {

	constructor (private fb: FormBuilder, private validatorsService: ValidatorsService) {}

	public myForm: FormGroup = this.fb.group ({
		name: ['', [Validators.required, Validators.minLength (3)]],
		favoriteGames: this.fb.array ([
			['Metal Gear', Validators.required],
			['Death Stranding', Validators.required],
		]),
	});

	public newFavorite: FormControl = new FormControl ('', Validators.required);

	get favoriteGames () {
		// return this.myForm.controls['favoriteGames'].value;
		return this.myForm.get ('favoriteGames') as FormArray;
	}

	isValidField (field: string): boolean | null {
		return this.validatorsService.isValidField (this.myForm, field);
	}

	isValidFieldInArray (formArray: FormArray, index: number): boolean | null {
		return formArray.controls[index].errors && formArray.controls[index].touched;
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

	onAddToFavorites (): void {
		if (this.newFavorite.invalid) return;
		const newGame = this.newFavorite.value;
		// this.favoriteGames.push (new FormControl (newGame, Validators.required)); // FormControl
		this.favoriteGames.push (this.fb.control (newGame, Validators.required)); // FormBuilder
		this.newFavorite.reset ();
	}

	onDeleteFavorite (index: number): void {
		this.favoriteGames.removeAt (index);
	}

	onSave (): void {
		if (this.myForm.invalid) return this.myForm.markAllAsTouched ();
		console.log (this.myForm.value);
		(this.myForm.controls ['favoriteGames'] as FormArray) = this.fb.array ([]);
		this.myForm.reset ();
	}
}