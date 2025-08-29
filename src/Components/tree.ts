import { Item, FileData } from "@prisma/client";
import { TreeNode } from "./types";

type ItemWithFileData = Item & {
  fileData: FileData | null;
};

export default function buildTree(items: ItemWithFileData[]) : TreeNode[]{
    const itemMap = new Map<string, TreeNode>();
    const roots: TreeNode[] = [];

    for (const item of items){
        const node : TreeNode = item.type === "folder" ? {...item, type: "folder", children: []} : {...item, type: "file"};
        itemMap.set(item.id, node);
    }

   for(const item of items){
        const node = itemMap.get(item.id);
        if (item.parentId){
            const parent = itemMap.get(item.parentId);
            if (parent?.type === "folder"){
                parent.children.push(node!);
            }
        }
        else{
            roots.push(node!);
        }
   }
   return roots;
}