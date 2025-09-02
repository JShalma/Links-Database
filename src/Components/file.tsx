'use client'

import { FileNode } from "./types";

export default function File({ content } : {content: FileNode}){
    return (
    <div className="py-3">
        <a href={content.fileData?.url} target="_blank">
            <div className="pt-3 px-2 pb-2 rounded-xl black-border gray flex flex-col">
                <p className="pb-3 w-fit self-center">{content.name}</p>
                <div className="black-border rounded-sm">
                    <img src={content.fileData?.img} className="object-cover h-32 w-full rounded-sm" />
                </div>
                <p className="description w-fit self-center">{content.fileData?.description}</p>
            </div>
        </a>
    </div>
   
    );
}