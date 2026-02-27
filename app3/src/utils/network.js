import axios from "axios";

// nginx(6114)가 /app1 을 FastAPI(6104/app1)로 프록시해주는 구조에서 정답
// - React는 어디서 뜨든 같은 origin으로 /app1/* 호출
// - 쿠키(withCredentials)가 안정적으로 붙음
export const BASE_URL = import.meta.env.VITE_API_URL || "/app1";

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const formApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});