import React,{useState,useEffect} from "react";
import Menu from "../../componentes/Menu";
import Head from "../../componentes/Head"
import Usuarios from "../../server/usuario.json";
import api from "../../server/api";


export default function Cadatropatrimonio(){

    const[nome,setNome]= useState('');
    const[msg,setMsg]= useState('');
    const dados={
        nome
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
                    api.post('patrimonio',
                    dados,
                        {headers: { 'Content-Type': 'application/json' }
                    }).then(function (response){
                        console.log(response.data);
                        alert("Cadastro Salvo com sucesso!");
                        window.location.href="/listapatrimonios"
                        // navigate.push("/listausuario")
                    })
                        // localStorage.setItem("cd-patrimonios",JSON.stringify(listaUser));
                        // alert("Cadastro Salvo com Sucesso!!!!");
                        // window.location.href="/listapatrimonios"; 
                }
   
            }   
 
    return(
        <div className="dashboard-container">   
            <Menu/>   
            <div className="principal">
              <Head title="Cadastro de Patrimônios"/>
                <section className="form-cadastro">
                    <form onSubmit={salvardados}>
                        <label>Nome</label>
                        <input placeholder="Nome"
                            value={nome}
                            onChange={e=>setNome(e.target.value)}
                        />
                            <p>{msg}</p>
                        <button className="button_save" type="submit">Salvar</button>
                    </form>              
                </section>
            </div>
        </div>
    )
}
