package com.bookstore.dto;

import lombok.*;
import java.math.BigDecimal;

@Getter
@Setter
@Builder
public class BookResponseDTO {

    private Long id;

    private String title;

    private String author;

    private String isbn;

    private BigDecimal price;

    private Integer stock;
}
