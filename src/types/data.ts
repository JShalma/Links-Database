import { Item, FileData } from "@prisma/client";

export type ItemWithFileData = Item & {
  fileData: FileData | null;
};