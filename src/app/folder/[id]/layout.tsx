import NavBar from "@/components/navBar";
import SideBar from "@/components/sideBar";
import buildTree from "@/components/tree";
import { FolderTreeProvider } from "@/utilities/FolderTreeContext";
import { getAllFolders } from "@/utilities/server-actions";

export default async function FolderLayout({ children, params } : {children: React.ReactNode; params: {id : string};}){
    const flatData = await getAllFolders();
    const foldersData = buildTree(flatData);

    return (
        // container px-6 my-6 border
        <div className="flex flex-col h-screen overflow-y-hidden">
            <FolderTreeProvider currentFolderId={params.id} initialTree={foldersData} >
                <NavBar />
                <div className="flex flex-grow">
                    <SideBar />
                    {children}
                </div>
            </FolderTreeProvider>
        </div>
    );
}