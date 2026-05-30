package com.bookstore.service.impl;

import com.bookstore.dto.BookRequestDTO;
import com.bookstore.dto.BookResponseDTO;
import com.bookstore.repository.BookRepository;
import com.bookstore.service.interfaces.BookService;
import java.util.List;
import com.bookstore.entity.Book;
import org.springframework.stereotype.Service;

@Service
public class BookServiceImpl implements BookService {
    private final BookRepository bookRepository;

    public BookServiceImpl(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @Override
    public BookResponseDTO getBookById(Long id) {
        Book book = bookRepository.findById(id).orElseThrow(() -> new RuntimeException("Book not found"));

        return BookResponseDTO.builder()
                .id(book.getId())
                .title(book.getTitle())
                .author(book.getAuthor())
                .price(book.getPrice())
                .stock(book.getStock())
                .build();
    }

    @Override
    public List<BookResponseDTO> getAllBooks() {
        List<Book> books = bookRepository.findAll();

        return books.stream().map(book -> BookResponseDTO.builder()
                .id(book.getId())
                .title(book.getTitle())
                .author(book.getAuthor())
                .price(book.getPrice())
                .stock(book.getStock())
                .build()).toList();
    }

    @Override
    public BookResponseDTO createBook(BookRequestDTO bookRequest) {
        Book book = Book.builder()
                .title(bookRequest.getTitle())
                .author(bookRequest.getAuthor())
                .price(bookRequest.getPrice())
                .stock(bookRequest.getStock())
                .build();

        // .save() will return the saved entity with the generated ID
        Book savedBook = bookRepository.save(book);

        return BookResponseDTO.builder()
                .id(savedBook.getId())
                .title(savedBook.getTitle())
                .author(savedBook.getAuthor())
                .price(savedBook.getPrice())
                .stock(savedBook.getStock())
                .build();
    }

    @Override
    public BookResponseDTO updateBook(Long id, BookRequestDTO bookRequest) {
        Book book = bookRepository.findById(id).orElseThrow(() -> new RuntimeException("Book not found"));

        book.setTitle(bookRequest.getTitle());
        book.setAuthor(bookRequest.getAuthor());
        book.setPrice(bookRequest.getPrice());
        book.setStock(bookRequest.getStock());

        Book updatedBook = bookRepository.save(book);

        return BookResponseDTO.builder()
                .id(updatedBook.getId())
                .title(updatedBook.getTitle())
                .author(updatedBook.getAuthor())
                .price(updatedBook.getPrice())
                .stock(updatedBook.getStock())
                .build();
    }

    @Override
    public void deleteBook(Long id) {
        if (!bookRepository.existsById(id)) {
            throw new RuntimeException("Book not found");
        }
        bookRepository.deleteById(id);
    }
}
