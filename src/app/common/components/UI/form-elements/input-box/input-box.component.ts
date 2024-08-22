// import {Component, input,forwardRef } from '@angular/core';
// import { Input } from '@angular/core';
// import {MatInputModule} from '@angular/material/input';
// import {MatFormFieldModule} from '@angular/material/form-field';
// import {FormsModule, ReactiveFormsModule} from '@angular/forms';

// @Component({
//   selector: 'app-input-box',
//   standalone: true,
//   imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
//   templateUrl: './input-box.component.html',
//   styleUrl: './input-box.component.scss'
// })
// export class InputBoxComponent {
  
//   @Input() formControlName: string='';
//   @Input() placeholder: string='';
//   @Input() title: string='';
//   @Input() value: string='';
//   @Input() id: string='';
// }


import { Component, Input, forwardRef } from '@angular/core';
import {
  ReactiveFormsModule,
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  FormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-input-box',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule,MatFormFieldModule,FormsModule],
  templateUrl: './input-box.component.html',
  styleUrl: './input-box.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputBoxComponent),
      multi: true,
    },
  ],
})
export class InputBoxComponent implements ControlValueAccessor {

  @Input() placeholder: string='';
  @Input() title: string='';
  @Input() value: string='';
  @Input() id: string='';

  
  disabled = false;

  onChange = (value: string) => {};
  onTouched = () => {};

  // Called when the value in the UI is changed
  handleInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value);
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

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}




