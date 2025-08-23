import { Item, FileData, ItemType } from "@prisma/client";
import { TreeNode } from "./types";

type ItemWithFileData = Item & {
  fileData: FileData | null;
};

export default function buildTree(items: ItemWithFileData[]) : TreeNode[]{
    // console.log(items);
    const itemMap = new Map<string, TreeNode>();
    const roots: TreeNode[] = [];

    for (const item of items){
        // const baseNode = {...item};
        const node : TreeNode = item.type === "folder" ? {...item, type: "folder", children: []} : {...item, type: "file"};
        // console.log(node);
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
    // Attach children files to Parent folder
    // loop through itemMap
        // get id of item
            // get parentID
                // if parentID == null
                    // add to root
                //else
                    // push item into parent child
        
}