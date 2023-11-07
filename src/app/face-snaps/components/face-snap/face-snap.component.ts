import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FaceSnapModel} from "../../../core/models/face-snap.model";
import {FaceSnapsService} from "../../../core/services/face-snaps.service";
import {Lightbox, LightboxConfig} from "ngx-lightbox";
import {Router} from "@angular/router";
import {Observable, Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-face-snap',
  templateUrl: './face-snap.component.html',
  styleUrls: ['./face-snap.component.scss']
})
export class FaceSnapComponent implements OnInit, OnDestroy {
  @Input() faceSnap!: FaceSnapModel;
  faceSnap$!: Observable<FaceSnapModel>
  private unsubscribe$ = new Subject<void>();

  constructor(
    private _faceSnapsService: FaceSnapsService,
    private _lightbox: Lightbox,
    private _lightboxOption: LightboxConfig,
    private _router: Router
  ) {
    _lightboxOption.positionFromTop = 200;
    _lightboxOption.fadeDuration = 0.3;
  }

  ngOnInit() {
    const snapId = this.faceSnap.id;
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

  onViewFaceSnap() {
    this._router.navigateByUrl(`facesnaps/${this.faceSnap.id}`);
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

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
