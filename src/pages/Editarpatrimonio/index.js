import React,{useState,useEffect} from "react";
import Menu from "../../componentes/Menu";
import Head from "../../componentes/Head"
import { useParams } from "react-router-dom";
import Usuario from "../../server/usuario.json"
// import src from "./src/react";
import api from "../../server/api";


export default function Editarpatrimonio(){
    const{id} = useParams();
    const[nome,setNome] = useState('');
    const[msg,setMsg] = useState('');
    const dados={
        id:id,
        nome
    }
    
    useEffect(()=>{
        mostrarDados();
    },[id])
    
    function mostrarDados(){  
        api.get(`/patrimonio/${id}`)
            .then(res=>{
            if(res.status==200){
                setNome(res.data.patrimonio[0].nome);
                // setResponsavel(res.data.empresa[0].responsavel);
                // setContato(res.data.empresa[0].contato);
            }else{
                console.log("houve um erro de aquisição")
            }
        })
        .catch(function(error){
            console.log(error);
        });   

        }
        function limparLocalstore()
        {
            localStorage.removeItem("cd-patrimonios");
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
            setMsg("O campo email está vazio!");
            index++;
        }
        if(index===0){
                    // console.log(dados);
                    // api.patch('empresa',
                    // dados,

                    //     {headers: { 'Content-Type': 'application/json' }

                    // }).then(function (response){
                    //     console.log(response.data);

                    //     alert("Cadastro Salvo com sucesso!");
                    //     window.location.href="/listaempresas"
                    // }); 
                    console.log(dados);
                    api.patch('patrimonio',
                    // {nome:nome, id:id},
                    dados,
                
                        {headers: { 'Content-Type': 'application/json' }

                    }).then(function (response){
                        console.log(response.data);

                        alert("Cadastro Salvo com sucesso!");
                        window.location.href="/listapatrimonios"
                    });
                // localStorage.setItem("cd-patrimonios", JSON.stringify(listaUser));
                // alert("Dados salvos com sucesso!");
                // window.location.href="/listapatrimonios"; 
                // console.log(listaUser);
                
            }    
          
}  
    return(
        <div className="dashboard-container">   
            <Menu/>   
            <div className="principal">
              <Head title="Editar Patrimônios"/>
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
