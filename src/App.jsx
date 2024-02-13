import Hero from "./components/Hero"
import Result from "./components/Result"

const App = () => {
  return (
    <div className="bg-slate-300 min-h-[100vh]">
      <div className="max-w-[1440px] m-auto p-3">
        <Hero />
        <Result />
      </div>
    </div>
  )
}

export default App