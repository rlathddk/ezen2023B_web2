package ezenweb.model.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "boardimg")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@ToString
public class BoardImgEntity extends BaseTime {
    @Id
    private String bimg;    // 파일명(중복 없다 -- 유저는 다수고 서버는 하나) // 식별이 가능

    @JoinColumn(name = "bno_fk")
    @ManyToOne
    private BoardEntity boardEntity;
}
