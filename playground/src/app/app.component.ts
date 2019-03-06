import {Component} from '@angular/core';
import {ExampleComponent} from "./example.component";
import {TwkPopupFactoryDialogService} from "./twk-popup-factory/twk-popup-factory-dialog.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'playground';
  constructor(public dialog: TwkPopupFactoryDialogService) {
    const ref = this.dialog.open(ExampleComponent, {
      data: {
        header: {
          title: '',
          buttons: [
            {title: '1st', icon: 'home', action: {methodName: 'log', methodParam: '1st'}, disabled: true},
            {title: '2nd', icon: 'favorite', action: {methodName: 'log', methodParam: '2nd'}, disabled: false},
            {title: '3rd', icon: 'alarm', action: {methodName: 'log', methodParam: '3rd'}, disabled: false}
          ]
        },
        content: {
          message: 'I am totally dynamic!',
          imageSrc: '../assets/robot.jpg',
        },
        footer: {
          buttons:[
            {title: '1st', icon: 'home', action: {methodName: 'log', methodParam: '1st'}, disabled: true},
            {title: '2nd', icon: 'favorite', action: {methodName: 'log', methodParam: ''}, disabled: false},
            {title: '3rd', icon: 'alarm', action: {methodName: 'log', methodParam: '3rd'}, disabled: false}
          ]
        },
      },
    });

    ref.afterClosed.subscribe(result => {
      console.log('Dialog closed', result);
    });
  }
}
