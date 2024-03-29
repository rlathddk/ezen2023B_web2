package ezenweb.model.dto;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@SuperBuilder
@ToString

public class BaseTimeDto {
    public LocalDateTime cdate; //
    public LocalDateTime udate; //
}
