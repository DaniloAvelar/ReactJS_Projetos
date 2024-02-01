export function ItemCardapio(props) {
    return <div className='container-item-cardapio'> 
        <div className="descricaoItem">
            <h3>{props.nome}</h3>
            <p>{props.preco}</p>
            <h6>{props.descricao}</h6>
            <button>Adicionar ao pedido</button>
        </div>
        <img src={props.imagem} alt="" />
    </div>
}