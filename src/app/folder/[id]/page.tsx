// import { useFolderTree } from "@/utilities/FolderTreeContext";
// import { useContext } from "react";

import Folder from "@/components/folder";
// import { useFolderTree } from "@/utilities/FolderTreeContext";
import { getFolderContent } from "@/utilities/server-actions";
import Link from "next/link";
// import Folder from "../../../../wip/folder";

export default async function FolderPage({ params } : { params : {id : string}}){
    const current = await getFolderContent(params.id);

    // useFolderTree();

    // addFile("Jones Public Library", "https://www.joneslibrary.org/udemy", "Library resources + account", "https://bpldcassets.blob.core.windows.net/derivatives/images/commonwealth:8049g858d/image_access_800.jpg", "6bfc1161-d799-4b46-b15b-0d9107adeb95")

    return (
    <>
    <br />
        
        {current.map((child) => <div key={child.id}><br/> <Link href={`/folder/${child.id}`}>{child.name}</Link></div>)}

        <Folder />
    </>
    );
}