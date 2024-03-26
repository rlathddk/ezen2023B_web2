package ezenweb.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/member")
@CrossOrigin("http://localhost:3000") // 요청 근원지를 교차 허용
public class MemberController {

    @PostMapping("/signup/post.do")
    public boolean doSignupPost(){
        return false;
    }
} // c e
