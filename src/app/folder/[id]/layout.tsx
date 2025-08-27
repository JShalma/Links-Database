import buildTree from "@/components/dataStructure";
import { FolderTreeProvider } from "@/utilities/FolderTreeContext";
import { getAllFolders } from "@/utilities/server-actions";

export default async function FolderLayout({ children, params } : {children: React.ReactNode; params: {id : string};}){
    const flatData = await getAllFolders();
    const foldersData = buildTree(flatData);
    // console.log(foldersData);


    return (
        <div>
        <FolderTreeProvider currentFolderId={params.id} initialTree={foldersData} >
            {/* {params.id} */}
            {children}
        </FolderTreeProvider>
        </div>
    );
}