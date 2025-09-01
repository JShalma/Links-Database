'use client';

import { TreeNode } from "@/components/types";
import { NodeInput } from "@/types/data";
import { createContext, useState, useContext } from "react";
import { addFile, addFolder, deleteFile, deleteFolder, modifyFile, modifyFolder } from "./server-actions";
import { deleteNode, insertNode, modifyNode, updateTree } from "./treeUtils";

type FolderTreeContextType = {
    tree: TreeNode[];
    currentFolder: string;
    addItem: (data: NodeInput) => void;
    deleteItem: (id: string, type: string) => void;
    modifyItem: (data: NodeInput) => void;
    moveItem: () => void;
}

const FolderTreeContext = createContext<FolderTreeContextType | undefined>(undefined);

// function FolderTreeProvider({ children, initialTree, currentFolderId} : {children: React.ReactNode; initialTree : TreeNode[]; currentFolderId: string}){
export function FolderTreeProvider({ children, initialTree, currentFolderId } : {children: React.ReactNode; initialTree : TreeNode[]; currentFolderId: string}){
    // useState();
    const [tree, setTree] = useState<TreeNode[]>(initialTree);
    const [currentFolder, setCurrentFolder] = useState<string>(currentFolderId);
    // console.log(tree);
    async function addItem(data : NodeInput) { 
        let result;
        let node : TreeNode;
    
        if (data.type === "file"){
            result = await addFile(data.name, data.url, data.description, data.img, data.parentId);
            node = {...result, type: "file"};
        }
        else {
            result = await addFolder(data.name, data.parentId);
            node = {...result, children: [], type:"folder"}
        }

        const updatedTree = updateTree(tree, insertNode, data.parentId, node);
        setTree(updatedTree);
        console.log(updatedTree);
    };
    async function deleteItem(id: string, type: string) { 
        let result;
        let node : TreeNode;
    
        if (type === "file"){
            result = await deleteFile(id ?? "");
            node = {...result, type: "file"};
        }
        else {
            result = await deleteFolder(id ?? "");
            node = {...result, children: [], type:"folder"}
        }
        const updatedTree = updateTree(tree, deleteNode, id, node);
        setTree(updatedTree);
        console.log(updatedTree);
     };
     async function modifyItem(data: NodeInput) { 
        let result;
        let node : TreeNode;
    
        if (data.type === "file"){
            result = await modifyFile(data.id ?? "", data.name, data.url, data.description, data.img, data.parentId);
            node = {...result, type: "file"};
        }
        else {
            result = await modifyFolder(data.id ?? "", data.parentId);
            node = {...result, children: [], type:"folder"}
        }

        const updatedTree = updateTree(tree, modifyNode, data.id ?? "", node);
        setTree(updatedTree);
        console.log(updatedTree);
     }
    //     let result;
    //     let node : TreeNode;
    
    //     if (data.type === "file"){
    //         result = await modifyFile(data.id, data);
    //         node = {...result, type: "file"};
    //     }
    //     else {
    //         result = await deleteFolder(data.id, data);
    //         node = {...result, children: [], type:"folder"}
    //     }
    //     const updatedTree = updateTree(tree, modifyNode, id, node);
    //     setTree(updatedTree);
    //     console.log(updatedTree);
    //  };
    // const renameItem = () => { console.log("Rename")};
    const moveItem = () => { console.log("Modify")};

    const value : FolderTreeContextType = {
        tree,
        currentFolder,
        addItem,
        deleteItem, 
        modifyItem,
        moveItem,
    };

    return (
        <FolderTreeContext.Provider value={value}>
            {children}
        </FolderTreeContext.Provider>
    );
}

export function useFolderTree(){
    const context = useContext(FolderTreeContext);
    if (!context){
        throw new Error("FolderTree must be used within FolderTreeProvider");
    }
    return context;
}