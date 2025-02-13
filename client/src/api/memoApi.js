import instance from "./axios";

export const memoApi = {
  // 메모 목록 조회
  getMemos: async () => {
    const response = await instance.get("/memos");
    return response.data;
  },

  // 메모 상세 조회
  getMemo: async (id) => {
    const response = await instance.get(`/memos/${id}`);
    return response.data;
  },

  // 메모 생성
  createMemo: async (memoData) => {
    const response = await instance.post("/memos", memoData);
    return response.data;
  },

  // 메모 삭제
  deleteMemo: async (id) => {
    const response = await instance.delete(`/memos/${id}`);
    return response.data;
  },

  // 메모 수정
  updateMemo: async (id, data) => {
    const response = await instance.put(`/memos/${id}`, data);
    return response.data;
  },
};
