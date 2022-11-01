export const erroresFireBase = (code) => {
  switch (code) {
    case 'auth/email-already-in-use':
      return {
        code: "email",
        message: "usuario ya registrado"
     }
    case 'auth/invalid-email':
        return {
        code: "email",
        message: "formato email no valido"
     }
    case 'auth/user-not-found':
      return {
        code: "email",
        message: "usuario no registrado"
     }
    case 'auth/wrong-password':
      return {
        code: "password",
        message: "contraseña incorrecta"
     }
    default:
      return {
        code: "email",
        message: "ocurrio un error en el server"
     }
  }
}