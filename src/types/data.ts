import { Item, FileData } from "@prisma/client";

export type ItemWithFileData = Item & {
  fileData: FileData | null;
};

export type FileNodeInput = {
  type: "file";
  name: string;
  parentId: string;
  url: string;
  img: string;
  description: string;
}

export type FolderNodeInput = {
  type: "folder";
  name: string;
  parentId: string;
}

export type NodeInput = FileNodeInput | FolderNodeInput;