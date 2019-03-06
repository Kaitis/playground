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
  }

  openDialogWithImage() {
    const ref = this.dialog.open(ExampleComponent, {
      data: {
        header: {
          title: '',
          buttons: [
            {title: '1st', icon: 'home', action: {methodName: 'log', methodParam: '1st'}, disabled: true},
            {title: '', icon: 'favorite', action: {methodName: 'log', methodParam: '2nd'}, disabled: false},
            {title: '3rd', icon: 'alarm', action: {methodName: 'onClose', methodParam: '3rd'}, disabled: false}
          ]
        },
        content: {
          message: 'I am totally dynamic!',
          imageSrc: '../assets/robot.jpg',
        },
        footer: {
          buttons:[
            {title: '', icon: 'home', action: {methodName: 'log', methodParam: 'home'}, disabled: false},
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

  openBasicDialog() {
    const ref1 = this.dialog.open(ExampleComponent, {
      data: {
        header: {
          title: 'I am a Header with no buttons :(',
          buttons: []
        },
        content: {
          message: 'My content has no image',
          imageSrc: '',
        },
        footer: {
          buttons:[
            {title: '1st', icon: 'home', action: {methodName: 'log', methodParam: '1st'}, disabled: true},
            {title: '2nd', icon: 'favorite', action: {methodName: 'log', methodParam: ''}, disabled: false},
            {title: 'tap', icon: 'favorite', action: {methodName: 'log', methodParam: 'tap'}, disabled: false},
            {title: 'ok', icon: 'favorite', action: {methodName: 'log', methodParam: 'ok'}, disabled: false},
            {title: '3rd', icon: 'alarm', action: {methodName: 'log', methodParam: '3rd'}, disabled: true}
          ]
        },
      },
    });

    ref1.afterClosed.subscribe(result => {
      console.log('Dialog closed', result);
    });
  }

  openDialogWithOnlyImage() {
    const ref1 = this.dialog.open(ExampleComponent, {
      data: {
        header: {
          title: '',
          buttons: []
        },
        content: {
          message: '',
          imageSrc: '../assets/robot.jpg',
        },
        footer: {
          buttons:[]
        },
      },
    });

    ref1.afterClosed.subscribe(result => {
      console.log('Dialog closed', result);
    });
  }
}

