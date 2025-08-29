import { TreeNode } from "@/components/types";

export function insertNode(tree:TreeNode[], newItem:TreeNode, parentId:string){
    const newTree : TreeNode[] = [];
    for(const child of tree){
        if (child.type === "folder"){
            if (child.id === parentId){
                newTree.push({...child, children: [...child.children|| [], newItem]});
            }
            else{
               const updatedChildren = insertNode(child.children, newItem, parentId);
               if (updatedChildren !== child.children){
                    newTree.push({...child, children: updatedChildren});
               }
               else{
                newTree.push(child);
               }
            }
        }
    }
    return newTree;
}