import React, { useState, useEffect, createContext } from 'react';
import { useFetch } from '../../Components/Hooks/useFetch';
import './indexCategory.css';
//Modal


const IndexCategory = () => {

    //URL que esta rodando a API Json Server
    const urlDB = "http://localhost:3000/categorias"

    // Custom Hook pegando os valores
    //NumRow é a qtde de linhas que veio do array
    const { data, numRow } = useFetch(urlDB);

    return (
        <div className="Container">
            <div className='topo'>
                <h1>Categorias</h1>
            </div>
            <div className="container text-center">
                <div className="row">
                    <div className="col">
                        ID
                    </div>
                    <div className="col">
                        Categoria
                    </div>
                    <div className="col">
                        Data Criação
                    </div>
                    <div className="col">
                        Editar
                    </div>
                    <div className="col">
                        Excluir
                    </div>
                </div>
                {data && data.map((item) => (
                    <div className="row2" key={item.id}>
                        <div className="col">{item.id}</div>
                        <div className="col">{item.descricao}</div>
                        <div className="col">{item.dtCriacao}</div>
                        <div className="col">
                            <button type="submit" id={item.id} name="edit" className="btnEdit" data-toggle="modal" data-target="#exampleModal"><span className="material-symbols-outlined">edit</span></button>
                        </div>
                        <div className="col">
                            <button type="submit" id={item.id} name="delete" className="btnDelete"><span className="material-symbols-outlined">delete</span></button>
                        </div>
                    </div>
                ))}

            </div>
        </div> //Fim Container
    )
}

export default IndexCategory