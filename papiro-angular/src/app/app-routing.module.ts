import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BooksComponent } from './books/books.component';
import { HomeComponent } from './home/home.component';



const routes: Routes = [
  
  {path: '', component: HomeComponent},
  {path: 'books', component: BooksComponent},
  {path: 'book/:id', component: BookDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
