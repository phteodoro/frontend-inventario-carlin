import React,{useState,useEffect} from "react";
import Menu from "../../componentes/Menu";
import Head from "../../componentes/Head"
import { useParams } from "react-router-dom";
// import src from "./src/react";
import api from "../../server/api";


export default function Editarsetor(){
    const{idsetor} = useParams();
    const[nome,setNome] = useState('');
    const[msg,setMsg] = useState('');
    const dados={
        id:idsetor,
        nome
    }
    useEffect(()=>{
        mostrarDados();
    },[idsetor])
    
    function mostrarDados(){     
            api.get(`/setor/${idsetor}`)
        .then(res=>{
            if(res.status==200){
                setNome(res.data.setor[0].nome);
            }else{
                console.log("houve um erro de aquisição")
            }
        })
        .catch(function(error){
            console.log(error);
        });
        }
    function limparLocalstore(){
            localStorage.removeItem("cd-setor");
             alert("Local Store deletado!") 
        }
function salvardados(e){
    e.preventDefault();
        let index=0
    if(nome.length<=3)
        {
            setMsg("Campo nome precisa ter mais de 3 letras");
            index++;
        }else if(nome===""){
            setMsg("O campo nome está vazio!");
            index++;
        }
        if(index===0){
            console.log(dados);
            api.patch('setor',
            dados,
                {headers: { 'Content-Type': 'application/json' }
            }).then(function (response){
                    console.log(response.data);

                    alert("Cadastro Salvo com sucesso!");
                    window.location.href="/listasetor"
                    });      
            }     
          
}  
    return(
        <div className="dashboard-container">   
            <Menu/>   
            <div className="principal">
              <Head title="Editar Setores"/>
                <section className="form-cadastro">
                    <form onSubmit={salvardados}>
                        <label>Nome</label>
                        <input placeholder="Nome"
                            type="text"
                            value={nome}
                            onChange={e=>setNome(e.target.value)}
                        />                                           
                            <p>{msg}</p>
                        <button className="button_save" type="submit">Salvar</button>
                        <button onClick={limparLocalstore} className="" type="button">Limpar</button>
                    </form>              
                </section>
            </div>
        </div>
    )
}
