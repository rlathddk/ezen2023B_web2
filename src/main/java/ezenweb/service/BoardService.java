package ezenweb.service;

import ezenweb.model.dto.BoardDto;
import ezenweb.model.dto.MemberDto;
import ezenweb.model.entity.BoardEntity;
import ezenweb.model.entity.BoardImgEntity;
import ezenweb.model.entity.MemberEntity;
import ezenweb.model.entity.ReplyEntity;
import ezenweb.model.repository.BoardEntityRepository;
import ezenweb.model.repository.FileEntityRepository;
import ezenweb.model.repository.MemberEntityRepository;
import ezenweb.model.repository.ReplyEntityRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BoardService {
    // * 리포지토리 객체
    @Autowired private BoardEntityRepository boardEntityRepository;
    @Autowired private MemberEntityRepository memberEntityRepository;
    @Autowired private ReplyEntityRepository replyEntityRepository;
    @Autowired private FileEntityRepository fileEntityRepository;
    @Autowired private  MemberService memberService;

    @Autowired private FileService fileService;
    // 1. C
    @Transactional
    public boolean postBoard(BoardDto boardDto){ //  ======= 테스트 ==========
        MemberDto loginDto = memberService.doLoginInfo();
        if(loginDto == null)
            return false;

            // 1. 로그인된 회원 엔티티 찾기
            Optional<MemberEntity> optionalMemberEntity =
            memberEntityRepository.findById(loginDto.getMno());
            /// 2. 찾은 엔티티가 존재하지 않으면
            if(!optionalMemberEntity.isPresent()) return false;
            // 3. 엔티티 꺼내기
            MemberEntity memberEntity = optionalMemberEntity.get();

             // - 글쓰기
            BoardEntity saverBoard = boardEntityRepository.save(boardDto.toEntity());
                // - FK 대입

        // 1. 첨부 파일 처리
        // 첨부파일이 존재하면
        for(int i=0; i<boardDto.getUploadList().size(); i++){
            String file = fileService.fileUpload(boardDto.getUploadList().get(i));
            fileEntityRepository.save(BoardImgEntity.builder().bimg(file).boardEntity(saverBoard).build());
        }

        if(saverBoard.getBno() >= 1){
            saverBoard.setMemberEntity(memberEntity);
            return true;
        }
        return false;
    }
    // 2. R
    @Transactional
    public List<BoardDto> getBoard(){

        // 1. 리포지토리를 이용한 모든 엔티티( 테이블에 매핑 하기전 엔티티 )를 호출
        List<BoardEntity> result = boardEntityRepository.findAll();
        // 2. Entity --- > Dto 변환한다
        List<BoardDto> boardDtoList = new ArrayList<>();

        // ========== 1번째 방법 ========== //

            // 1. 꺼내온 entity을 순회한다
//        for(int i = 0; i < result.size(); i++){
//            // 2. 하나씩 entity 꺼낸다
//            BoardEntity boardEntity = result.get(i);
//            // 3. 해당 엔티티를 dto로 변환한다
//            BoardDto boardDto = boardEntity.toDto();
//                // -------------- 게시물안에 게시물사진
//            List<String> bimgList = new ArrayList<>();
//                for(int j = 0; j < boardEntity.getBoardImgEntityList().size(); j++){
//                    BoardImgEntity boardImgEntity = boardEntity.getBoardImgEntityList().get(j);
//
//                    String bimg = boardImgEntity.getBimg();
//                    bimgList.add(bimg);
//                }
//                boardDto.setBimglist(bimgList);
//            // 4. 변환된 dto를 리스트에 담는다
//            boardDtoList.add(boardDto);
//        }
//        return boardDtoList;

        // ========== 2번째 방법 ========== //
        return boardEntityRepository.findAll().stream().map((boardEntity) -> {
            return boardEntity.toDto();
        }).collect(Collectors.toList());
    }
    // 3. U
    @Transactional
    public boolean putBoard(){
        BoardEntity boardEntity = boardEntityRepository.findById( 1 ).get();
        boardEntity.setBcontent("JPA수정테스트중");
        return false;
    }
    // 4. D
    @Transactional
    public boolean deleteBoard(){
        boardEntityRepository.deleteById( 1 );
        return false;
    }
}
