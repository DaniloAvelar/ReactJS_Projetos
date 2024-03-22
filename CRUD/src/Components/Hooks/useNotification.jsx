import { useState, useEffect } from "react";

export const useNotification = () => {
    /*
        Fetch data e traz tudo
        
        trouxe tudo, agora checa cada linha, e verifica se tem a propriedade [Avisar]

        se tem a propriedade avisar, então checa se ela é = true, 

        se for igual a true, então adiciona no contador ela e o ID.

    */

    const urlProduto = "http://localhost:3000/produtos"

    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const res = await fetch(urlProduto);//Lendo a URL do DB Json
            const data = await res.json(); //Convertendo no formato Json para leitura
            setProdutos(data); //Alterando o estado da variavel de produtos alimentando ela com os novos produtos
        }
        fetchData();
    }, []);

    let notify = [];
    let countAvisos = 0;

    if (produtos) {
        notify = produtos.map((item) => ({
            id: item.id,
            avisar: item.avisar
        },
            (item.avisar === true && countAvisos ++)
        ))
    }

    return { produtos, countAvisos }
}