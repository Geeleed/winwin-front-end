import { useState } from "react";
import { ButtonSeeOther } from "./Buttons";
import Card, { ItemData } from "./Card";

export default function CardExToMe({ itemData }: { itemData: ItemData }) {
  const checkedState = useState("");
  return (
    <Card
      itemData={itemData}
      checkedState={checkedState}
      button={[
        <ButtonSeeOther
          key={1}
          itemData={itemData}
          checkedState={checkedState}
          isGrad={true}
        />,
      ]}
    />
  );
}
