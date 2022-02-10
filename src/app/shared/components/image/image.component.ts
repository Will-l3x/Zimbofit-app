import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ImageService } from '../../../services/image.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {
  @Input()
  public post_id: string;

  @Output()
  public image_click: EventEmitter<any> = new EventEmitter();

  @Output()
  public uploaded: EventEmitter<any> = new EventEmitter();

  @Output()
  public deleted: EventEmitter<any> = new EventEmitter();

  public images$: Observable<any>;

  public uploadProgress: Observable<number>;

  constructor(private imageService: ImageService) { }

  ngOnInit() {
    this.images$ = this.imageService.getPostImages(this.post_id);

    this.imageService.getImageUploads().subscribe(image => {
      // console.log(image);
      if (image.id === this.post_id) { this.uploaded.emit(image); }
    });

    this.imageService.getImageDeletes().subscribe(image => {
      if (image.id === this.post_id) { this.deleted.emit(image); }
    });
  }

  uploadFile(event) {
    // console.log(event);
    this.uploadProgress = this.imageService.uploadFile(event, this.post_id);
  }

  onDelete(image: any) {
    this.imageService.deleteImage(image);
  }
}
