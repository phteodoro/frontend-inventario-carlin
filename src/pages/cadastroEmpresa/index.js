import React,{useState,useEffect} from "react";
import Menu from "../../componentes/Menu";
import Head from "../../componentes/Head"
import Usuarios from "../../server/usuario.json";
import api from "../../server/api";

export default function Cadatroempresa(){

    const[nome,setNome]= useState('');
    const[responsavel,setResponsavel]= useState('');
    const[contato,setContato]= useState('');
    const[msg,setMsg]= useState('');
    const dados={
        nome,
        responsavel,
        contato
}

 
function salvardados(e){
    e.preventDefault();

                let index=0
                if(nome.length<=3)
                {
                    setMsg("Campo nome precisa ter mais de 3 letras");
                    index++;
                }
                if(index===0){
                    console.log(dados);
                    api.post('empresa',
                    dados,
                        {headers: { 'Content-Type': 'application/json' }
                    }).then(function (response){
                        console.log(response.data);
                        alert("Cadastro Salvo com sucesso!");
                        window.location.href="/listaempresas"
                        // navigate.push("/listausuario")
                    })}
                    // let listaUser = JSON.parse(localStorage.getItem("cd-empresas")||"[]");
                    //     listaUser.push(
                    //         {
                    //             id:Date.now().toString(36)+Math.floor(Math.pow(10,12)+Math.random()*9*Math.pow(10,12)).toString(36),
                    //             nome:nome,

                    //         }                   
                    //     )
                        // localStorage.setItem("cd-empresas",JSON.stringify(listaUser));
                        // alert("Cadastro Salvo com Sucesso!!!!");
                        // window.location.href="/listaempresas"; 
                    }
      
    return(
        <div className="dashboard-container">   
            <Menu/>   
            <div className="principal">
              <Head title="Cadastro de Empresas"/>
                <section className="form-cadastro">
                    <form onSubmit={salvardados}>
                        <label>Nome</label>
                        <input placeholder="Nome"
                            value={nome}
                            onChange={e=>setNome(e.target.value)}
                        />
                        <label>Responsável</label>
                        <input placeholder="Nome"
                            value={responsavel}
                            onChange={e=>setResponsavel(e.target.value)}
                        />                           
                        <label>Contato</label>
                        <input placeholder="Contato"
                            value={contato}
                            onChange={e=>setContato(e.target.value)}
                        /> 
                            <p>{msg}</p>
                        <button className="button_save" type="submit">Salvar</button>
                    </form>              
                </section>
            </div>
        </div>
    )
}
