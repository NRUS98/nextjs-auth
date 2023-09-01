export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ACCESS_TOKEN_COOKIE_KEY: string
      REFRESH_TOKEN_COOKIE_KEY: string
      ACCESS_TOKEN_SECRET: string
      REFRESH_TOKEN_SECRET: string
      MONGODB_URI: string
      POSTS_API_URL: string
      PHOTOS_API_URL: string
    }
  }
}
