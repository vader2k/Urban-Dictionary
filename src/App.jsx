import Hero from "./components/Hero"
import Result from "./components/Result"

const App = () => {
  return (
    <div className="max-w-[1440px] m-auto p-3 bg-slate-300">
      <Hero />
      <Result />
    </div>
  )
}

export default App