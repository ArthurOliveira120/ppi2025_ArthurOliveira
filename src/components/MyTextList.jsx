import styles from "./MyTextList.module.css";
import { MyText } from "./MyText";

export function MyTextList() {
  const texts = [
    {
      title: "Título",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      title: "Título",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      title: "Título",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      title: "Título",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      title: "Título",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
  ];

  return (
    <div>
      <h1 className={styles.title}>Meus textos</h1>
      <div className={styles.container}>
        {texts.map((item, index) => (
          <MyText key={index} title={`${index + 1}. ${item.title}`}>
            {item.text}
          </MyText>
        ))}
      </div>
    </div>
  );
}
