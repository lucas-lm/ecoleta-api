declare global {
  declare namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test'
      PORT: number
      BASE_URL: string
      AWS_S3_ACCESS_KEY: string
      AWS_S3_SECRET_ACCESS_KEY: string
      AWS_S3_BUCKET: string
    }
  }
}

export {}
