import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicPageComponent } from './basic-page.component';

describe ('BasicPageComponent', () => {
	let component: BasicPageComponent;
	let fixture: ComponentFixture<BasicPageComponent>;

	beforeEach (() => {
		TestBed.configureTestingModule ({
			declarations: [BasicPageComponent]
		});
		fixture = TestBed.createComponent (BasicPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges ();
	});

	it ('should create', () => {
		expect (component).toBeTruthy ();
	});
});