
import { useState } from "react"
import { useEffect } from "react"
import Title from "../components/Title"
import { UseFirestore } from "../hooks/UseFirestore"




const Home = () => {
  const { data, error, loading, getData, addData} = UseFirestore()
  const [text, setText] = useState("")
  useEffect(() => {
    console.log("getData");
    getData();
  }, []);

  if (loading.getData) return <p>Loading data...</p>
  if (error) return <p>{error}</p>

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addData(text)
    setText("")
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
        <button type="submit">ADD URL</button>

      </form>

      {data.map(item => (
        <div key={item.nanoid}>
          <p>{item.nanoid}</p>
          <p>{item.origin}</p>
          <p>{ item.uid}</p>
        </div>
      ))}
    </>
  )
}

export default Home