import { useContext, useState } from "react";
import { UserContext } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { erroresFireBase } from "../utils/erroresFireBase";
import FormError from "../components/FormError";
import FormImput from "../components/FormImput";
import { formValidate } from "../utils/formValidate";
import Title from "../components/Title";
import  Button from "../components/Button";



const Login = () => {
  const { loginUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const navegate = useNavigate();
  const { required, patternEmail, minLength, validateTrim } =
        formValidate();
    
  const {
    register,
    handleSubmit,
      formState: { errors },
      setError,
  } = useForm();

  const onSubmit = async ({ email, password }) => {
    try {
    setLoading(true)
      await loginUser(email, password);
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
      <Title text="Login"/>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormImput
          label="ingrese email"
          type="email"
          placeholder="ingrese email"
          {...register("email", {
            required,
            pattern: patternEmail,
          })}
          error={errors.email}
        >
          <FormError error={errors.email} />
        </FormImput>
        <FormImput
          label="ingrese password"
          type="password"
          placeholder="ingrese password"
          {...register("password", {
            // setValueAs: v => v.trim(),
            minLength,
            validate: validateTrim,
          })}
          error={errors.password}
        >
          <FormError error={errors.password} />
        </FormImput>
      
            <Button text="Login" type="submit" loading={loading} color="blue"/>
        
       
      </form>
    </>
  );
};

export default Login;
