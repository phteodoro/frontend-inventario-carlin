import React, { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"
import Menu from "../../componentes/Menu";
import Head from "../../componentes/Head"
import Usuarios from "../../server/usuario.json";
import {FiEdit,FiTrash,FiDelete, FiFilePlus} from "react-icons/fi";
import api from "../../server/api";
 
export default function Listaempresas(){
    const [dados,setDados]= useState([]);
    useEffect(()=>{
        mostrarLista();
    },[])

    function editar(i){
        window.location.href=`/editarempresa/${i}`
    }
    function mostrarLista(){
        // let cadastros=JSON.parse(localStorage.getItem("cd-empresas")||"[]");
        // setDados(cadastros);
        api.get('/empresa')
        .then(res=>{
            if(res.status==200){
                setDados(res.data.empresa);
                console.log("Status"+res.status);
                console.log(res.data.mensagem);
            }else{
                console.log("houve um erro de aquisição")
            }           
        })
        .catch(function(error){
            console.log(error);
        });
    }
    function excluir(i,nome){
        confirmAlert({
            title: 'Excluir Empresa',
            message:`Deseja realmente excluir o cadastro de ${nome}`,
            buttons: [
                {
                    label:'Sim',
                    onClick:()=>{
                        api.delete(`/empresa/${i}`)
                        .then((response)=>{
                            alert("Cadastro deletado com sucesso!!!!");
                            mostrarLista();
                        })
                    }
                },
                {
                    label:'Não',
                    onClick:()=>alert('Click No')
                }
            ]
        })
    }
    // confirmAlert({
    //     title: 'Excluir Usuário',
    //     message:`Deseja realmente excluir o cadastro de ${nome}`,
    //     buttons: [
    //         {
    //             label:'Sim',
    //             onClick:()=>{
    //                 api.delete(`/usuario/${i}`)
    //                 .then((response)=>{
    //                     alert("Cadastro deletado com sucesso!!!!");
    //                     mostrarLista();
    //                 })
    //                 // let dadosnovos = [];
    //                 // dadosnovos=dados.filter((item)=>item.id==i);
    //                 // setDados(dadosnovos);
    //                 // localStorage.setItem("cd-usuarios",JSON.stringify(dadosnovos));
    //             }
    //         },
    //         {
    //             label:'Não',
    //             onClick:()=>alert('Click No')
    //         }
    //     ]
    // })

    return(
        <div className="dashboard-container">
            
            <Menu/>   

            <div className="principal">
            <Head title="Lista de Empresas"/>
                <div className="button_new">                  
                    <a href="/cadastroempresa">
                        <FiFilePlus
                        size={24}
                        color="green"
                        cursor="pointer"
                        />
                    </a>                    
                </div>
                {
                    dados.length > 0 ?
                    <table border={1}>
                        <tr>
                            <th>Id</th>
                            <th>Nome</th>
                            <th></th>
                            <th></th>
                        </tr>             
                            {
                                dados.map(usu=>
                                { 
                                    return(
                                    <tr key={usu.id}>
                                        <td>{usu.id}</td>
                                        <td>{usu.nome}</td>                                      
                                        <td>{}</td>
                                        <td>
                                            <FiEdit
                                                color="#1a1b1a"
                                                cursor="pointer"
                                                onClick={(e)=>editar(usu.id)}
                                                />
                                        </td>
                                        <td>
                                            <FiTrash
                                                color="#801245" 
                                                onClick={(e)=>excluir(usu.id, usu.nome)} cursor="pointer" />
                                        </td>
                                    </tr>
                                    )
                                })
                            }
                       
                    </table>
                    :
                    <table border={1}>
                        <tr>
                            <th>Id</th>
                            <th>Nome</th>
                            <th></th>
                            <th></th>
                        </tr>    
                    </table>
                }
            </div>
        </div>
    )
}