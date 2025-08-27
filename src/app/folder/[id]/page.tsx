// import { useFolderTree } from "@/utilities/FolderTreeContext";
// import { useContext } from "react";

import Folder from "@/components/folder";
import { getFolder } from "@/utilities/server-actions";
import Link from "next/link";
// import Folder from "../../../../wip/folder";

export default async function FolderPage({ params } : { params : {id : string}}){
    const current = await getFolder(params.id);
    // console.log("This is current:");

    console.log(current);
    
    return (
    <>
    <br />
        <Link href={`/folder/${current[0].id}`}>{current[0].name}</Link>

        {/* {params.id} */}
        <Folder />
         {/* {currentFolder} */}
    </>
    );
}