package com.nobukata.trainlife.rest;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/v1/photo")
public class PhotoController {

    @Value("${file.upload-dir}")
    private String uploadDir;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadPhoto(@RequestParam MultipartFile file) {
        try {
            File directory = new File(uploadDir);
            if (!directory.exists()) {
                directory.mkdirs();
            }

            //Date date = new Date();
            String fileName = file.getOriginalFilename();
            Path filePath = Paths.get(uploadDir, fileName);

            Files.copy(file.getInputStream(), filePath);

            return ResponseEntity.ok().body("Фотография " + file.getResource().getDescription() + " добавлена в альбом");

        } catch (IOException e) {
            return ResponseEntity.badRequest().body("Ошибка сохранения файла");
        }
    }
}
