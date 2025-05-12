export type FileDimensions = {
  width: number;
  height: number;
};

export type FileInfo = {
  name: string;
  size: number;
  duration: number;
} & FileDimensions;

export type FileInput = {
  id: string;
  info: FileInfo;
  url: string;
  isSelected: boolean;
};
