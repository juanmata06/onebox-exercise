import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillboardScreenComponent } from './screens/billboard-screen/billboard-screen.component';
import { EventDetailsScreenComponent } from './screens/event-details-screen/event-details-screen.component';
import { ErrorScreenComponent } from './screens/error-screen/error-screen.component';

const routes: Routes = [
  { path: '', component: BillboardScreenComponent },
  { path: 'event/:id', component: EventDetailsScreenComponent },
  { path: '**', component: ErrorScreenComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
