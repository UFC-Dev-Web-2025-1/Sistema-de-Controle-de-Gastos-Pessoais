import { Pencil, BanknoteArrowDown } from "lucide-react";
import "/src/components/Items/style.css";

export default function ExpensesItemEditable(props) {
  return (
    <div className="item editable">
      <div className="icon-info">
        <BanknoteArrowDown className="icon" />
        <div className="info">
          <p className="name-editable">{props.expenseName}</p>
          <p className="value-editable">{"R$ " + props.expenseValue}</p>
        </div>
      </div>
      <Pencil className="icon pencil" />
    </div>
  );
}