import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-addads',
  templateUrl: './addads.component.html',
  styleUrls: ['./addads.component.scss']
})
export class AddadsComponent implements OnInit {

  adForm = new FormGroup({
    image: new FormControl(),
    video: new FormControl(),
    from_time: new FormControl(),
    to_time: new FormControl(),

  });

  constructor(
    private formBuilder: FormBuilder,

  ) { }

  ngOnInit(): void {
    this.resetForm();
  }

  // reset form
  resetForm(): void {
    this.adForm = this.formBuilder.group({
      image: [''],
      video: [''],
      from_time: ['', Validators.required],
      to_time: ['', Validators.required],

    });
  }


}
