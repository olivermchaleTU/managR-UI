import { Component, OnInit, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  todo = [
    {
      title: 'Get to work',
      description: 'Get in the car and drive to work'
    },
    {
      title: 'Pick up groceries',
      description: 'Get in the car and pick up groceries'
    },
    {
      title: 'Get Changed',
      description: 'Find clothes, get changed'
    }
  ];
 
  done = [
    {
      title: 'Win a game of league',
      description: 'Pick Rengar and win a game'
    }
  ];
 
  inProgress = [
    {
      title: 'Show off work',
      description: 'Fail to impress friends by showing lackluster work'
    }
  ];

  constructor() {

  }

  ngOnInit() {
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }
}


