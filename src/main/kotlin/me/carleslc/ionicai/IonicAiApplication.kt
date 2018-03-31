package me.carleslc.ionicai

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.EnableAutoConfiguration
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.web.support.SpringBootServletInitializer
import org.springframework.context.annotation.Configuration

@EnableAutoConfiguration
@Configuration
@SpringBootApplication
class IonicAiApplication : SpringBootServletInitializer()

fun main(args: Array<String>) {
    SpringApplication.run(IonicAiApplication::class.java, *args)
}
