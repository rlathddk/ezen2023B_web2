package ezenweb.model.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "board")
@AllArgsConstructor@NoArgsConstructor
@Getter@Setter@Builder@ToString
public class BoardEntity { // 테이블
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int bno;
    @Column(columnDefinition = "longtext")
    private String bcontent;

    @Column
    @ColumnDefault("0")
    private int bview;

    // 단방향 FK필드
    @JoinColumn(name="mno_fk") // fk필드명
    @ManyToOne // 해당 필드 참조
    private MemberEntity memberEntity;

    // 양방향 : 게시물fk
    @OneToMany(mappedBy = "boardEntity")
    @ToString.Exclude
    @Builder.Default
    private List<ReplyEntity> replyEntityList = new ArrayList<>();
}
/*
    create table BoardEntitiy(
        bno int ,
        btitle varchar(255)
    )
*/