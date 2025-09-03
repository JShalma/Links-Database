'use client'

import { BreadcrumbObj } from "@/types/data";
import Link from "next/link";

export default function Breadcrumb({ paths } : {paths: BreadcrumbObj[]}){
    // console.log("Something went wrong, but im not sure what exactly it is")
    // console.log(paths);
    return (
        <div className="flex">
            { paths.map((item) => 
                <div key={`${item.id}-breadcrumb`} className="flex">
                    <Link href={`/folder/${item.id}`} className="breadcrumb rounded-2xl">
                        <h1 className="text-2xl px-3">{item.name}</h1>
                    </Link> <span className="text-2xl">&nbsp;/&nbsp;</span></div>
            )}
        </div>
    );
}