export const erroresFireBase = (code) => {
  switch (code) {
    case 'auth/email-already-in-use':
     return "usuario ya registrado"
    case 'auth/invalid-email':
      return "formato email no valido"
    case 'auth/user-not-found':
      return "usuario no registrado";
    case 'auth/wrong-password':
      return "contraseña incorrecta";
    default:
      return "ocurrio un error en el server"
  }
}