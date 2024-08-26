// import {Component} from '@angular/core';
// import {MatIconModule} from '@angular/material/icon';
// import {MatDividerModule} from '@angular/material/divider';
// import {MatButtonModule} from '@angular/material/button';
// import { Input,Output, EventEmitter } from '@angular/core';
// import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

// @Component({
//   selector: 'app-button',
//   standalone: true,
//   imports: [MatButtonModule, MatDividerModule, MatIconModule,MatProgressSpinnerModule],
//   templateUrl: './button.component.html',
//   styleUrl: './button.component.scss'
// })
// export class ButtonComponent {

//   @Input() title: string='';
//   @Input() btnClass: string='';
//   @Input() disable: boolean = false;
//   @Output() onBtnClick=new EventEmitter<any>();

//   onClick(){
//     this.onBtnClick.emit();
//   }
// }

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [MatButtonModule, MatDividerModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

  @Input() title: string = '';
  @Input() btnClass: string = '';
  @Input() disable: boolean = false;
  @Output() onBtnClick = new EventEmitter<any>();

  onClick() {
    if (!this.disable) {
      this.onBtnClick.emit();
    }
  }
}
