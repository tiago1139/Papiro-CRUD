import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private readonly booksUrl = 'api/books';
  private readonly bookUrl = 'api/book';

  constructor(private httpClient: HttpClient) {

  }

  getAllBooks(): Observable<Book[]> {
    
    return this.httpClient.get<Book[]>(this.booksUrl)
    .pipe(tap(books => console.log(books)));
  }

  getBookById(id: string|null): Observable<Book> {
    const url = `${this.bookUrl}/${id}`;
    console.log(url);
    return this.httpClient.get<Book>(url)
    .pipe(tap(book => console.log(book)));
  }
}
