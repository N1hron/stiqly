import { FileInfo } from '@types';

async function getFileInfo(file: File): Promise<FileInfo> {
  const type = file.type.split('/')[0];

  if (type === 'image') {
    return getImageInfo(file);
  } else if (type === 'video') {
    return getVideoInfo(file);
  } else {
    throw new Error(
      `Could not get the file info: file "${file.name}" has an unsupported type`
    );
  }
}

function getImageInfo(imageFile: File): Promise<FileInfo> {
  const imageElement = document.createElement('img');
  imageElement.src = URL.createObjectURL(imageFile);

  return new Promise<FileInfo>((resolve, reject) => {
    imageElement.addEventListener('load', () => {
      resolve({
        name: imageFile.name,
        size: imageFile.size,
        width: imageElement.naturalWidth,
        height: imageElement.naturalHeight,
        duration: 0,
      });
    });

    imageElement.addEventListener('error', () => {
      reject(new Error(`Could not load image "${imageFile.name}"`));
    });
  }).then((dimensions) => {
    URL.revokeObjectURL(imageElement.src);
    return dimensions;
  });
}

function getVideoInfo(videoFile: File): Promise<FileInfo> {
  const videoElement = document.createElement('video');
  videoElement.src = URL.createObjectURL(videoFile);

  return new Promise<FileInfo>((resolve, reject) => {
    videoElement.addEventListener('loadedmetadata', () => {
      resolve({
        name: videoFile.name,
        size: videoFile.size,
        width: videoElement.videoWidth,
        height: videoElement.videoHeight,
        duration: videoElement.duration,
      });
    });

    videoElement.addEventListener('error', () => {
      reject(new Error(`Could not load video "${videoFile.name}"`));
    });
  }).then((dimensions) => {
    URL.revokeObjectURL(videoElement.src);
    return dimensions;
  });
}

export { getFileInfo };
