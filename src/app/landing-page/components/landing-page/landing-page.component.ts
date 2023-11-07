import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  userMail: string = 'email@exemple.com';
  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  onContinue() {
    this.router.navigateByUrl('facesnaps');
  }

  onSubmitForm(form: NgForm) {
    console.log(`Merci pour cette info : ${form.value.userMail}, par contre on a pas de newsletter !`);
  }

  handleFocus() {
    if (this.userMail === "email@exemple.com") {
      this.userMail = "";
    }
  }

  handleBlur() {
    if (!this.userMail.trim()) { // si l'input est vide après le blur
      this.userMail = "email@exemple.com";
    }
  }
}
