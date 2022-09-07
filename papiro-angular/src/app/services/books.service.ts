import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, Observable, tap } from 'rxjs';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private readonly booksUrl = 'api/books';
  private readonly bookUrl = 'api/book';
  private readonly imagesUrl = 'api/images';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient) {

  }

  getAllBooks(): Observable<Book[]> {
    
    return this.httpClient.get<Book[]>(this.booksUrl)
    .pipe(tap(books => console.log(books)));
  }

  getBookById(id: string|null): Observable<Book> {
    const url = `${this.bookUrl}/${id}`;
    console.log(url);
    return this.httpClient.get<Book>(url);
  }

  saveBook(formData: FormData) {
    return this.httpClient.post(this.booksUrl, formData, {observe: 'response'});
  }

  storeImage(data: FormData) {
    return this.httpClient.post(this.imagesUrl, data);
  }

  update(id: number, book: Book) {
    const url = `${this.bookUrl}/${id}`;
    return this.httpClient.put(url, book, this.httpOptions);
  }
}
