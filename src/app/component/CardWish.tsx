import { useState } from "react";
import { ButtonCancelWish, ButtonExchange } from "./Buttons";
import Card, { ItemData } from "./Card";

export default function CardWish({ itemData }: { itemData: ItemData }) {
  const checkedState = useState("");
  return (
    <Card
      itemData={itemData}
      checkedState={checkedState}
      button={[
        <ButtonCancelWish
          key={1}
          itemData={itemData}
          checkedState={checkedState}
          isGrad={false}
        />,
        <ButtonExchange
          key={2}
          itemData={itemData}
          checkedState={checkedState}
          isGrad={true}
        />,
      ]}
    />
  );
}
