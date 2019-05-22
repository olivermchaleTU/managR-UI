import { Component, OnInit, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
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
  isDragged = false

  constructor(private boardService: BoardService) {
  }

  ngOnInit() {
    this.boardService.getBoard().subscribe(
      resp => this.handleBoardResponse(resp),
      err => this.handleBoardError(err)
    )
  }

  drop($event: CdkDragDrop<string[]>) {
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

  dropListEntered($event) {
    switch ($event.container.id) {
      case 'story':
          console.log('hovering story')
          break;
      case 'todo':
          console.log('hovering todo')
          break;
      case 'progress':
          console.log('hovering progress')
          break;
      case 'done':
          console.log('hovering done')
          break;
    
      default:
        break;
    }
  }
}


