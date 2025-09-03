'use client'

import { FileNode } from "./types";

export default function File({ content } : {content: FileNode}){
    function truncateString(str : string, len: number){
        if (str.length > len){
            return str.slice(0, len) + "...";
        } else{
            return str;
        }
    }
    return (
    <div className="py-3" >
        <a href={content.fileData?.url} target="_blank">
            <div className="pt-2.5 px-1.5 pb-2 rounded-xl black-border gray flex flex-col h-full">
                <p className="pb-2.5 w-fit self-center">{truncateString(content.name, 25)}</p>
                <div className="black-border rounded-sm">
                    <img src={content.fileData?.img} className="object-cover h-32 w-full rounded-sm" />
                </div>
                <p className="description w-fit self-center">{content.fileData?.description}</p>
            </div>
        </a>
    </div>
   
    );
}