import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

import NavBar from "@/components/navBar";
import SideBar from "@/components/sideBar";
import buildTree from "@/components/tree";
import { FolderTreeProvider } from "@/utilities/FolderTreeContext";
import { getAllFolders } from "@/utilities/server-actions";

export default async function FolderLayout({ children, params } : {children: React.ReactNode; params: {id : string};}){
    const session = await getServerSession(authOptions);
    if(!session){
        redirect("/login");
    }
    
    const flatData = await getAllFolders();
    const foldersData = buildTree(flatData);

    return (
        // container px-6 my-6 border
        <div className="flex flex-col h-screen">
            <FolderTreeProvider currentFolderId={params.id} initialTree={foldersData} >
                <NavBar />
                <div className="flex flex-grow min-h-0">
                    <SideBar />
                    {children}
                </div>
            </FolderTreeProvider>
        </div>
    );
}