import  stockItems  from '@/data/item.json';



export function Store() {
    return (
        <>
            <h1> Store test </h1>
            
                <h2>{stockItems.map(item => (
                    <div>{JSON.stringify(item)}</div>
                ))}</h2>
            
        </>
    )
}