import React,{useState,useEffect} from "react";
import Menu from "../../componentes/Menu";
import Head from "../../componentes/Head"
import { useParams } from "react-router-dom";
import Usuario from "../../server/usuario.json"
import api from "../../server/api";
// import src from "./src/react";


export default function Editarusuario(){
    const{idusuarios} = useParams();
    const[nome,setNome] = useState('');
    const[email,setEmail] = useState('');
    const[senha,setSenha] = useState('');
    const[ConfiSenha,setConfiSenha] = useState('');
    const[msg,setMsg] = useState('');
    const[valida,setValida] = useState(false);
    const[usu,setUsu] = useState(false);
    const dados={
        id:idusuarios,
        nome,
        email,
        senha
    }

    useEffect(()=>{
        mostrarDados();
    },[])
    
    function mostrarDados(){
        api.get(`/usuario/${idusuarios}`)
        .then(res=>{
            if(res.status==200){
                setNome(res.data.usuario[0].nome);
                setEmail(res.data.usuario[0].email);
                setSenha(res.data.usuario[0].senha);
                setConfiSenha(res.data.usuario[0].senha);
            }else{
                console.log("houve um erro de aquisição")
            }
        })
        .catch(function(error){
            console.log(error);
        });
        // let listaUser = JSON.parse(localStorage.getItem("cd-usuarios"));
        // listaUser.
            // filter(value => value.id == idusuario).
            // map(value => {
            //     setNome(value.nome);
            //     setEmail(value.email);
            //     setSenha(value.senha);
            //     setConfiSenha(value.senha);
            // });
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
                    api.patch('usuario',
                    dados,

                        {headers: { 'Content-Type': 'application/json' }

                    }).then(function (response){
                        console.log(response.data);

                        alert("Cadastro Salvo com sucesso!");
                        window.location.href="/listausuarios"
                    });
                    // localStorage.setItem("cd-usuarios", JSON.stringify(listaUser));
                    // alert("Dados salvos com sucesso!");
                    // window.location.href="/listausuarios"; 
                    }    
            }   
}       
    return(
        <div className="dashboard-container">   
            <Menu/>   
            <div className="principal">
              <Head title="Editar Usuário"/>
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
