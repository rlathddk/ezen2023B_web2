package ezenweb.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.UUID;
@Service
public class FileService {

    // 어디에 누구를
    String uploadPath = "C:\\Users\\504\\Desktop\\ezen2023B_web2\\build\\resources\\main\\static\\uploadimg\\";

    // 1. 업로드 메소드
    public String fileUpload(MultipartFile multipartFile){
        String uuid = UUID.randomUUID().toString();
        System.out.println("uuid = " + uuid);
        String filename = uuid+"_"+multipartFile.getOriginalFilename().replaceAll("_","-");


        File file = new File(uploadPath+filename);
        // 2. [무엇을] 첨부파일 객체
        // /.transferTo(경로)
        try {
            multipartFile.transferTo(file);
        }catch (Exception e) {
            System.out.println("e = " + e);
        }
        return filename; // 반환 : 어떤 이름으로 업로드 했는지 식별명 반환해서
    }
}
