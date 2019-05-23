import { Component, OnInit } from '@angular/core';
import { BoardService } from '../board-service/board.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  constructor(private boardService: BoardService) { }
  stories: any;


  ngOnInit() {
    this.boardService.getBoard().subscribe(
      resp => this.handleBoardResponse(resp),
      err => this.handleBoardError(err)
    );
  }

  handleBoardResponse(resp: any) {
    this.stories = resp.stories;
  }

  handleBoardError(error: any) {
    console.log(error);
  }

}
