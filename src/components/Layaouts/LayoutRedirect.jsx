import { useState } from "react"
import { useEffect } from "react"
import { Outlet, useParams } from "react-router-dom"
import { UseFirestore } from "../../hooks/UseFirestore"
import Title from "../Title"

const LayoutRedirect = () => {
const {nanoid} = useParams()
  const { searchData } = UseFirestore()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    searchData(nanoid)
      .then(docSnap => {
        if (docSnap.exists()) {
          window.location.href = docSnap.data().origin;
        } else {
          setLoading(false)
        }
      })
  }, []);

  if(loading) return <Title text="Cargando redireccionamiento..."/>
  
  return (
    <div className="mx-auto container">
      <Outlet/>

    </div>
  )
}
 export default LayoutRedirect