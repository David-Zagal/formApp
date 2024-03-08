import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		children: [
			{ path: 'sign-up', component: RegisterPageComponent },
			{ path: '**', redirectTo: 'sign-up' },
		]
	},
];

@NgModule({
	imports: [RouterModule.forChild (routes)],
	exports: [RouterModule]
})
export class AuthRoutingModule {}