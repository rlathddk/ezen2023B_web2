package ezenweb.model.dto;

import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.List;
import java.util.Objects;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@SuperBuilder
@ToString
public class PageDto {
    int page;       // 현재 페이지
    int count;      // 총 페이지수
    List<Object> data ; // 본문 내용들
}
