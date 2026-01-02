package com.techoverflow.authService.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.concurrent.TimeUnit;

@Slf4j
@Service
public class RedisService {

    @Autowired
    private RedisTemplate redisTemplate;

    @Autowired
    private  ObjectMapper mapper;

    public void set(String token, Object o) {
        log.info("inside redis set method");
        try {

            String json = mapper.writeValueAsString(o);
            String key="refreshToken:"+token;
            redisTemplate.opsForValue().set(key, json, Duration.ofDays(7));
            log.info("get: "+(String) redisTemplate.opsForValue().get(key));
        } catch (Exception e) {
            log.error("an error ocured during serialization: "+e);
        }
    }

    public <T> T get(String token, Class<T> entity) {
        try {
            log.info("inside redis get");
            log.info("token: "+token);
            String key="refreshToken:"+token;
            Object o = redisTemplate.opsForValue().get(key);
            if(o!=null) {
                log.info("value from redis: "+mapper.readValue(o.toString(), entity));
                return mapper.readValue(o.toString(), entity);
            }
            return null;
        } catch (JsonProcessingException e) {
            log.info("error during fething from redis");
            log.error("exception during get {}", e);
            return null;
        }
    }

    public void deleteKey(String token) {
        try{
            log.info("inside delete key method");
            String key = "refreshToken:" + token;
            Object o = redisTemplate.opsForValue().get(key);
            log.info("object: "+o);
            if(o!=null){
                log.info("about to delete the key");
                redisTemplate.delete(key);
            }
        }catch (Exception e){
            log.error("exception during deleting {}", e);
        }
    }
}
