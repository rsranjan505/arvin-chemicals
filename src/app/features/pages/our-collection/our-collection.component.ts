import { Component } from '@angular/core';
import { ProductListsComponent } from "../components/product-lists/product-lists.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-our-collection',
  imports: [ProductListsComponent],
  templateUrl: './our-collection.component.html',
  styleUrl: './our-collection.component.css'
})
export class OurCollectionComponent {

  pauseVideo(video: HTMLVideoElement) {
    video.pause();
  }

  playVideo(video: HTMLVideoElement) {
    video.play();
  }
}
