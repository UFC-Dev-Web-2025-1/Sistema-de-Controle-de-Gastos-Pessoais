import { CreditCard } from "lucide-react";
import "../style.css";

export default function CardItem(props) {
  return (
    <div className="item">
      <CreditCard className="icon" />
      <div className="info">
        <p className="name">{props.cardName}</p>
        <p className="type">{props.cardType}</p>
      </div>
      <p className="value">{"R$ " + props.cardValue}</p>
    </div>
  );
}
