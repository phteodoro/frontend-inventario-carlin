import React,{useState,useEffect} from "react";
import Menu from "../../componentes/Menu";
import Head from "../../componentes/Head"
import { useParams } from "react-router-dom";
import Usuario from "../../server/usuario.json"
import api from "../../server/api";


export default function Editarempresa(){
    const{idempresas} = useParams();
    const[nome,setNome] = useState('');
    const[contato,setContato] = useState('');
    const[responsavel,setResponsavel] = useState('');
    const[msg,setMsg] = useState('');
    const dados={
        id:idempresas,
        nome,
        contato,
        responsavel
    }
    useEffect(()=>{
        mostrarDados();
    },[idempresas])
    
    function mostrarDados(){     
            // let listaUser = JSON.parse(localStorage.getItem("cd-empresas"));
            // listaUser.
            //     filter(value => value.id == idempresas).
            //     map(value => {
            //         setNome(value.nome);                
            //     });
        api.get(`/empresa/${idempresas}`)
            .then(res=>{
            if(res.status==200){
                setNome(res.data.empresa[0].nome);
                setResponsavel(res.data.empresa[0].responsavel);
                setContato(res.data.empresa[0].contato);
            }else{
                console.log("houve um erro de aquisição")
            }
        })
        .catch(function(error){
            console.log(error);
        });
        }
    function limparLocalstore(){
            localStorage.removeItem("cd-empresas");
                alert("Local Store deletado!") 
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
                    api.patch('empresa',
                    dados,

                        {headers: { 'Content-Type': 'application/json' }

                    }).then(function (response){
                        console.log(response.data);

                        alert("Cadastro Salvo com sucesso!");
                        window.location.href="/listaempresas"
                    });
                    // localStorage.setItem("cd-usuarios", JSON.stringify(listaUser));
                    // alert("Dados salvos com sucesso!");
                    // window.location.href="/listausuarios"; 
                    }         
                }

    return(
        <div className="dashboard-container">   
            <Menu/>   
            <div className="principal">
              <Head title="Editar Empresa"/>
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
                        <input placeholder="Nome"
                            value={contato}
                            onChange={e=>setContato(e.target.value)}
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
