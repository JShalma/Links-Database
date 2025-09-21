import Link from "next/link";
import { TreeNode } from "./types";
import { useState } from "react";

export default function FolderNavigation({ tree } : {tree:TreeNode[]}){
    return (
        <article className="container p-5 w-full">
            <FolderTab folder={tree[0]} />
        </article>
    );
}

export function FolderView({ folder } : {folder : TreeNode}){
    return (
        <div className="mx-3">
            { folder.type === "folder" && (folder.children).map((child) => {
                if(child.type === "folder") return <FolderTab key={child.id} folder={child} />; })
            }
        </div>
    );
}

export function FolderTab({ folder } : {folder : TreeNode}){
    const [toggle, setToggle] = useState(false);
    const [folderItem, setFolder] = useState(folder);

    function displayFolder(child:TreeNode){
        setToggle(!toggle); 
        setFolder(child);
    }
    return <>
    <div key={folder.id}>
        <div className="flex p-1 gap-2 items-center">
            <div onClick={() => displayFolder(folder)}>
                { toggle 
                    ?   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                        </svg> 
                    :   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-right-fill" viewBox="0 0 16 16">
                            <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                        </svg>}
            </div>
            <Link href={`/folder/${folder.id}`}>
                {folder.name}
            </Link>
        </div>
        { toggle && <FolderView folder={folderItem} /> }
    </div>
    </>
}