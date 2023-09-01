import { JWTPayload } from "jose";

export type TLoginData = {
  email: string,
  password: string
}

export type TRegistrationData = {
  name: string,
  email: string,
  password: string
}

export type TTokenData = {
  id: string,
  email: string
}

export type TTokensPair = {
  accessToken: string,
  refreshToken: string
}

export type TTokenPayload = JWTPayload & TTokenData;
