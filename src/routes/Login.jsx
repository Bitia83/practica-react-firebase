import { useContext } from "react";
import { UserContext } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { erroresFireBase } from "../utils/erroresFireBase";
import FormError from "../components/FormError";
import FormImput from "../components/FormImput";
import { formValidate } from "../utils/formValidate";

const Login = () => {
  const { loginUser } = useContext(UserContext);
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
      await loginUser(email, password);
      navegate("/");
    } catch (error) {
      console.log(error.code);
      setError("firebase", {
        message: erroresFireBase(error.code),
      });
    }
  };

  return (
    <>
      <h1>Login</h1>
      <FormError error={errors.firebase} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormImput
          type="email"
          placeholder="ingrese email"
          {...register("email", {
            required,
            pattern: patternEmail,
          })}
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
        >
          <FormError error={errors.password} />
        </FormImput>
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;
