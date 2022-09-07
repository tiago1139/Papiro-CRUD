import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';

import { Book } from '../models/book';
import { Rating } from '../models/rating';
import { BooksService } from '../services/books.service';
import { RatingService } from '../services/rating.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  currentRate = 0;
  books: Observable<Book[]>;

  constructor(
    private booksService: BooksService,
    private ratingService: RatingService,
    private sanitizer: DomSanitizer
  ) {
    this.books = this.booksService.getAllBooks();
   }

  ngOnInit(): void {
  }

  getRating(book:Book): number {
    let result = 0;
    let ratings : Rating[];
    this.ratingService.getRatingsByBook(book)
    .subscribe(res => {
      ratings = res;
      for(let r of ratings) {
        result += r.value;
      }
      result = result/ratings.length;
    });

    return result;
  }

  safeUrl(url:string) : SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

}
