export type FileData = {
    itemId: string;
    url: string;
    img: string;
    description: string;
  } | null;

// export type Item = {
//     id: string;
//     name: string;
//     type: "file" | "folder";
//     parentId: string;
// }

export type FileNode = {
    id: string;
    name: string;
    type: "file";
    parentId: string | null;
    fileData: null | FileData;
}

export type FolderNode = {
    id: string;
    name: string;
    type: "folder";
    parentId: string | null;
    children: TreeNode[];
}

export type TreeNode = FileNode | FolderNode;