import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BookDetailComponent } from './book-detail/book-detail.component';
import { BooksComponent } from './books/books.component';
import { CreateBookComponent } from './create-book/create-book.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';



const routes: Routes = [
  {path: '', redirectTo:'index', pathMatch:'full'},
  {path: 'index', component: HomeComponent},
  {path: 'books', component: BooksComponent},
  {path: 'book/:id', component: BookDetailComponent},
  {path: 'add-book', component: CreateBookComponent},
  {path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
