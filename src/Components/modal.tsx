export default function Modal({ setIsModalOpen, children } : {setIsModalOpen: (open:boolean) => void, children: React.ReactNode}){
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
            <div className="bg-(--bg-200) rounded-lg shadow-lg p-6 max-w-md w-full relative">
                <div>
                    <div className="flex gap-2 justify-between">
                        <h1 className="text-2xl">Rename</h1>
                        <button onClick={() => setIsModalOpen(false)} className="self-end rounded-3xl hover:bg-(--bg-400) cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                            </svg>
                        </button>
                        {/* <hr/> */}
                    </div>
                    <div className="py-5">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}