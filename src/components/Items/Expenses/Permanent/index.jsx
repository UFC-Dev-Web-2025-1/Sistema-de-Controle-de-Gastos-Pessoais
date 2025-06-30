import { BanknoteArrowDown } from "lucide-react";
import "/src/components/Items/style.css";

export default function ExpensesItemPermanet(props) {
  return (
    <div className="item">
      <BanknoteArrowDown className="icon" />
      <span className="info">
        <p className="name">{props.expenseName}</p>
      </span>
      <p className="value">{"R$ " + props.expenseValue}</p>
    </div>
  );
}
