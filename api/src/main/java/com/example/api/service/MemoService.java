package com.example.api.service;

import com.example.api.domain.Memo;
import com.example.api.dto.MemoRequestDto;
import com.example.api.dto.MemoResponseDto;
import com.example.api.repository.MemoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MemoService {
    private final MemoRepository memoRepository;

    @Transactional
    public MemoResponseDto createMemo(MemoRequestDto requestDto) {
        Memo memo = Memo.builder()
                .title(requestDto.getTitle())
                .content(requestDto.getContent())
                .build();
        return MemoResponseDto.of(memoRepository.save(memo));
    }

    @Transactional(readOnly = true)
    public List<MemoResponseDto> getAllMemos() {
        return memoRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(MemoResponseDto::of)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public MemoResponseDto getMemo(Long id) {
        return MemoResponseDto.of(memoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("메모를 찾을 수 없습니다.")));
    }

    @Transactional
    public void deleteMemo(Long id) {
        Memo memo = memoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("메모를 찾을 수 없습니다."));
        memoRepository.delete(memo);
    }

    @Transactional
    public MemoResponseDto updateMemo(Long id, MemoRequestDto requestDto) {
        // ID로 기존 메모를 찾기
        Memo memo = memoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("메모를 찾을 수 없습니다."));

        // 기존 메모의 필드를 수정
        memo.updateMemo(memo.getTitle(), memo.getContent());

        // 수정된 메모 저장
        Memo updatedMemo = memoRepository.save(memo);

        // 수정된 메모를 DTO로 변환하여 반환
        return MemoResponseDto.of(updatedMemo);
    }

} 