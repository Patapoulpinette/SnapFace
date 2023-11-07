import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {map, Observable, tap} from "rxjs";
import {FaceSnapModel} from "../../../core/models/face-snap.model";
import {FaceSnapsService} from "../../../core/services/face-snaps.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-face-snap',
  templateUrl: './new-face-snap.component.html',
  styleUrls: ['./new-face-snap.component.scss']
})
export class NewFaceSnapComponent implements OnInit {
  snapForm!: FormGroup;
  faceSnapPreview$!: Observable<FaceSnapModel>;
  urlRegex!: RegExp;

  constructor(
    private formBuilder: FormBuilder,
    private faceSnapService: FaceSnapsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/;
    this.snapForm = this.formBuilder.group({
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
      imageUrl: this.formBuilder.control(null, {
        validators: [Validators.required, Validators.pattern(this.urlRegex)],
        updateOn: 'blur'
      }),
      location: [null]
    });
    this.faceSnapPreview$ = this.snapForm.valueChanges.pipe(
      map(formValue => ({
        ...formValue,
        createdDate: new Date(),
        snaps: 0,
        id: 0
      }))
    );
  }

  onSubmitForm() {
    this.faceSnapService.addFaceSnap(this.snapForm.value).pipe(
      tap(() => this.router.navigateByUrl('facesnaps'))
    ).subscribe();
  }
}
