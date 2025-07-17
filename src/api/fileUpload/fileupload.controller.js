import * as s3Service from '../../service/third-party/s3service.js';

export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file provided' });
    }
    console.log("dddd",req.file)

    const { buffer, originalname, mimetype } = req.file;  
    const result = await s3Service.uploadFile(buffer, originalname, mimetype);
    
    res.status(201).json({
      message: 'File uploaded successfully',
      data: result
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getFile = async (req, res) => {
  try {
    const { fileKey } = req.query;
    console.log("req.query",req.query)

    console.log("fileKey",fileKey)

    if (!fileKey) {
      return res.status(400).json({ error: 'Missing fileKey query parameter' });
    }
    const fileStream = await s3Service.getFileStream(fileKey);
    
    fileStream.on('error', (error) => {
      if (error.message === 'File not found') {
        return res.status(404).json({ error: 'File not found' });
      }
      res.status(500).json({ error: error.message });
    });
    
    // Set appropriate headers
    const metadata = await s3Service.getFileMetadata(fileKey);
    res.setHeader('Content-Type', metadata.contentType);
    res.setHeader('Content-Length', metadata.contentLength);
    res.setHeader('Last-Modified', metadata.lastModified);
    
    fileStream.pipe(res);
  } catch (error) {
    if (error.message === 'File not found') {
      return res.status(404).json({ error: 'File not found' });
    }
    res.status(500).json({ error: error.message });
  }
};

export const getFileUrl = async (req, res) => {
  try {
    const { fileKey } = req.params;
    const expiresIn = req.query.expiresIn || 3600; // Default 1 hour
    const url = await s3Service.getFileUrl(fileKey, parseInt(expiresIn));
    
    res.status(200).json({
      url,
      expiresIn: `${expiresIn} seconds`
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateFile = async (req, res) => {
  try {
    const { fileKey } = req.params;
    const { buffer, mimetype } = req.file;
    
    const result = await s3Service.updateFile(buffer, fileKey, mimetype);
    
    res.status(200).json({
      message: 'File updated successfully',
      data: result
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteFile = async (req, res) => {
  try {
    const { fileKey } = req.query;
    console.log("fileKey",fileKey)
    await s3Service.deleteFile(fileKey); 
    
    res.status(200).json({
      message: 'File deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const listFiles = async (req, res) => {
  try {
    const prefix = req.query.prefix || '';
    const files = await s3Service.listFiles(prefix);
    
    res.status(200).json(files);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getFileMetadata = async (req, res) => {
  try {
    const { fileKey } = req.params;
    const metadata = await s3Service.getFileMetadata(fileKey);
    
    res.status(200).json(metadata);
  } catch (error) {
    if (error.message === 'File not found') {
      return res.status(404).json({ error: 'File not found' });
    }
    res.status(500).json({ error: error.message });
  }
};