import { Component, OnInit, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDragEnter, CdkDragExit } from '@angular/cdk/drag-drop';
import { BoardService } from '../board-service/board.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input()storyTitle: any;
  @Input()todo: any;
  @Input()progress: any;
  @Input()done: any;
  showStory = true;

  constructor() {
  }

  ngOnInit() {

  }

  drop($event: CdkDragDrop<string[]>) {

    this.dropListExited($event);

    if ($event.previousContainer === $event.container) {
      moveItemInArray($event.container.data, $event.previousIndex, $event.currentIndex);
    } else {
      transferArrayItem($event.previousContainer.data,
                        $event.container.data,
                        $event.previousIndex,
                        $event.currentIndex);
    }
  }

  dropListEntered($event: CdkDragEnter) {
    switch ($event.container.id) {
      case 'todo':
          this.todo.dragged = true;
          break;
      case 'progress':
          this.progress.dragged = true;
          break;
      case 'done':
          this.done.dragged = true;
          break;
      default:
          break;
    }
  }

  dropListExited($event: CdkDragExit) {
    switch ($event.container.id) {
      case 'todo':
          this.todo.dragged = false;
          break;
      case 'progress':
          this.progress.dragged = false;
          break;
      case 'done':
          this.done.dragged = false;
          break;
      default:
          break;
    }
  }

  toggleStoryVisiblity() {
    this.showStory = !this.showStory;
  }
}


