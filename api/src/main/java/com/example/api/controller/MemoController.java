package com.example.api.controller;

import com.example.api.dto.MemoRequestDto;
import com.example.api.dto.MemoResponseDto;
import com.example.api.service.MemoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.net.URI;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/memos")
@RequiredArgsConstructor
public class MemoController {
    private final MemoService memoService;

    @PostMapping
    public ResponseEntity<MemoResponseDto> createMemo(@RequestBody MemoRequestDto requestDto) {
        MemoResponseDto memo = memoService.createMemo(requestDto);
        return ResponseEntity
                .created(URI.create("/api/memos/" + memo.getId()))
                .body(memo);
    }

    @GetMapping
    public ResponseEntity<List<MemoResponseDto>> getAllMemos() {
        return ResponseEntity.ok(memoService.getAllMemos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<MemoResponseDto> getMemo(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(memoService.getMemo(id));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMemo(@PathVariable Long id) {
        try {
            memoService.deleteMemo(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<MemoResponseDto> updateMemo(
            @PathVariable Long id,
            @RequestBody MemoRequestDto requestDto) {
        try {
            // 메모 업데이트
            MemoResponseDto updatedMemo = memoService.updateMemo(id, requestDto);

            // 수정된 메모 반환 (200 OK)
            return ResponseEntity.ok(updatedMemo);
        } catch (IllegalArgumentException e) {
            // 메모가 존재하지 않을 경우 (404 Not Found)
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            // 예기치 못한 오류 발생 시 (500 Internal Server Error)
            return ResponseEntity.status(500).build();
        }
    }

} 