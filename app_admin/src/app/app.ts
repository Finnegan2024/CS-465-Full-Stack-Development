import { Component, NgModule, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TripListingComponent } from './trip-listing/trip-listing';
import { TripCardComponent } from './trip-card/trip-card';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, TripListingComponent, TripCardComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  title = 'Travlr Getaways Admin';
}
