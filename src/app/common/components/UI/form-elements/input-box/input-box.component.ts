import {Component, input} from '@angular/core';
import { Input } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-input-box',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './input-box.component.html',
  styleUrl: './input-box.component.scss'
})
export class InputBoxComponent {
  
  @Input() formName: string='';
  @Input() placeholder: string='';
  @Input() title: string='';
  @Input() value: string='';
  @Input() id: string='';
}

