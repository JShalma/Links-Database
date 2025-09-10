import { TreeNode } from "@/components/types";
import { BreadcrumbObj } from "@/types/data";

type callbackReturn = TreeNode | null;

export function updateTree(tree: TreeNode[], callback:(child:TreeNode, context:TreeNode) => callbackReturn, target: string, context: TreeNode){
    const newTree: TreeNode[] = [];
    for (const child of tree){
            if (child.id === target){
                const result: callbackReturn = callback(child, context);
                if (result != null){
                    newTree.push(result);
                } 
            } else {
                if (child.type === "folder"){
                    const updatedChildren: TreeNode[] = updateTree(child.children || [], callback, target, context);
                    if (updatedChildren !== child.children){
                        newTree.push({...child, children: updatedChildren});
                    } else{
                        newTree.push({...child});
                    }
                } else {
                    newTree.push({...child});
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

export function getFolder(tree:TreeNode[], folderId:string){
    let folderNode = {};
    const path:BreadcrumbObj[] = [];
    for (const node of tree){
        if (node.type === "file"){
            continue;
        } else if (node.type === "folder") {
            if (node.id === folderId){
                folderNode = node;
            } else{
                const {folderNode:result, path:breadcrumbs} = getFolder(node.children, folderId);
                if (Object.keys(result).length !== 0){
                    folderNode = result;
                    path.push({name: node.name, id: node.id}, ...breadcrumbs);
                }
            }
        }
    }
    return {folderNode, path};
}

export function moveNode(tree:TreeNode[], currenNode:TreeNode, updatedParentId:string){
    const deleteTree = updateTree(tree, deleteNode, currenNode.id, currenNode);
    const updatedNode = {...currenNode, parentId:updatedParentId}
    const insertTree = updateTree(deleteTree, insertNode, updatedParentId, updatedNode);
    return insertTree;
}