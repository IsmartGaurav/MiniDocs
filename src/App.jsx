import Background from "./components/Background"
import Foreground from "./components/Foreground"


const App = () => {
  return (
    <div>
      <div className='relative w-full h-screen bg-zinc-900'>
        <Background/>
        <Foreground/>
      </div>
    </div>
  )
}

export default App