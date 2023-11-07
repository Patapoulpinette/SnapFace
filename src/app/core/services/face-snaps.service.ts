import {Injectable} from "@angular/core";
import {FaceSnapModel} from "../models/face-snap.model";
import {HttpClient} from "@angular/common/http";
import {map, Observable, switchMap} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class FaceSnapsService {
  faceSnaps: FaceSnapModel[] = [];

  constructor(private httpClient: HttpClient) {
  }

  getAllFaceSnaps(): Observable<FaceSnapModel[]> {
    return this.httpClient.get<FaceSnapModel[]>('http://localhost:3000/facesnaps');
  }

  getFaceSnapById(faceSnapId: number): Observable<FaceSnapModel> {
    return this.httpClient.get<FaceSnapModel>(`http://localhost:3000/facesnaps/${faceSnapId}`);
  }

  createNewFaceSnap(newFaceSnap: FaceSnapModel): Observable<FaceSnapModel> {
    return this.httpClient.post<FaceSnapModel>('http://localhost:3000/facesnaps', newFaceSnap);
  }

  updateFaceSnap(faceSnapId: number, updatedFaceSnap: FaceSnapModel): Observable<FaceSnapModel> {
    return this.httpClient.put<FaceSnapModel>(`http://localhost:3000/facesnaps/${faceSnapId}`, updatedFaceSnap);
  }

  snapFaceSnapById(faceSnapId: number, snapType: 'snap' | 'unsnap'): Observable<FaceSnapModel> {
    return this.getFaceSnapById(faceSnapId).pipe(
      map(faceSnap => ({
        ...faceSnap,
        snaps: faceSnap.snaps + (snapType === 'snap' ? 1 : -1),
        snapped: !faceSnap.snapped
      })),
      switchMap(updatedFaceSnap => this.updateFaceSnap(faceSnapId, updatedFaceSnap))
    );
  }

  addFaceSnap(formValue: { title: string, description: string, imageUrl: string, location?: string }): Observable<FaceSnapModel> {
    return this.getAllFaceSnaps().pipe(
      map((faceSnaps: FaceSnapModel[]) => ({
      id: faceSnaps[faceSnaps.length - 1].id + 1,
      ...formValue,
      snaps: 0,
      createdDate: new Date(),
      snapped: false
    })),
      switchMap((newFaceSnap) => this.createNewFaceSnap(newFaceSnap))
    );
  }
}
