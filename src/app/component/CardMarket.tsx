import { useState } from "react";
import { ButtonExchange, ButtonWish } from "./Buttons";
import Card, { ItemData } from "./Card";

export default function CardMarket({ itemData }: { itemData: ItemData }) {
  const checkedState = useState("");
  return (
    <Card
      itemData={itemData}
      checkedState={checkedState}
      button={[
        <ButtonWish
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
