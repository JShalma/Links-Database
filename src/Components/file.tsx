'use client'

import { FileNode } from "./types";

export default function File({ content } : {content: FileNode}){
    return (
    <a href={content.fileData?.url} className="m-1" target="_blank">
        <div>
        {content.name}
        </div>
    </a>
    );
}