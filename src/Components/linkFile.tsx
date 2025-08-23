
type LinkProps = {
    url: string;
    id: string;
    name: string;
    type: string;
    img: string
}

export default function LinkFile({ url, id, name, type, img  } : LinkProps){
    return (
        <div key={id} className='link-tab rounded p-2'>
            <strong>{name}</strong> ({type})
            (
                <div>
                <a href={url}>
                <img src={img} />
                </a>
            </div>
            )
        </div>
    );
}