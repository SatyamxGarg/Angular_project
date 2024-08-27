import {ChangeDetectionStrategy, input} from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-date-picker',
  standalone: true,
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.scss',
   imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule, FormsModule, ReactiveFormsModule],

  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true
    }
  ]
})
// export class DatePickerComponent implements ControlValueAccessor {
//   @Input() title: string = '';
//   @Input() formControlName: string = '';
//   @Input() id: string = '';
  
//   value: Date | null = null;
//   onChange = (date: Date | null) => {};
//   onTouched = () => {};

//   writeValue(date: Date | null): void {
//     this.value = date;
//   }

//   registerOnChange(fn: (date: Date | null) => void): void {
//     this.onChange = fn;
//   }

//   registerOnTouched(fn: () => void): void {
//     this.onTouched = fn;
//   }

//   handleDateChange(event: MatDatepickerInputEvent<Date>): void {
//     this.value = event.value;
//     this.onChange(this.value);
//   }
// }



export class DatePickerComponent implements ControlValueAccessor {
  @Input() title: string = '';
  @Input() id: string = '';
  @Input() values:string='';

  value: Date | null = null;
  onChange: (date: Date | null) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(date: Date | null): void {
    this.value = date;
  }

  registerOnChange(fn: (date: Date | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  handleDateChange(event: MatDatepickerInputEvent<Date>): void {
    this.value = event.value;
    this.onChange(this.value);
    this.onTouched();
  }
}
