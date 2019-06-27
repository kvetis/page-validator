import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { pageValidator } from './validators/page-validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  control = new FormControl('', pageValidator);
}
