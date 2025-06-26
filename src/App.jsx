import "./styles/theme.css";
import "./styles/global.css";
import { MyHeader } from "./components/MyHeader";
import { LuckyNumber } from "./components/LuckyNumber";

export default function App() {
  return (
    //React Fragment
    <>
      <MyHeader />
      <LuckyNumber />
    </>
  );
}
