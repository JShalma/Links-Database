import { TreeNode } from "@/components/types";

// export function insertNode(tree:TreeNode[], newItem:TreeNode, parentId:string){
//     const newTree : TreeNode[] = [];
//     for(const child of tree){
//         if (child.type === "folder"){
//             if (child.id === parentId){
//                 newTree.push({...child, children: [...child.children|| [], newItem]});
//             }
//             else{
//                const updatedChildren = insertNode(child.children, newItem, parentId);
//                if (updatedChildren !== child.children){
//                     newTree.push({...child, children: updatedChildren});
//                }
//                else{
//                 newTree.push(child);
//                }
//             }
//         }
//     }
//     return newTree;
// }
type callbackReturn = TreeNode | null;

export function updateTree(tree: TreeNode[], callback:(child:TreeNode, context:TreeNode) => callbackReturn, target: string, context: TreeNode){
    const newTree: TreeNode[] = [];
    for (const child of tree){
        if (child.type === "folder"){
            if (child.id === target){
                const result: callbackReturn = callback(child, context);
                if (result != null){
                    newTree.push(result);
                }
            } else {
                const updatedChildren: TreeNode[] = updateTree(child.children || [], callback, target, context);
                if (updatedChildren !== child.children){
                    newTree.push({...child, children: updatedChildren});
                } else{
                    newTree.push({...child});
                }
            }
        } 
    }
    return newTree;
}

export function insertNode(node:TreeNode, context:TreeNode){
    let children = [context];
    if (node.type === "folder"){
        children = [...(node.children || []) , context];
    }
    return {...node, children};
}

export function deleteNode(){
    return null;
}

export function modifyNode(node:TreeNode, context:TreeNode){
    return {...context};
}
// export function modifyNode(node:TreeNode, context:TreeNode){
//     let children = [context];
//     if (node.type === "folder"){
//         children = [...(node.children || []) , context];
//     }
//     return {...node, children};
// }
// Recursive structure
// function (newTree, callback, target): -> children (arrays)
    // newTree = [];
    // loop through array
        // check if child === target
            // yes -> do function callback (delete, add, modify) 
            // if null 
                // --> don't push
            // else
                // --> push to newTree 
        // else
            // no -> newChild = recursive(child.children, target)
            // if (newChild != child)
                // push newChild
            // else
                // push child
    // return newTree
