'use client';

import { TreeNode } from "@/components/types";
import { createContext, useState, useContext } from "react";

type FolderTreeContextType = {
    tree: TreeNode[];
    currentFolder: string;
    addFolder: () => void;
    deleteItem: () => void;
    renameItem: () => void;
    moveItem: () => void;
}

const FolderTreeContext = createContext<FolderTreeContextType | undefined>(undefined);

// function FolderTreeProvider({ children, initialTree, currentFolderId} : {children: React.ReactNode; initialTree : TreeNode[]; currentFolderId: string}){
export function FolderTreeProvider({ children, initialTree, currentFolderId } : {children: React.ReactNode; initialTree : TreeNode[]; currentFolderId: string}){
    // useState();
    const [tree, setTree] = useState<TreeNode[]>([]);
    const [currentFolder, setCurrentFolder] = useState<string>(currentFolderId);
    
    const addFolder = () => { console.log("Add")};
    const deleteItem = () => { console.log("Delete")};
    const renameItem = () => { console.log("Rename")};
    const moveItem = () => { console.log("Modify")};

    const value : FolderTreeContextType = {
        tree,
        currentFolder,
        addFolder,
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