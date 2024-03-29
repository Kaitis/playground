import {Component} from '@angular/core';
import {ExampleComponent} from "./example.component";
import {DynamicPopupFactoryService} from "./dynamic-popup-factory/dynamic-popup-factory.service";
import {MatDialog} from "@angular/material";
import {DynamicFormComponent} from "./dynamic-form/dynamic-form.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'playground';
  start;
  end;
  type:any = new User();
  typeStr = 'activity';
  data = [];

  constructor(public popup: DynamicPopupFactoryService, public dialog: MatDialog) {
    this.data = this.getData('user')
  }

  openDialogWithImage() {
    const ref = this.popup.open(ExampleComponent, {
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
    const ref1 = this.popup.open(ExampleComponent, {
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
    const ref1 = this.popup.open(ExampleComponent, {
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

  openForm(): void  {
    const ref = this.dialog.open(DynamicFormComponent, {
      width: '650px',
      data: {type: this.typeStr.toLowerCase() === 'activity' ? new User() : new Activity()}});

    this.data =  this.getData( this.typeStr.toLowerCase() === 'activity' ? 'user' : 'activity');
    ref.afterClosed().subscribe(result => {
      console.log('The dialog was closed. Result:' + result);
    });
  }

  getData(type: string) {
    if (type.toLowerCase() === 'user')
      return [
          {id: '1', name: 'User1', email:'user1@email.com', enabled: true },
          {id: '2', name: 'User2', email:'user2@email.com', enabled: false },
          {id: '3', name: 'User3', email:'user3@email.com', enabled: true},
          {id: '4', name: 'User4', email:'user4@email.com', enabled: false}];
    else
      return [
        {id: '1', name: 'Activity1', location:'Limassol', enabled: true },
        {id: '2', name: 'Activity2', location:'Nicosia', enabled: true },
        {id: '3', name: 'Activity3', location:'Limassol', enabled: true},
        {id: '4', name: 'Activity4', location:'Limassol', enabled: false}]

  }

  switchData() {
    console.log("Switching to ", this.typeStr);
    if(this.typeStr === 'user' ) {
      this.data = this.getData("user");
      this.type = new Activity();
      this.typeStr = 'activity'
    } else {
      this.data = this.getData("activity")
      this.type = new User();
      this.typeStr = 'user'
    }
  }
}



export class User {
  id?: string = '';
  name?: string = '';
  email?: string = '';
  enabled?: boolean = true;
  blah: string = '';
  blal: number = 0;
  bool2: boolean = false;
  status: UserStatusEnum = UserStatusEnum.S1;
}

export class Activity {
  id?: string = '';
  name?: string = '';
  location?: string = '';
  public?: boolean = true;
  blah: string = '';
  blal: number = 0;
  bool2: boolean = false;
}


export enum UserStatusEnum {
  S1, S2, S3
}
