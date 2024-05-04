import { useState } from "react";
import { ButtonExchange, ButtonWish } from "./Buttons";
import Card, { ItemData } from "./Card";

export default function CardOtherIsMatched({
  itemData,
}: {
  itemData: ItemData;
}) {
  const checkedState = useState("");
  return <Card itemData={itemData} checkedState={checkedState} button={[]} />;
}
