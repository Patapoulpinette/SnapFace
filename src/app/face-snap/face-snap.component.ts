import {Component, Input} from '@angular/core';
import {FaceSnapModel} from "../models/face-snap.model";
import {FaceSnapsService} from "../services/face-snaps.service";
import {Lightbox, LightboxConfig} from "ngx-lightbox";
import {Router} from "@angular/router";

@Component({
  selector: 'app-face-snap',
  templateUrl: './face-snap.component.html',
  styleUrls: ['./face-snap.component.scss']
})
export class FaceSnapComponent {
  @Input() faceSnap!: FaceSnapModel;
  constructor(
    private _faceSnapsService: FaceSnapsService,
    private _lightbox: Lightbox,
    private _lightboxOption: LightboxConfig,
    private _router: Router
  ) {
    _lightboxOption.positionFromTop = 200;
    _lightboxOption.fadeDuration = 0.3;
  }

  onSwitchSnap() {
    if (this.faceSnap.snapped) {
      this._faceSnapsService.snapFaceSnapById(this.faceSnap.id, 'unsnap');
      this.faceSnap.snapped = false;
    }
    else {
      this._faceSnapsService.snapFaceSnapById(this.faceSnap.id, 'snap');
      this.faceSnap.snapped = true;
    }
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
}
