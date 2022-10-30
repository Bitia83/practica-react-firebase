import { forwardRef } from "react"
import { useRef } from "react"

const InputText = forwardRef((props, ref) => {
  return (
    <>
      <input type="text" ref={ref} />
    </>
  )
})
const ExampleRef = () => {

const inputFocus = useRef(null)

  const handleButtonClick = () => {
   
    inputFocus.current.focus()
  }
  return (
    <>
      <InputText ref={inputFocus} />
     
      <button onClick={handleButtonClick}>click ref</button>
    </>
  )
}
export default ExampleRef;