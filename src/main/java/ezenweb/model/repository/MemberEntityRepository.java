package ezenweb.model.repository;

import ezenweb.model.entity.MemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.lang.reflect.Member;
import java.util.List;
import java.util.Map;

@Repository
public interface MemberEntityRepository
        extends JpaRepository<MemberEntity , Integer > {

    // =========== 아이디 중복검사 =============//
    // 1. 특정 필드를 찾는 추상메소드 정의
    MemberEntity findByMemail(String memail);

    // 2. 특정 레코드가 있는지 확인
    boolean existsByMemail(String memail);

    // 3. 직접 native SQL지원
    // select * from member where memail = ?
    // @Query(value = "SQL작성", nativeQuery = true)
        // SQL 매개변수 대입
            // :매개변수명
    @Query(value = "select * from member where memail = :memail ", nativeQuery = true)
    MemberEntity findByMemailSQL(String memail);

    // =============로그인 =================//

    // 1.
    MemberEntity findByMemailAndMpassword(String memail, String mpassword);

    // 2.
    boolean existsByMemailAndMpassword(String memail, String mpassowrd);

    // 3.
    @Query(value = "select * from member" + " where memail = :memail and mpassword = :mpassword", nativeQuery = true)
    MemberEntity findByLoginSQL(String memail, String mpassword);

    // =========== 내가 쓴글 ============ //
    // 1. 양방향일때는 회원 엔티티를 통해 게시물 호출 가능하다

    // 2. 단방향일때는 회원 엔티티를 이용한 게시물  호출할때는 조인 query
    @Query(value = " select * from member m inner join board b" +
        " on m.mno = b.mno_fk where m.mno = :mno" , nativeQuery = true)
    List<Map<Object,Object>> findByMyBoard(int mno);

}

/*
    추상메소드
        1. 특정 필드의 조건으로 레코드/엔티티 검색
            member

        - 반환타입
            해당엔티티 findby
 */


/*

    - 리포지토리 만드는 방법
    1. @Repository
    2. extends JpaRepository< 조작할엔티티 , PK의필드타입 >

    - 리포지토리 이용한 CRUD 메소드
    1. .save( 엔티티 )     : 해당 엔티티객체를 테이블에 삽입 INSERT
        매개변수 : 저장할 엔티티 , 반환타입 : 성공 또는 실패 엔티티

 */
