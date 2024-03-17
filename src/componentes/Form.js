import {useCallback, useEffect, useState} from 'react'
import '../formato.css';


async function fetchPost(url, data){
    await fetch(url, {
    method: "POST",
    body: JSON.stringify(data), //convierte JS en JSON
    headers: {
    "Content-Type": "application/json",
    },
    })}
function Form(){
    const url = " http://localhost:3000/users"


    const [usuario, setUsuario] = useState("")
    const [apellidos, setApellidos] = useState("")
    const [email, setEmail] = useState("")
    const [sexo, setSexo] = useState("Hombre")
    const [mensaje, setMensaje] = useState("")
    const [isChecked, setIsChecked] = useState(false)
    const [errorUsuario, setErrorUsuario] = useState("El nombre no puede estar vacío.")
    const [errorApellidos, setErrorApellidos] = useState("El apellido no puede estar vacío.")
    const [errorEmail, setErrorEmail]= useState("El email no puede estar vacío.")
    const [longMensaje, setLongMensaje] = useState(500)
    const [errorTerminos, setErrorTerminos] = useState("Debes aceptar los terminos y condiciones")
    const [isValid, setIsValid] = useState(false)
    const [data, setData] = useState({usuario: usuario, apellidos: apellidos, email: email, mensaje: mensaje, sexo: sexo, isChecked: true})
    
    
    const validar = useCallback( function(){
        console.log("validar")
       
        if(errorUsuario === "" && errorApellidos === "" && errorEmail === "" && errorTerminos === "" && isChecked){
            setIsValid(true)
           
        }else{
            setIsValid(false)
        }
    },
    [errorUsuario, errorApellidos, errorEmail, errorTerminos, isChecked]
    )


    function handleUsuario(event){

        setUsuario(event.target.value)
       
       
        if(event.target.value.length > 10){
            setErrorUsuario("El nombre no puede superar los 10 carácteres.")
        }else if(event.target.value === ""){
            setErrorUsuario("El nombre no puede estar vacío.")
        }else{
            setData({...data, usuario: event.target.value})
            setErrorUsuario("")
        }
        
    }
    function handleApellidos(event){
        setApellidos(event.target.value)
        if(event.target.value.length > 20){
            setErrorApellidos("El apellido no puede superar los 20 carácteres.")
        }else if(event.target.value === ""){
            setErrorApellidos("El apellido no puede estar vacío.")
        }else{
            setData({...data, apellidos: event.target.value})
            setErrorApellidos("")  
        }
    }
    function handleEmail(event){
        setEmail(event.target.value)
        if(event.target.value.length > 20){
            setErrorEmail("El email no puede superar los 20 carácteres.")
        }else if(event.target.value === ""){
            setErrorEmail("El email no puede estar vacío.")
        }else if(!event.target.value.includes('@')){
            setErrorEmail("El email debe contener un @")
        }else{
            setData({...data, email: event.target.value})
            setErrorEmail("") 
        }
    }
    function handleSexo(event){
        setSexo(event.target.value)
        setData({...data, sexo: event.target.value})
    }
    function handleMensaje(event){
        setMensaje(event.target.value)
        setLongMensaje(500 - event.target.value.length)
        setData({...data, mensaje: event.target.value})
    }
    function handleCheckboxChange(event){
        setIsChecked(!isChecked);
        if(!event.target.checked){
            setErrorTerminos("Debes aceptar los terminos y condiciones.")
        }else{
            setErrorTerminos("")
        }
    };
    function handleSubmit(e){
        
        if(isValid){
            fetchPost(url, data)
            alert("Formulario enviado")
            console.log("Enviado")
            
        }else{
            e.preventDefault()
            console.log("Formulario incorrecto")
        }
    
    }

   

    useEffect(()=>{
        validar()
    },[validar])
   
    return(
        
        <form className="form" onSubmit={handleSubmit}>
            <p>Nombre Usuario</p>
            <input value={usuario} onChange={handleUsuario}/>
            <p className='error'>{errorUsuario}</p>
            <p>Apellidos</p>
            <input value={apellidos} onChange={handleApellidos}/>
            <p className='error'>{errorApellidos}</p>
            <p>Email</p>
            <input value={email} onChange={handleEmail}/><br/>
            <p className='error'>{errorEmail}</p>
            <p>Sexo</p>
            <select value={sexo} onChange={handleSexo}>
                <option value="Hombre">Hombre</option>
                <option value="Mujer">Mujer</option>
            </select>
            <p>Mensaje</p>
            <textarea value={mensaje} onChange={handleMensaje} maxLength={500}></textarea><br/>    
            <p>Te quedan {longMensaje} carácteres</p>       
            <p><input type='checkbox' checked={isChecked} onChange={handleCheckboxChange} value={isChecked}/> Aceptar terminos y condiciones</p>
            <p className='error'>{errorTerminos}</p>
            <button type = 'submit'>Submit</button>
        </form>
    )
}
export default Form;