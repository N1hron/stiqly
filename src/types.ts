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

export type StatusType = 'loading' | 'success' | 'error';
export type Status = {
  type: StatusType;
  message: string;
};

export type AppStatusType = StatusType | 'running';
export type ErrorKind = 'loading' | 'runtime';
export type LoadingKind = 'initial' | 'retry' | 'reload';
export type ReloadingKind = Exclude<LoadingKind, 'initial'>;

export type AppStatus = {
  type: AppStatusType;
  message: string;
  errorKind?: ErrorKind;
  loadingKind?: LoadingKind;
  didInit: boolean;
};

export type TimeoutId = ReturnType<typeof setTimeout>;
