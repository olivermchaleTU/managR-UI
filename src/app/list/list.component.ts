import { Component, OnInit, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDragEnter, CdkDragExit } from '@angular/cdk/drag-drop';
import { BoardService } from '../board-service/board.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  story: any;
  todo: any;
  progress: any;
  done: any;
  isDragged = false;

  constructor(private boardService: BoardService) {
  }

  ngOnInit() {
    this.boardService.getBoard().subscribe(
      resp => this.handleBoardResponse(resp),
      err => this.handleBoardError(err)
    );
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

  handleBoardResponse(resp: any) {
    this.story = resp.story;
    this.todo = resp.todo;
    this.progress = resp.progress;
    this.done = resp.done;
  }

  handleBoardError(error: any) {
    console.log(error);
  }

  dropListEntered($event: CdkDragEnter) {
    switch ($event.container.id) {
      case 'story':
          this.story.dragged = true;
          break;
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
      case 'story':
          this.story.dragged = false;
          break;
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
}


