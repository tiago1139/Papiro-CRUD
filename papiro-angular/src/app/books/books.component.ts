import { Component, OnInit } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Book } from '../models/book';
import { BooksService } from './books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  currentRate = 0;
  books: Observable<Book[]>;

  constructor(
    private booksService: BooksService
  ) {
    this.books = this.booksService.getAllBooks();
   }

  ngOnInit(): void {
  }

}
