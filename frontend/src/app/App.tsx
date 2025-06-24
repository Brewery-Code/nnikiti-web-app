import { Header, Footer } from "@/widgets";
import { Outlet } from "react-router-dom";
function App() {
  return (
    <div className="relative flex flex-col min-h-dvh bg-[#000000] bg-[linear-gradient(135deg,_rgba(0,0,0,0.1)_0%,_rgba(30,39,255,0.1)_25%,_rgba(246,0,255,0.1)_50%,_rgba(255,141,0,0.1)_75%,_rgba(0,0,0,0.2)_100%)]">
      <Header />
      <main className="grow shrink basis-auto mt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
