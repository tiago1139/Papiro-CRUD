import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BooksService } from '../books/books.service';
import { Book } from '../models/book';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentRate = 0;
  books: Observable<Book[]>;
  panelOpenState = false;
  constructor(private booksService: BooksService) {
    this.books = this.booksService.getAllBooks();
   }

  ngOnInit(): void {
  }

}
