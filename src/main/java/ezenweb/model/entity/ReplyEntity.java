package ezenweb.model.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "reply")
@AllArgsConstructor @NoArgsConstructor
@Getter @Setter @Builder @ToString
public class ReplyEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int rno;
    private String rcontent;

    // FK필드
    @JoinColumn(name = "bno_fk")
    @ManyToOne // 해당 필드 참조
    private BoardEntity boardEntity;

    // FK필드
    @JoinColumn(name = "mno_fk")
    @ManyToOne
    private MemberEntity memberEntity;
}
