export const formValidate = () => {
  return {
    required: {
      value: true,
      message: "campo obligatorio"
    },
    patternEmail: {
      value: /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0.9-]+)*(\.[a-z]{2,15})/,
      message: "formato email incorrecto",
    },
    patternURL: {
      value: /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/,
      message: "formato URL incorrecto",
    },
    minLength: {
      value: 6,
      message: "minimo 6 caracteres"
    },
    validateTrim: {
      trim: v => {
        if (!v.trim()) {
          return "no espacios"
        }
        return true;
      },
    },
    // validateEquals(value) {
    //   return {
    //     equals: (v) => v === value || "No coinciden las contraseñas",
    //   };
    // },
  };
};
