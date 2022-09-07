import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Book } from '../models/book';
import { Rating } from '../models/rating';
import { Convert, User } from '../models/user';
import { BooksService } from '../services/books.service';
import { RatingService } from '../services/rating.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

  book!: Book;
  user!:  User;
  blocked = true;

  userRating!: Rating;

  rate: number;

  constructor(
    private bookService: BooksService,
    private ratingService: RatingService,
    private route: ActivatedRoute
  ) {
    this.rate = 3;
    this.getUser();
    this.getBook().subscribe(book => {
      this.book = book;
      this.getUserRating()?.subscribe(rating => {
        this.userRating = rating;
        this.rate = this.userRating?.value == null ? 0 : this.userRating.value;
        console.log("current rate: "+this.rate);
      });

    });
    
    if(this.userRating !== null) {
      console.log("RATING EXISTEEEEE")
      console.log(JSON.stringify(this.userRating))
      this.rate = this.userRating?.value;
      console.log("RATEE : : : : "+this.rate)
    }
   }

  ngOnInit(): void {
  }

  async getUser() {
    if(sessionStorage.getItem("user")) {
      this.user = await JSON.parse(sessionStorage.getItem("user") || "{}");
    } 
    console.log(this.user);
  }

  getBook() {
    const id = this.route.snapshot.paramMap.get('id');
    return this.bookService.getBookById(id);

  }

  getUserRating() {

    if(this.user == null) {
      console.log("USER NULL");
      return;
    }
    if(this.book == null) {
      console.log("BOOK NULL");
      return;
    }
    return this.ratingService.getRatingByUserAndBook(this.user, this.book);

  }

  avaliar(): void {
    if(this.user == null) {
      console.log("USER NULL");
      return;
    }
    if(this.book == null) {
      console.log("BOOK NULL");
      return;
    }
    if(this.userRating) {
      this.userRating.value = this.rate;
      this.ratingService.updateRating(this.userRating?._id, this.userRating)
      .subscribe(res => {
        console.log(res);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      });
      return;
    }

    const newRating = {} as Rating
    newRating.book = this.book;
    console.log("NEW RATING BOOK: "+newRating.book.title);
    newRating.user = this.user;
    console.log("NEW RATING USER: "+newRating.user.username);
    newRating.value = this.rate;

    console.log(JSON.stringify(newRating));

    this.ratingService.createRating(newRating).subscribe(res => {
      console.log(res);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    });
    
  }

  block() {
    this.blocked = true;
  }

  unblock() {
    this.blocked = false;
  }


}
