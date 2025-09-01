'use client';

import { useFolderTree } from "@/utilities/FolderTreeContext";
import { TreeNode } from "./types";
import Link from "next/link";

export default function Folder({ content } : {content: TreeNode}){
    const { addItem, deleteItem, modifyItem } = useFolderTree();
    
    return (
        <Link href={`/folder/${content.id}`} className="m-1">
            <div className="orange p-1">
            {content.name}

            {/* <button onClick={() => addItem({name: "Github", type: "file", url:"https://github.com/", description: "Github - store projects", img: "https://github.githubassets.com/assets/github-logo-55c5b9a1fe52.png", parentId:"6bfc1161-d799-4b46-b15b-0d9107adeb95"})}>
                Click to Add
            </button>
            <br/>
            <button onClick={() => deleteItem("44c43658-1e46-4d75-9f29-0e1c854560ad", "file")}>
                Click to Delete
            </button>
            <br/>
            <button onClick={() => modifyItem({name: "Java Tutorials - Telusko", type: "file", url:"https://www.youtube.com/watch?v=BGTx91t8q50&list=PLsyeobzWxl7q6oUFts2erdot6jxF_lisP&index=3", description: "Java course in Telusko", img: "https://i.ytimg.com/vi/BGTx91t8q50/maxresdefault.jpg", parentId:"08e64ea3-b941-45c4-aa33-a964410b92b5", id:"c3282b16-7ec3-43aa-8b83-551bfde5d4f0"})}>
                Click to Modify 
            </button> */}
            </div>
        </Link>
        
    );
}