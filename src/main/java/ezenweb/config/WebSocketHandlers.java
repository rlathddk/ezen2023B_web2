package ezenweb.config;

import ezenweb.controller.ChatSocket;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration // 스프링 컨테이너에 빈 등록
@EnableWebSocket // 웹소켓 매핑

public class WebSocketHandlers implements WebSocketConfigurer {
    @Autowired private ChatSocket socket;
    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        // - ws로 요청된 url들을 어디로 핸들러 할껀지 설정
        registry.addHandler(socket,"/Chat");
    }

    // * 스프링 버전에 따라 라이브러리 이름 다를 수 있음
    // 1. 웹소켓 매핑 등록

}
