import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: 'reactive',
		loadChildren: () => import ('./reactive/reactive.module').then (m => m.ReactiveModule),
	},
	{
		path: 'auth',
		loadChildren: () => import ('./auth/auth.module').then (m => m.AuthModule),
	},
	{
		path: '**',
		redirectTo: 'reactive',
	}
];

@NgModule({
	imports: [RouterModule.forRoot (routes, { useHash: true, })],
	exports: [RouterModule]
})
export class AppRoutingModule {}