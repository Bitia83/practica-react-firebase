import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore/lite"
import { useEffect } from "react"
import { useState } from "react"
import { db, auth } from "../firebase"
import { nanoid } from "nanoid"

export const UseFirestore = () => {

  const [data, setData] = useState([])
  const [error, setError] = useState()
  const [loading, setLoading] = useState({})

  
  const getData = async () => {
    console.log(auth.currentUser)
    try {
      setLoading(prev => ({...prev, getData: true}))
      const dataRef = collection(db, "urls")
      const q = query(dataRef,
        where("uid", "==", auth.currentUser.uid));
      const querySnapshot = await getDocs(q)
      const dataDB = querySnapshot.docs.map((doc) => doc.data());
      setData(dataDB)
    } catch (error) {
      console.log(error)
      setError(error.message)
    } finally {
      setLoading(prev => ({...prev, getData: false}))
  }
}

  const addData = async (url) => {
    try {
      setLoading(prev => ({...prev, addData: true}))
      const newDoc = {
        enabled: true,
        nanoid: nanoid(6),
        origin: url,
        uid: auth.currentUser.uid
      }
      const docRef = doc(db, "urls", newDoc.nanoid)
      await setDoc(docRef, newDoc)
      setData([...data, newDoc])
    } catch (error) {
      console.log(error)
      setError(error.message)
    } finally {
      setLoading(prev => ({...prev, addData: false}))
    }
  }
  return {
data, error, loading, getData, addData,
  }
}