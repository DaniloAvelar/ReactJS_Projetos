import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


export const useFetch = (url) => {

    //-Configurando o método que será utilizado (configurando o POST com o cabeçalho, body e etc...)
    const [config, setConfig] = useState(null);
    const [method, setMethod] = useState(null);
    const [data, setData] = useState(null);
    const [callFetch, setCallFetch] = useState(false);

    let navigate = useNavigate();

    // Setando as Configurações para o POST

    //Metodo POST Configurações
    const configPost = (data, method) => {
        if(method === "POST"){
            setConfig({
                method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            });
            console.log(data)
            setMethod(method);
        }
    };


    //Metodo PUT Edit Configurações
    const configPut = async (data, method) => {
        if(method === "PUT"){
            console.log(method)
            setConfig({
                method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            });

            console.log(data)
            setMethod(method);
        }
    };

    //Metodo PUT Edit Configurações
    const configDelete = async (data, method) => {
        console.log('aqui')
        if(method === "DELETE"){
            console.log(method)
            setConfig({
                method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            console.log(data)
            setMethod(method);
        }
    };



     // Metodo POST
     useEffect(() => {
        const httpRequest = async () =>{
            if(method === "POST"){
                let fetchOptions = [url, config]
                const res = await fetch(...fetchOptions)
                const json = await res.json()
                setCallFetch(json)
                console.log(fetchOptions)
                console.log(res)
                navigate("/");
            }
            // PUT -> UPDATE
            if(method === "PUT"){
                let fetchOptions = [url, config]
                const res = await fetch(...fetchOptions)
                const json = await res.json()
                setCallFetch(json)
                console.log(fetchOptions)
                console.log(res)
                navigate("/");
            }
            //DELETE
            if(method === "DELETE"){
                let fetchOptions = [url, config]
                const res = await fetch(...fetchOptions)
                navigate("/");
            }
        };
        httpRequest();
    }, [config, method, url])



  return {data, configPost, configPut, configDelete};
};

