import { UsersService } from './../../services/users.service';
import { switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { initializeApp } from '@angular/fire/app';
import { Component, OnInit } from '@angular/core';
import { WindowService } from 'src/app/services/window.service';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


import { RecaptchaVerifier } from 'firebase/auth';

var config = {
  apiKey: "AIzaSyD3P9K8OVeommyHrkqJPEfGn53HHnjqq_Y",
  authDomain: "angular-task-94c93.firebaseapp.com",
  projectId: "angular-task-94c93",
  storageBucket: "angular-task-94c93.appspot.com",
  messagingSenderId: "259823997987",
  appId: "1:259823997987:web:dcd0d3d9e30367a1b6cd96"
}

export class PhoneNumber {
  number!: string;

  // format phone number as E.164
  get e164() {
    const num = this.number
    return `+2${num}`
  }
}

@Component({
  selector: 'app-phone-login',
  templateUrl: './phone-login.component.html',
  styleUrls: ['./phone-login.component.scss']
})
export class PhoneLoginComponent implements OnInit {

  windowRef: any;

  phoneNumber = new PhoneNumber;

  verificationCode!: string;

  user: any;

  isCode = false;

  constructor(
    private win: WindowService,
    private toast: HotToastService,
    private usersService: UsersService,
    private router: Router
  ) { }

  ngOnInit() {
    firebase.initializeApp(config);

    this.windowRef = this.win.windowRef
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container')

    this.windowRef.recaptchaVerifier.render()
  }

  sendLoginCode() {
    const appVerifier = this.windowRef.recaptchaVerifier;

    const num = this.phoneNumber.e164;

    firebase.auth().signInWithPhoneNumber(num, appVerifier)
      .then(result => {
        this.isCode = true;
        this.windowRef.confirmationResult = result;
        this.toast.observe({
          success: 'code sent successfully',
          loading: 'sending code...',
          error: ({ message }) => `There was an error: ${message} `
        })
      })
  }

  verifyLoginCode() {
    const num = this.phoneNumber.e164;
    this.windowRef.confirmationResult
      .confirm(this.verificationCode)
      .then((result: any) => {
        this.user = result.user;
        const uid = result.user.uid;
        this.usersService.addUser({ uid, phone: num, displayName: num })
        this.toast.observe({
          success: 'logged in successfully',
          loading: 'logging in',
          error: ({ message }) => `there was an error: ${message} `
        })
        this.router.navigate(['/home']);
      })
  }

}
