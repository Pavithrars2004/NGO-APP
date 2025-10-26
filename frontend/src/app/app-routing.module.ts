import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgoComponent } from './components/ngo/ngo.component';
import { VolunteerComponent } from './components/volunteer/volunteer.component';
import { AdminComponent } from './components/admin/admin.component';

const routes: Routes = [
  { path: '', redirectTo: '/ngo', pathMatch: 'full' },
  { path: 'ngo', component: NgoComponent },
  { path: 'volunteer', component: VolunteerComponent },
  { path: 'admin', component: AdminComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
