import React,{useState,useEffect} from "react";
import Menu from "../../componentes/Menu";
import Head from "../../componentes/Head";
import { useHistory } from "react-router-dom";
import { BiWindows } from "react-icons/bi";
import api from "../../server/api";

export default function Cadatrousuario(){

    const navigate = useHistory();
    const[nome,setNome]= useState('');
    const[email,setEmail]= useState('');
    const[senha,setSenha]= useState('');
    const[ConfiSenha,setConfiSenha]= useState('');
    const[msg,setMsg]= useState('');
    const[valida,setValida]= useState(false);
    const dados={
        nome,
        email,
        senha
}

function validarSenha(){
    if(senha!=="")
    {
        if(senha!==ConfiSenha)
        { 
            setValida(false);
            setMsg("Senhas não conferem!");
        }
        else{
            setValida(true);
            setMsg("Senhas iguais!");
        }
    }else{
        setValida(false);
        setMsg("Campo senha está vazio");
        setTimeout(()=>{
            setMsg('');
        },4000);
    } 
}    
function salvardados(e){
    e.preventDefault();
    validarSenha();
        if(valida===false){
            setMsg("Senha não conferem!!");
        }else{
                let index=0
                if(nome.length<=3)
                {
                    setMsg("Campo nome precisa ter mais de 3 letras");
                    index++;
                }else if(email===""){
                        setMsg("O campo email está vazio!");
                        index++;
                    }
                if(index===0){
                    console.log(dados);
                    api.post('usuario',
                    dados,
                        {headers: { 'Content-Type': 'application/json' }
                    }).then(function (response){
                        console.log(response.data);
                        alert("Cadastro Salvo com sucesso!");
                        window.location.href="/listausuarios"
                        // navigate.push("/listausuario")
                    })}
            }   
    }   

    return(
        <div className="dashboard-container">   
            <Menu/>   
            <div className="principal">
              <Head title="Cadastro de Usuário"/>
                <section className="form-cadastro">
                    <form onSubmit={salvardados}>
                        <label>Nome</label>
                        <input placeholder="Nome"
                            value={nome}
                            onChange={e=>setNome(e.target.value)}
                        />
                        <label>Email</label>
                        <input placeholder="Email"
                            type="email"
                            value={email}
                            onChange={e=>setEmail(e.target.value)}
                        />
                        <label>Senha</label>
                        <input placeholder="Senha" type=""
                            value={senha}
                            onChange={e=>setSenha(e.target.value)}
                        />
                            <label>Confirmar Senha</label>
                        <input placeholder="Confirmar Senha" type=""
                            value={ConfiSenha}
                            onKeyUp={ validarSenha}
                            onChange={e=>setConfiSenha(e.target.value)}
                            />
                            <p>{msg}</p>
                        <button className="button_save" type="submit">Salvar</button>
                    </form>              
                </section>
            </div>
        </div>
    )
}
