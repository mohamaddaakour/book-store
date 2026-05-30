package com.bookstore.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import com.bookstore.dto.BookRequestDTO;
import com.bookstore.dto.BookResponseDTO;

import com.bookstore.service.interfaces.BookService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import java.util.List;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;



@RestController
@RequestMapping("/api/books")
public class BookController {
    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    // @RequestBody is used to bind the incoming JSON request from the http request to the BookRequestDTO object
    @PostMapping
    public ResponseEntity<BookResponseDTO> createBook(@Valid @RequestBody BookRequestDTO bookRequest) {
        BookResponseDTO createdBook = bookService.createBook(bookRequest);

        // Return a 201 Created status with the created book in the response body
        return ResponseEntity.status(HttpStatus.CREATED).body(createdBook);
    }

    // @PathVariable is used to extract the {id} from the URL and pass it as a parameter to the method
    @GetMapping("/{id}")
    public ResponseEntity<BookResponseDTO> getBookById(@PathVariable Long id) {
        BookResponseDTO book = bookService.getBookById(id);

        // Return a 200 OK status with the book in the response body
        return ResponseEntity.ok(book);
    }
    

    @GetMapping
    public ResponseEntity<List<BookResponseDTO>> getAllBooks() {
        List<BookResponseDTO> books = bookService.getAllBooks();

        // Return a 200 OK status with the list of books in the response body
        return ResponseEntity.ok(books);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable Long id) {
        bookService.deleteBook(id);

        // Return a 204 No Content status to indicate successful deletion with no response body
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<BookResponseDTO> updateBook(@PathVariable Long id, @Valid @RequestBody BookRequestDTO bookRequest) {
        BookResponseDTO updatedBook = bookService.updateBook(id, bookRequest);

        return ResponseEntity.ok(updatedBook);
    }
}
