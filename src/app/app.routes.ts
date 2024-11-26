import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CardManagerComponent } from './card-manager/card-manager.component';
import { TestComponent } from './test-component/test.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'cards', component: CardManagerComponent },
    { path: 'test', component: TestComponent }
];
