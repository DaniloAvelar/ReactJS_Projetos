import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


export const useFetch = (url) => {

    //-Configurando o método que será utilizado (configurando o POST com o cabeçalho, body e etc...)
    const [config, setConfig] = useState(null);
    const [method, setMethod] = useState(null);
    const [data, setData] = useState(null);
    const [callFetch, setCallFetch] = useState(false);
    const [numRow, setNumRow] = useState(null);

    //Metodo Get All Geral
    useEffect(() => {
        async function fetchData() {
            const res = await fetch(url); //Lendo a URL do DB Json
            const item = await res.json(); //Convertendo no formato Json para leitura
            setData(item); //Alterando o estado da variavel de produtos alimentando ela com os novos produtos
            setNumRow(item.length) //Passando o tamanho do Array para o componente
        }
        fetchData();
    }, []);


    // Setando as Configurações para o POST
    //Metodo POST Configurações
    const configPost = (data, method) => {
        if (method === "POST") {
            setConfig({
                method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            });
            setMethod(method);
        }
    };


    //Metodo PUT Edit Configurações
    const configPut = async (data, method) => {
        if (method === "PUT") {
            console.log(method)
            setConfig({
                method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            });

            setMethod(method);
        }
    };

    //Metodo PUT Edit Configurações
    const configDelete = async (method) => {
        if (method === "DELETE") {
            console.log(method)
            setConfig({
                method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            setMethod(method);
        }
    };

    
    // Metodo POST
    useEffect(() => {
        const httpRequest = async () => {
            if (method === "POST") {
                let fetchOptions = [url, config]
                const res = await fetch(...fetchOptions)
                const json = await res.json()
                setCallFetch(json)
                location.reload();
            }
            // PUT -> UPDATE
            if (method === "PUT") {
                let fetchOptions = [url, config]
                const res = await fetch(...fetchOptions)
                const json = await res.json()
                setCallFetch(json)
                location.reload();

            }
            //DELETE
            if (method === "DELETE") {
                let fetchOptions = [url, config]
                await fetch(...fetchOptions)
                location.reload();
            }
        };
        httpRequest();
    }, [config, method, url])



    return { data, configPost, configPut, configDelete, numRow };
};

