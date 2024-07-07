import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

//* Angular Material modules:
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';

//* Screens compnets:
import { BillboardScreenComponent } from './screens/billboard-screen/billboard-screen.component';
import { EventDetailsScreenComponent } from './screens/event-details-screen/event-details-screen.component';
import { ErrorScreenComponent } from './screens/error-screen/error-screen.component';

//* Shared components:
import { NavBarComponent } from './shared/components/nav-bar/nav-bar.component';
import { EventCardComponent } from './shared/components/event-card/event-card.component';
import { ShoppingCartViewComponent } from './shared/components/shopping-cart-view/shopping-cart-view.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    BillboardScreenComponent,
    EventCardComponent,
    EventDetailsScreenComponent,
    ShoppingCartViewComponent,
    ErrorScreenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    HttpClientModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }