import { Input,Output, EventEmitter } from '@angular/core';
import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';




@Component({
  selector: 'app-select-dropdown',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule],
  templateUrl: './select-dropdown.component.html',
  styleUrl: './select-dropdown.component.scss'
})
export class SelectDropdownComponent {
  @Input() title: string='';
  @Input() id: string='';
  @Input() selectedValue: string='';
  @Input() valueArray: any;
  @Output() onBtnClick=new EventEmitter<any>();

  
  onClick(){
    this.onBtnClick.emit();
  }
  
}