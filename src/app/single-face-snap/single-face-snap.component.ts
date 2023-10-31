import {Component, OnInit} from '@angular/core';
import {FaceSnapModel} from "../models/face-snap.model";
import {FaceSnapsService} from "../services/face-snaps.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Lightbox, LightboxConfig} from "ngx-lightbox";

@Component({
  selector: 'app-single-face-snap',
  templateUrl: './single-face-snap.component.html',
  styleUrls: ['./single-face-snap.component.scss']
})
export class SingleFaceSnapComponent implements OnInit {
  faceSnap!: FaceSnapModel;
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
    const snapId = +this._activatedRoute.snapshot.params['id']; // Ajouter le + au début de l'expression permet de cast une string de nombres en number.
    this.faceSnap = this._faceSnapsService.getFaceSnapById(snapId);
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
}
