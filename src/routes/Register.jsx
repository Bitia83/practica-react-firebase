import { useContext, useState } from "react";
import { UserContext } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { erroresFireBase } from "../utils/erroresFireBase";
import FormError from "../components/FormError";
import { formValidate } from "../utils/formValidate";
import FormImput from "../components/FormImput";
import Title from "../components/Title";
import  Button from "../components/Button";
import ButtonLoading from "../components/ButtonLoading";

const Register = () => {
  const navegate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { registerUser } = useContext(UserContext);
  const { required, patternEmail, minLength, validateTrim, validateEquals } =
    formValidate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm();

  const onSubmit = async ({ email, password }) => {
    try {
      setLoading(true)
      await registerUser(email, password);
      navegate("/");
    } catch (error) {
      console.log(error.code);
      const {code, message} = erroresFireBase(error.code)
      setError(code, {message});
    } finally {
      setLoading(false)
    }
  };

  return (
    <>
      <Title text="Register"/>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormImput
          type="email"
          placeholder="ingrese email"
          {...register("email", {
            required,
            pattern: patternEmail,
          })}
          label="ingresa tu correo"
          error={errors.email}
        >
          <FormError error={errors.email} />
        </FormImput>

        <FormImput
          type="password"
          placeholder="ingrese password"
          {...register("password", {
            // setValueAs: v => v.trim(),
            minLength,
            validate: validateTrim,
          })}
          label="Ingrese password"
          error={errors.password}
        >
          <FormError error={errors.password} />
        </FormImput>

        <FormImput
           type="password"
           placeholder="Ingrese Password"
           {...register("repassword", {
               validate: validateEquals(getValues("password")),
           })}
           label="Repite contraseña"
           error={errors.repassword}
        >
          <FormError error={errors.repassword} />
        </FormImput>
      
        <Button text="Register" type="submit" loading={loading}
        color="blue"
        />
      
       
      </form>
    </>
  );
};

export default Register;
