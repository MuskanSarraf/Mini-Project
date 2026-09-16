import api from "./api";

import type {
  AuthResponse,
  MeResponse,
} from "../types/api.types";

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export const login = async (
  data: LoginData
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>(
    "/auth/login",
    data
  );

  return response.data;
};

export const register = async (
  data: RegisterData
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>(
    "/auth/register",
    data
  );

  return response.data;
};

export const getCurrentUser = async (): Promise<MeResponse> => {
  const response = await api.get<MeResponse>(
    "/users/me"
  );

  return response.data;
};