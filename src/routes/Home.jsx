

import { useState } from "react"
import { useEffect } from "react"
import Title from "../components/Title"
import { UseFirestore } from "../hooks/UseFirestore"
import  Button  from "../components/Button"




const Home = () => {
  const { data, error, loading, getData, addData, deleteData, updateData} = UseFirestore()
  const [text, setText] = useState("")
const [newOriginID, setNewOriginID] = useState()

  useEffect(() => {
    console.log("getData");
    getData();
  }, []);

  if (loading.getData) return <p>Loading data...</p>
  if (error) return <p>{error}</p>

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newOriginID) {
      await updateData(newOriginID, text)
      setNewOriginID("")
      setText("")
      return
    }
    await addData(text)
    setText("")
}

  const handleClickDelete = async (nanoid) => {
    await deleteData(nanoid)
  }

  const handleClickEdit = (item) => {
    console.log("click edit")
    setText(item.origin)
setNewOriginID(item.nanoid)
  }
  return (
    <>
    
      <Title text="Home" />
      <form onSubmit={handleSubmit}>
        <input
          placeholder="ex: http://bluuweb.org"
          type="text"
        value={text}
          onChange={e => setText(e.target.value)}
        />
        {
          newOriginID ? (
            <Button
            type="submit"
            text="EDIT URL"
            color="green"
            loading={loading.updateData}
            />
          ) : (
            <Button
            type="submit"
            text="ADD URL"
            color="blue"
            loading={loading.addData}
            
          />
          )
}

       
        </form>

      {data.map(item => (
        <div key={item.nanoid}>
          <p>{item.nanoid}</p>
          <p>{item.origin}</p>
          <p>{item.uid}</p>
          <Button
          type="submit"
          text="Delete"
          color="red"
            loading={loading[item.nanoid]}
            onClick={() => handleClickDelete(item.nanoid)}
          
          />
          
          <Button
          type="button"
          text="Edit"
          color="green"
          onClick={() => handleClickEdit(item.nanoid)}
          
        />
        </div>
      ))}
    </>
  )
}

export default Home