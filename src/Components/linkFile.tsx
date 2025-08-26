
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
            <a href={url}>
                <h4>{name}</h4> <span>{type}</span>
                <img src={img} />
            </a>
        </div>
    );
}