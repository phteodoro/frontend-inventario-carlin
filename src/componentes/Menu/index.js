import React,{useEffect,useState} from "react";
import './styles.css';
import { FiUser, FiTruck }from 'react-icons/fi'
import { FcConferenceCall} from "react-icons/fc";
import { BiCoinStack, BiHomeCircle } from "react-icons/bi";

export default function Menu(){
    const [nome,setNome]= useState("");

    function buscarnome()
    {
    const value= localStorage.getItem("usuario");
    const usu= JSON.parse(value);
    setNome(usu[0].nomeusuario);
    console.log(usu);
    // console.log(usu[1]);
    }
    useEffect(()=>{
        buscarnome();
    },[])
    return(       
        <div className="menu">
            {/* <p>{"Seja bem vindo "+ nome + "!"}</p> */}
            <p>Seja bem vindo {nome}!</p>
            <h1>Menu</h1>
            <a href="/listausuarios">    <FiUser color  = "black"      size = {25} />Usuários</a>
            <a href="/listaempresas">    <FiTruck color = "black"      size = {25} /> Empresas</a>
            <a href="/listapatrimonios"> <BiCoinStack                  size = {25} />Patrimônio</a>
            <a href="/listalotacao">     <FcConferenceCall             size = {25}/>Lotação</a>
            <a href="/listasetor">       <BiHomeCircle color = "black" size = {25} />Setor</a>
        </div>            
    );
}