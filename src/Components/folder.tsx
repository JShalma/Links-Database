'use client';

import { useFolderTree } from "@/utilities/FolderTreeContext";

export default function Folder(){
    const { currentFolder, addItem } = useFolderTree();
    
    return (
        <>
        <br/> 
        Hello: {currentFolder}
        <br/>
        <button onClick={() => addItem({name: "Instagram", type: "file", url:"https://www.instagram.com/umassintervarsity/", description: "Instagram = social media", img: "https://53.fs1.hubspotusercontent-na1.net/hubfs/53/How%20To%20Post%20on%20IG.jpg", parentId:"6bfc1161-d799-4b46-b15b-0d9107adeb95"})}>
            Click to Add
        </button>
        </>
    );
}