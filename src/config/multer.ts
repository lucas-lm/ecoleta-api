import path from 'path'
import crypto from 'crypto'
import multer, { Options } from 'multer'
import multerS3 from 'multer-s3'
import aws from 'aws-sdk'

const { AWS_S3_BUCKET, NODE_ENV } = process.env

interface File extends Express.Multer.File {
  key?: string
}

const getFileName = (
  req: Express.Request,
  file: File,
  cb: (error: Error | null, filename: string) => void
) => {
  crypto.randomBytes(16, (error, hash) => {
    if (error) cb(error, '')
    file.key = `${Date.now()}-${hash.toString('hex')}-${file.originalname}`
    cb(null, file.key)
  })
}

const storageForEnv = {
  development: multerS3({
    s3: new aws.S3(),
    bucket: AWS_S3_BUCKET,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: getFileName,
  }),
  production: multerS3({
    s3: new aws.S3(),
    bucket: AWS_S3_BUCKET,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: getFileName,
  }),
  test: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads'))
    },
    filename: getFileName,
  }),
}

const multerConfig: Options = {
  dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
  storage: storageForEnv[NODE_ENV],
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/gif']
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('invalid file type'))
    }
  },
}

export default multerConfig
