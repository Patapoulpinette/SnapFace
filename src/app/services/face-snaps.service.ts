import {Injectable} from "@angular/core";
import {FaceSnapModel} from "../models/face-snap.model";

@Injectable({
  providedIn: "root"
})
export class FaceSnapsService {
  faceSnaps: FaceSnapModel[] = [
    {
      id: 0,
      title: 'Thaïlande',
      description: 'Petit jardin typique',
      createdDate: new Date(),
      snaps: 100,
      imageUrl: 'https://www.pixelstalk.net/wp-content/uploads/2016/06/Desktop-HD-Nature-Wallpapers-1-620x349.jpg',
      snapped: false,
      location: 'Thaïlande'
    },
    {
      id: 1,
      title: 'Norvège',
      description: 'Une nuit féérique',
      createdDate: new Date(),
      snaps: 100,
      imageUrl: 'https://www.pixelstalk.net/wp-content/uploads/2016/06/Download-hd-nature-wallpaper-620x388.jpg',
      snapped: false
    },
    {
      id: 2,
      title: 'Chine',
      description: 'Un voyage inoubliable',
      createdDate: new Date(),
      snaps: 100,
      imageUrl: 'https://www.pixelstalk.net/wp-content/uploads/2016/06/Free-Best-HD-Nature-Wallpapers-620x349.jpg',
      snapped: false
    },
    {
      id: 3,
      title: 'Tahiti',
      description: 'Petit tour sur un voilier',
      createdDate: new Date(),
      snaps: 100,
      imageUrl: 'https://www.pixelstalk.net/wp-content/uploads/2016/06/Free-Download-HD-Nature-Wallpapers-Desktop-620x388.jpg',
      snapped: false
    },
    {
      id: 4,
      title: 'Auvergne',
      description: 'Escapade en Auvergne',
      createdDate: new Date(),
      snaps: 100,
      imageUrl: 'https://www.pixelstalk.net/wp-content/uploads/2016/06/Green-Free-Download-HD-Nature-Wallpapers-620x388.jpg',
      snapped: false
    },
    {
      id: 5,
      title: 'Feuilles',
      description: 'Le bel érable de mon jardin',
      createdDate: new Date(),
      snaps: 100,
      imageUrl: 'https://www.pixelstalk.net/wp-content/uploads/2016/06/Green-Nature-HD-Wallpapers-620x388.jpg',
      snapped: false
    },
    {
      id: 6,
      title: 'Suède',
      description: 'Au fin fond de la forêt',
      createdDate: new Date(),
      snaps: 100,
      imageUrl: 'https://www.pixelstalk.net/wp-content/uploads/2016/06/Green-Nature-Lake-with-Waterfall-620x349.jpg',
      snapped: false
    },
    {
      id: 7,
      title: 'Chine',
      description: 'Roadtrip avec une amie',
      createdDate: new Date(),
      snaps: 100,
      imageUrl: 'https://www.pixelstalk.net/wp-content/uploads/2016/06/HD-images-of-nature-download-620x349.jpg',
      snapped: false,
      location: 'Guilin, Chine'
    }];

  getAllFaceSnaps(): FaceSnapModel[] {
    return this.faceSnaps;
  }

  getFaceSnapById(faceSnapId: number): FaceSnapModel {
    const faceSnap = this.faceSnaps.find(faceSnap => faceSnap.id === faceSnapId);
    if (!faceSnap) {
      throw new Error('FaceSnap not found!');
    } else {
      return faceSnap;
    }
  }

  snapFaceSnapById(faceSnapId: number, snapType: 'snap' | 'unsnap'): void {
    const faceSnap = this.getFaceSnapById(faceSnapId);
    snapType === 'snap' ? faceSnap.snaps++ : faceSnap.snaps--;
  }
}

/*
https://www.pixelstalk.net/wp-content/uploads/2016/06/Desktop-HD-Nature-Wallpapers-1-620x349.jpg
https://www.pixelstalk.net/wp-content/uploads/2016/06/Download-hd-nature-wallpaper-620x388.jpg
https://www.pixelstalk.net/wp-content/uploads/2016/06/Free-Best-HD-Nature-Wallpapers-620x349.jpg
https://www.pixelstalk.net/wp-content/uploads/2016/06/Free-Download-HD-Nature-Wallpapers-Desktop-620x388.jpg
https://www.pixelstalk.net/wp-content/uploads/2016/06/Green-Free-Download-HD-Nature-Wallpapers-620x388.jpg
https://www.pixelstalk.net/wp-content/uploads/2016/06/Green-Nature-HD-Wallpapers-620x388.jpg
https://www.pixelstalk.net/wp-content/uploads/2016/06/Green-Nature-Lake-with-Waterfall-620x349.jpg
https://www.pixelstalk.net/wp-content/uploads/2016/06/HD-images-of-nature-download-620x349.jpg
*/
