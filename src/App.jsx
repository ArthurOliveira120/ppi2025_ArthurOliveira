import "./styles/theme.css";
import "./styles/global.css";
import { MyHeader } from "./components/MyHeader";
import { Main } from "./components/Main";
import { MyFooter } from "./components/MyFooter";

export default function App() {
  return (
    //React Fragment
    <>
      <MyHeader />
      <Main />
      <MyFooter />
    </>
  );
}
