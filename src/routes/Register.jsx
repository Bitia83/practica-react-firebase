import { useContext, useState } from "react"
import { UserContext } from "../context/UserProvider"
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Register = () => {

const navegate = useNavigate()
 const { registerUser } = useContext(UserContext);

  const { register, handleSubmit, formState: { errors }, getValues } = useForm()
  
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
          {...register("email", {
            required: {
              value: true,
              message:"campo obligatorio"
            },
            pattern: {
              value: /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0.9-]+)*(\.[a-z]{2,15})/,
              message:"formato email incorrecto",
            }
          })}
        />
        {
          errors.email && <p>{ errors.email.message}</p>
        }
          <input
          type="password"
          placeholder="ingrese password"
          {...register("password", {
            minLength: {
              value: 6,
              message: "minimo 6 caracteres"
        }})}
        />
        {
          errors.password && <p>{errors.password.message}</p>
        }
          <input
          type="password"
          placeholder="ingrese password"
          {...register("repassword", {
            validate: {
              equals: v => v === getValues("password") || "no coinciden las contraseñas",
             
          }
        } )}
        />
        {
          errors.repassword && <p>{ errors.repassword.message}</p>
        }
          <button type="submit">Register</button>
      </form>
    </>
  )
}

export default Register;