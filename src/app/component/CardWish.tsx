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
          itemData={itemData}
          checkedState={checkedState}
          isGrad={false}
        />,
        <ButtonExchange
          itemData={itemData}
          checkedState={checkedState}
          isGrad={true}
        />,
      ]}
    />
  );
}
