import { useContext, useState } from "react"
import { UserContext } from "../context/UserProvider"
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Register = () => {

const navegate = useNavigate()
 const { registerUser } = useContext(UserContext);

  const { register, handleSubmit, formState: { errors } } = useForm()
  
  const onSubmit = data => console.log(data)

  
  
  // const handleSubmit = async (e) => {
   
  //   e.preventDefault();
  //   console.log('procesando form: ', email, password);
  //   try {
  //     await registerUser(email, password)
  //     console.log("Usuario creado");
  //     navegate('/')
  //   } catch (error) {
  //     console.log(error.code)
  //   }
  // };

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          placeholder="ingrese email"
         {...register("email", {required:true})}
        />
        {
          errors.email &&<p>Campo obligatorio</p>
        }
          <input
          type="password"
          placeholder="ingrese password"
        {...register("password")}
        />
          <input
          type="password"
          placeholder="ingrese password"
        {...register("repassword")}
        />
          <button type="submit">Register</button>
      </form>
    </>
  )
}

export default Register;