import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand, ListObjectsV2Command, HeadObjectCommand, CopyObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// Configure AWS S3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

const bucketName = process.env.AWS_BUCKET_NAME;

// Upload a file to S3
export const uploadFile = async (fileBuffer, fileName, mimetype) => {
  const uploadParams = {
    Bucket: bucketName,
    Key: fileName,
    Body: fileBuffer,
    ContentType: mimetype
  };

  try {
    const command = new PutObjectCommand(uploadParams);
    const response = await s3Client.send(command);
    return {
      key: fileName,
      etag: response.ETag,
      versionId: response.VersionId
    };
  } catch (err) {
    throw new Error(`Failed to upload file: ${err.message}`);
  }
};

// Get a file stream from S3
export const getFileStream = async (fileKey) => {
  const getParams = {
    Bucket: bucketName,
    Key: fileKey
  };

  try {
    const command = new GetObjectCommand(getParams);
    const response = await s3Client.send(command);
    return response.Body;
  } catch (err) {
    if (err.name === 'NoSuchKey') {
      throw new Error('File not found');
    }
    throw new Error(`Failed to get file: ${err.message}`);
  }
};

// Get a pre-signed URL for a file
export const getFileUrl = async (fileKey, expiresIn = 3600) => {
  const getParams = {
    Bucket: bucketName,
    Key: fileKey
  };

  try {
    const command = new GetObjectCommand(getParams);
    return await getSignedUrl(s3Client, command, { expiresIn });
  } catch (err) {
    throw new Error(`Failed to generate URL: ${err.message}`);
  }
};

// Update a file (essentially overwrite)
export const updateFile = async (fileBuffer, fileKey, mimetype) => {
  return uploadFile(fileBuffer, fileKey, mimetype);
};

// Delete a file from S3
export const deleteFile = async (fileKey) => {
  const deleteParams = {
    Bucket: bucketName,
    Key: fileKey
  };

  try {
    const command = new DeleteObjectCommand(deleteParams);
    await s3Client.send(command);
    return { success: true, message: 'File deleted successfully' };
  } catch (err) {
    throw new Error(`Failed to delete file: ${err.message}`);
  }
};

// List all files in the bucket
export const listFiles = async (prefix = '') => {
  const listParams = {
    Bucket: bucketName,
    Prefix: prefix
  };

  try {
    const command = new ListObjectsV2Command(listParams);
    const response = await s3Client.send(command);
    
    return response.Contents?.map(item => ({
      key: item.Key,
      size: item.Size,
      lastModified: item.LastModified,
      etag: item.ETag
    })) || [];
  } catch (err) {
    throw new Error(`Failed to list files: ${err.message}`);
  }
};

// Get file metadata
export const getFileMetadata = async (fileKey) => {
  const headParams = {
    Bucket: bucketName,
    Key: fileKey
  };

  try {
    const command = new HeadObjectCommand(headParams);
    const response = await s3Client.send(command);
    return {
      contentType: response.ContentType,
      contentLength: response.ContentLength,
      lastModified: response.LastModified,
      metadata: response.Metadata,
      etag: response.ETag
    };
  } catch (err) {
    if (err.name === 'NotFound') {
      throw new Error('File not found');
    }
    throw new Error(`Failed to get file metadata: ${err.message}`);
  }
};