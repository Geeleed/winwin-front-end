import { useState } from "react";
import { ButtonCancelExchange } from "./Buttons";
import Card, { ItemData } from "./Card";

export default function CardMeEx({ itemData }: { itemData: ItemData }) {
  const checkedState = useState("");
  return (
    <Card
      itemData={itemData}
      checkedState={checkedState}
      button={[
        <ButtonCancelExchange
          key={1}
          itemData={itemData}
          checkedState={checkedState}
          isGrad={true}
        />,
      ]}
    />
  );
}
