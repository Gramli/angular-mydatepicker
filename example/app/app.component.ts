import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent {
  activeTab: string = 'ngmodel';

  constructor() {
    console.log('constructor: AppComponent()');
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
}
