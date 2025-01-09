import { Component } from '@angular/core';
import { Book } from '../models/book.model';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit{

  newBookTitle : string = "";
  newBookAuthor : string = "";

  books: Book[] = []
  editIndex: number | null = null; 

  ngOnInit(): void {
    let savedBooks = localStorage.getItem("books")
    this.books = savedBooks ? JSON.parse(savedBooks) : []
  }

  addBook(){
    if(this.newBookTitle.trim().length && this.newBookAuthor){
      let newBook: Book = {
          id: Date.now(),
          title: this.newBookTitle,
          author: this.newBookAuthor
      }
      this.books.push(newBook)

      this.newBookTitle = ""
      this.newBookAuthor = "";

      localStorage.setItem("books", JSON.stringify(this.books))
    }
  }

  deleteBook(index: number){
    this.books.splice(index, 1)
  }

  editBook(index: number) {
    this.editIndex = index; 
    this.newBookTitle = this.books[index].title; 
    this.newBookAuthor = this.books[index].author; 
    this.books.splice(index, 1)
  }

  updateBook() {
    if (this.editIndex !== null) {
      this.books[this.editIndex].title = this.newBookTitle;
      this.books[this.editIndex].author = this.newBookAuthor;
      this.editIndex = null; 
      this.newBookTitle = "";
      this.newBookAuthor = "";
      localStorage.setItem("books", JSON.stringify(this.books)); 
    }
  }

}
