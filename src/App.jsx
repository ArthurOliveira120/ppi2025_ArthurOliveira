import "./styles/theme.css";
import "./styles/global.css";
import { MyText } from "./components/MyText";

export default function App() {
  const texts = [
    {
      title: "Título ",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      title: "Título ",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      title: "Título ",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
  ];

  return (
    //React Fragment
    <>
      {texts.map((item, index) => {
        return <MyText title={`${index+1}. ${item.title}`}> {item.text} </MyText>;
      })}
    </>
  );
}