package com.bookstore.service.interfaces;

import com.bookstore.dto.BookRequestDTO;
import com.bookstore.dto.BookResponseDTO;
import java.util.List;

public interface BookService {
    BookResponseDTO getBookById(Long id);
    List<BookResponseDTO> getAllBooks();
    BookResponseDTO createBook(BookRequestDTO bookRequest);
    BookResponseDTO updateBook(Long id, BookRequestDTO bookRequest);
    void deleteBook(Long id);
}
