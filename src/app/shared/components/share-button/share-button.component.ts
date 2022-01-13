import { Component, OnInit, Input } from "@angular/core";
import { SocialSharing } from "@ionic-native/social-sharing/ngx";

@Component({
  selector: "share-button",
  templateUrl: "./share-button.component.html",
  styleUrls: ["./share-button.component.scss"]
})
export class ShareButtonComponent implements OnInit {
  @Input() workout: any;
  
  constructor(private socialSharing: SocialSharing) {}

  ngOnInit() {}

  onShare() {
    // Share via email
    this.socialSharing
      .share(`I have completed ${this.workout.name}`, 
        `${this.workout.name} Completed`, 
        [],
        'https://youtube.com'
        )
      .then(() => {
        // Success!
      })
      .catch(() => {
        // Error!
      });
  }
}
