export function Navegacao (props) {1
    return <div className="navegacao">
        <input type="radio" name="opcao-pagina" id="pagina-1" defaultChecked onClick={() => props.setPaginaSelecionada(0)} />
        <label htmlFor="pagina-1">Pratos Principais</label>
        <input type="radio" name="opcao-pagina" id="pagina-2" onClick={() => props.setPaginaSelecionada(1)} />
        <label htmlFor="pagina-2">Sobremesas</label>
        <input type="radio" name="opcao-pagina" id="pagina-3" onClick={() => props.setPaginaSelecionada(2)} />
        <label htmlFor="pagina-3">Bebidas</label>
    </div>
}