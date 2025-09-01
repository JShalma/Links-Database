'use client'

import Folder from "@/components/folder";
// import Link from "next/link";
import { useFolderTree } from "@/utilities/FolderTreeContext";
import { FileNode, TreeNode } from "@/components/types";
import File from "@/components/file";

// { params } : { params : {id : string}}
export default function FolderPage(){
    const { currentFolder } = useFolderTree();

    function createItem(item : TreeNode){
        if (item.type === "folder"){
            return createFolder(item);
        } else if (item.type === "file"){
            return createFile(item);
        }
    }

    function createFolder(item : TreeNode){
        return <Folder content={item} key={item.id} />
    }

    function createFile(item : FileNode){
        return <File content={item} key={item.id} />
    }

    return (
    <div>
    {/* <br />    
         {currentFolder.id} 
        <br/>
        {currentFolder.name}
        <br/> */}

        {/* {currentFolder.type === "folder" && currentFolder.children.map((child) => <div key={child.id}><br/> <Link href={`/folder/${child.id}`}>{child.name}</Link></div>)} */}
        
        {currentFolder.type === "folder" && currentFolder.children.map((child) => createItem(child))}

        {/* <Folder /> */}
    </div>
    );
}