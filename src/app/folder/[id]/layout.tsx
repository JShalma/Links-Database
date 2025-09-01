import buildTree from "@/components/tree";
import { FolderTreeProvider } from "@/utilities/FolderTreeContext";
import { getAllFolders } from "@/utilities/server-actions";

export default async function FolderLayout({ children, params } : {children: React.ReactNode; params: {id : string};}){
    const flatData = await getAllFolders();
    const foldersData = buildTree(flatData);

    return (
        <div className="container px-6">
            <FolderTreeProvider currentFolderId={params.id} initialTree={foldersData} >
                {children}
            </FolderTreeProvider>
        </div>
    );
}