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
    console.log('story: ' + this.story);
    console.log('todo: ' + this.todo);
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
}


