import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NgoComponent } from './components/ngo/ngo.component';
import { VolunteerComponent } from './components/volunteer/volunteer.component';
import { AdminComponent } from './components/admin/admin.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'ngo', component: NgoComponent },
  { path: 'volunteer', component: VolunteerComponent },
  { path: 'admin', component: AdminComponent }
];
