import { useContext } from "react";
import { UserContext } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { erroresFireBase } from "../utils/erroresFireBase";
import FormError from "../components/FormError";
import { formValidate } from "../utils/formValidate";
import FormImput from "../components/FormImput";

const Register = () => {
  const navegate = useNavigate();
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
      await registerUser(email, password);
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
      <h1>Register</h1>

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

        <FormImput
          type="password"
          placeholder="ingrese password"
          {...register("repassword", {
            //setValueAs: v => v.trim(),
            validate: validateEquals(getValues),
          })}
        >
          <FormError error={errors.repassword} />
        </FormImput>

        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default Register;
