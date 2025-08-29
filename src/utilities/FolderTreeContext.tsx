'use client';

import { TreeNode } from "@/components/types";
import { NodeInput } from "@/types/data";
import { createContext, useState, useContext } from "react";
import { addFile, addFolder } from "./server-actions";
import { insertNode } from "./treeUtils";

type FolderTreeContextType = {
    tree: TreeNode[];
    currentFolder: string;
    addItem: (data: NodeInput) => void;
    deleteItem: () => void;
    renameItem: () => void;
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

        const updatedTree = insertNode(tree, node, data.parentId);
        setTree(updatedTree);
    };
    const deleteItem = () => { console.log("Delete")};
    const renameItem = () => { console.log("Rename")};
    const moveItem = () => { console.log("Modify")};

    const value : FolderTreeContextType = {
        tree,
        currentFolder,
        addItem,
        deleteItem, 
        renameItem,
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