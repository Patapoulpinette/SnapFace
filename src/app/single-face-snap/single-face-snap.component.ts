import {Component, OnDestroy, OnInit} from '@angular/core';
import {FaceSnapModel} from "../models/face-snap.model";
import {FaceSnapsService} from "../services/face-snaps.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Lightbox, LightboxConfig} from "ngx-lightbox";
import {Observable, Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-single-face-snap',
  templateUrl: './single-face-snap.component.html',
  styleUrls: ['./single-face-snap.component.scss']
})
export class SingleFaceSnapComponent implements OnInit, OnDestroy {
  faceSnap$!: Observable<FaceSnapModel>
  private unsubscribe$ = new Subject<void>();

  constructor(
    private _faceSnapsService: FaceSnapsService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _lightbox: Lightbox,
    private _lightboxOption: LightboxConfig
  ) {
    this._lightboxOption.positionFromTop = 200;
  }

  ngOnInit() {
    const snapId = +this._activatedRoute.snapshot.params['id']; // Add '+' at the beginning of the expression cast a string of numbers in number.
    this.faceSnap$ = this._faceSnapsService.getFaceSnapById(snapId);
  }

  onSwitchSnap(faceSnapId: number) {
    this._faceSnapsService.getFaceSnapById(faceSnapId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (faceSnap: FaceSnapModel) => {
          if (faceSnap.snapped) {
            this.faceSnap$ = this._faceSnapsService.snapFaceSnapById(faceSnapId, 'unsnap');
          }
          else {
            this.faceSnap$ = this._faceSnapsService.snapFaceSnapById(faceSnapId, 'snap');
          }
        }
      );
  }

  onOpenImage(imageUrl: string, description: string): void {
    console.log('Image clicked ' + imageUrl + ' ' + description);
    const album = [{
      src: imageUrl,
      caption: description, // légende (optionnelle)
      thumb: '' // miniature (optionnelle)
    }];
    this._lightbox.open(album, 0);
  }

  onBack() {
    this._router.navigateByUrl('facesnaps');
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
