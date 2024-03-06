import { SwitchesPageComponent } from './pages/switches-page/switches-page.component';
import { DynamicPageComponent } from './pages/dynamic-page/dynamic-page.component';
import { BasicPageComponent } from './pages/basic-page/basic-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		children: [
			{ path: 'basic', component: BasicPageComponent },
			{ path: 'dynamic', component: DynamicPageComponent },
			{ path: 'switches', component: SwitchesPageComponent },
			{ path: '**', redirectTo: 'basic' },
		]
	},
];

@NgModule({
	imports: [RouterModule.forChild (routes)],
	exports: [RouterModule]
})
export class ReactiveRoutingModule {}