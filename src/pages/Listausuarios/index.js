import React, { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"
import Menu from "../../componentes/Menu";
import Head from "../../componentes/Head"
import Usuarios from "../../server/usuario.json";
import {FiEdit,FiTrash,FiDelete, FiFilePlus} from "react-icons/fi";
import api from "../../server/api";
 
export default function Listausuarios(){
    const [dados,setDados]= useState([]);
    useEffect(()=>{
        mostrarLista();
    },[])
    function editar(i){
        window.location.href=`/editarusuario/${i}`
    }
    function mostrarLista(){
        // let cadastros=JSON.parse(localStorage.getItem("cd-usuarios")||"[]");
        // setDados(cadastros);
        api.get('/usuario')
        .then(res=>{
            if(res.status==200){
                setDados(res.data.usuario);
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
            title: 'Excluir Usuário',
            message:`Deseja realmente excluir o cadastro de ${nome}`,
            buttons: [
                {
                    label:'Sim',
                    onClick:()=>{
                        api.delete(`/usuario/${i}`)
                        .then((response)=>{
                            alert("Cadastro deletado com sucesso!!!!");
                            mostrarLista();
                        })
                        // let dadosnovos = [];
                        // dadosnovos=dados.filter((item)=>item.id==i);
                        // setDados(dadosnovos);
                        // localStorage.setItem("cd-usuarios",JSON.stringify(dadosnovos));
                    }
                },
                {
                    label:'Não',
                    onClick:()=>alert('Click No')
                }
            ]
        })
    }
    return(
        <div className="dashboard-container">
            
            <Menu/>   

            <div className="principal">
            <Head title="Lista de Usuários"/>
                <div className="button_new">                  
                    <a href="/cadastrousuario">
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
                            <th>Email</th>
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
                                        <td>{usu.email}</td>
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
                                                onClick={(e)=>excluir(usu.id, usu.nomeusuario)} cursor="pointer" />
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
                            <th>Email</th>
                            <th></th>
                            <th></th>
                        </tr>    
                    </table>
                }
            </div>
        </div>
    )
}