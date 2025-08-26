"use client"

import Link from "next/link";
import { useState } from "react"

export default function Breadcrumb(){
    const [currentPaths, setPaths] = useState([{id: "cc0f9c16-0a33-4667-b847-f633ab15f3c4", name: "root" }]);

    return (
        <ul>
         {currentPaths.map((path) => <li key={`nav-${path.id}`}><Link href={`/folder/${path.id}`}>{path.name}</Link></li>)}
        </ul>
    );
}