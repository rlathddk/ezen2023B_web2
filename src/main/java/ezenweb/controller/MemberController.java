package ezenweb.controller;

import ezenweb.model.dto.BoardDto;
import ezenweb.model.dto.MemberDto;
import ezenweb.model.entity.MemberEntity;
import ezenweb.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/member")
@CrossOrigin("http://localhost:3000") // *요청 근원지를 교차 허용
public class MemberController {

    @Autowired private MemberService memberService;

    @PostMapping("/signup/post.do") // 1. 회원가입
    public boolean doSignupPost( @RequestBody MemberDto memberDto){
        return memberService.doSignupPost( memberDto );
    }

// ========== 스프링 시큐리티 사용으로 인한 로그인/로그아웃 사용 안함 ==================

//    @PostMapping("/login/post.do") // 2. 로그인
//    public boolean doLoginPost(MemberDto memberDto){
//        System.out.println("memberDto = " + memberDto);
//        return memberService.doLoginPost(memberDto);
//    }
//    @GetMapping("/logout/get.do") // 3. 로그아웃
//    public boolean doLogOutGet(){
//        return memberService.doLogOutGet();
//    }

    @GetMapping("/login/info/get.do")
    public MemberDto doLoginInfo(){
        return memberService.doLoginInfo();
    }

    @GetMapping("/find/email/get.do")
    public boolean doFindEmail(String memail){
        return memberService.getFindMemail(memail);
    }

    @GetMapping("/find/myboard/get.do")
    public List<BoardDto> findByMyBoardList(){
        return memberService.findByMyBoardList();
    }
}
