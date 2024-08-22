import { Input,Output, EventEmitter } from '@angular/core';
import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { forwardRef } from '@angular/core';

import {
  ReactiveFormsModule,
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
} from '@angular/forms';


@Component({
  selector: 'app-select-dropdown',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule, ReactiveFormsModule],
  templateUrl: './select-dropdown.component.html',
  styleUrl: './select-dropdown.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectDropdownComponent),
      multi: true,
    },
  ],
})
export class SelectDropdownComponent implements ControlValueAccessor{
  @Input() title: string='';
  @Input() id: string='';
  @Input() selectedValue: string='';
  @Input() valueArray: any;
  @Input() formControlName: any;
  @Output() onBtnClick=new EventEmitter<any>();
  @Input() value: string='';

  
  onClick(){
    this.onBtnClick.emit();
  }
  

  onChange = (value: string) => {};
  onTouched = () => {};

  // Called when the value in the UI is changed
  handleInputChange(event:any): void {
    this.value = event.value;
    
    this.onChange(this.value);
    this.onClick();
    
    this.onTouched();
  }

  // ControlValueAccessor interface methods
  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

 
}
