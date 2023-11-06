import {Component, OnInit} from '@angular/core';
import {FaceSnapsService} from "../services/face-snaps.service";
import {FaceSnapModel} from "../models/face-snap.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-face-snap-list',
  templateUrl: './face-snap-list.component.html',
  styleUrls: ['./face-snap-list.component.scss']
})
export class FaceSnapListComponent implements OnInit {
  faceSnaps$!: Observable<FaceSnapModel[]>;
  constructor(private faceSnapsService: FaceSnapsService) {}

  ngOnInit(): void {
    this.faceSnaps$ = this.faceSnapsService.getAllFaceSnaps();
  }
}
