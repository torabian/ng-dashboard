import { Input, HostBinding, forwardRef } from '@angular/core';
import { IResponse } from 'response-type';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { error } from '../services/common';

const DEFAULT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FormBaseComponent),
  multi: true,
};

export class FormBaseComponent implements ControlValueAccessor {
  @HostBinding('class') @Input() public class = 'form-group col-sm-6';
  @Input() public field = null;
  @Input() public label = null;
  @Input() public type = 'text';
  @Input() public autofocus = false;
  @Input() public edit = true;
  @Input() public optional = true;
  @Input() public placeholder = '';
  @Input() public value = null;
  @Input() public set submit(value: IResponse<any>) {
    // Code for adding shake class :)
    if (!value) {
      return;
    }

    const err = error(value, this.field);
    if (this.class.indexOf('shake-horizontal') === -1 && err) {
      this.class += ' shake-horizontal';
      setTimeout(() => {
        this.class = this.class.replace('shake-horizontal', ' ');
      }, 500);
    }
  }

  @Input() public set res(value: IResponse<any>) {
    this.resp = value;
  }

  public resp = null;

  public error = error;
  constructor() {}

  onChange = (delta: any) => {};

  onInput(value) {
    this.onChange(value);
  }

  writeValue(value: any): void {
    if (!value) {
      return;
    }
    this.value = value;
  }

  registerOnChange(fn: (v: any) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {}
}