'use client';

import { TreeNode } from "@/components/types";
import { BreadcrumbObj, NodeInput } from "@/types/data";
import { createContext, useState, useContext, useEffect } from "react";
import { addFile, addFolder, deleteFile, deleteFolder, modifyFile, modifyFolder } from "./server-actions";
import { deleteNode, getFolder, insertNode, modifyNode, updateTree } from "./treeUtils";

type FolderTreeContextType = {
    tree: TreeNode[];
    currentFolder: TreeNode;
    breadcrumbs: BreadcrumbObj[];
    addItem: (data: NodeInput) => void;
    deleteItem: (id: string, type: string) => void;
    modifyItem: (data: NodeInput) => void;
    moveItem: () => void;
}

const FolderTreeContext = createContext<FolderTreeContextType | undefined>(undefined);

export function FolderTreeProvider({ children, initialTree, currentFolderId } : {children: React.ReactNode; initialTree : TreeNode[]; currentFolderId: string}){
    const [tree, setTree] = useState<TreeNode[]>(initialTree);
    const [currentFolder, setCurrentFolder] = useState<TreeNode>(tree[0]);
    const [path, setPath] = useState<BreadcrumbObj[]>([{name: "", id: ""}]);

    useEffect(() => {
        const {folderNode, path:breadcrumb} = getFolder(tree, currentFolderId);
        // console.log(folder);
        // console.log(currentFolderId);
        if (Object.keys(folderNode).length !== 0){
            setCurrentFolder(folderNode);
            setPath(breadcrumb);
        }
    }, [tree, currentFolderId]);
    
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
     };

     async function modifyItem(data: NodeInput) { 
        let result;
        let node : TreeNode;
    
        if (data.type === "file"){
            result = await modifyFile(data.id ?? "", data.name, data.url, data.description, data.img, data.parentId);
            node = {...result, type: "file"};
        }
        else {
            // console.log(data.id);
            result = await modifyFolder(data.id ?? "", data.name);
            node = {...result, children: [], type:"folder"}
        }

        const updatedTree = updateTree(tree, modifyNode, data.id ?? "", node);
        setTree(updatedTree);
     }
    
    const moveItem = () => { console.log("Modify")};



    const value : FolderTreeContextType = {
        tree,
        currentFolder,
        breadcrumbs: path,
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