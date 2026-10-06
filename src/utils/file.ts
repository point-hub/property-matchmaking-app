export interface IFileType {
  extension: string;
  mime_type: string;
}

const fileTypes: IFileType[] = [
  {
    extension: 'jpg',
    mime_type: 'image/jpeg',
  },
  {
    extension: 'jpeg',
    mime_type: 'image/jpeg',
  },
  {
    extension: 'png',
    mime_type: 'image/png',
  },
  {
    extension: 'webp',
    mime_type: 'image/webp',
  },
  {
    extension: 'pdf',
    mime_type: 'application/pdf',
  },
  {
    extension: 'doc',
    mime_type: 'application/msword',
  },
  {
    extension: 'docx',
    mime_type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  },
];

export const getFileExtension = (filename: string): string => {
  const basename = filename.split(/[\\/]/).pop() ?? '';
  const lastDot = basename.lastIndexOf('.');

  if (lastDot <= 0) {
    return '';
  }

  return basename.slice(lastDot + 1).toLowerCase();
};

export const getFileType = (
  extension: string,
): IFileType | undefined => {
  return fileTypes.find(
    (fileType) => fileType.extension === extension.toLowerCase(),
  );
};

export const isValidFile = (
  file: File,
  allowedExtensions: string[],
): boolean => {
  const extension = getFileExtension(file.name);

  if (!extension) {
    return false;
  }

  if (!allowedExtensions.includes(extension)) {
    return false;
  }

  const fileType = getFileType(extension);

  if (!fileType) {
    return false;
  }

  return file.type === fileType.mime_type;
};