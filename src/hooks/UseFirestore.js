import { collection, getDocs, query, where } from "firebase/firestore/lite"
import { useEffect } from "react"
import { useState } from "react"
import {db} from "../firebase"
export const UseFirestore = () => {

  const [data, setData] = useState([])
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
  getData()
  },[])

  const getData = async () => {
    try {
      setLoading(true)
      const dataRef = collection(db, "urls")
      const q = query(dataRef,
        where("uid", "==", "zAx2Id7dclcBgLvw6FIOLvmPKOK2"));
      const querySnapshot = await getDocs(q)
      const dataDB = querySnapshot.docs.map((doc) => doc.data());
      setData(dataDB)
    } catch (error) {
      console.log(error)
      setError(error.message)
    } finally {
      setLoading(false)
  }
}

  return {
data, error, loading,
  }
}