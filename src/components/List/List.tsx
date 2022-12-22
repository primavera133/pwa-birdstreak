import { format } from "date-fns";
import { useBirdStreakStore } from "../../hooks/useBirdStreakStore";
import { ListItem } from "../../types";

export const List = () => {
  const list = useBirdStreakStore((state) => state.list);
  return (
    <ul className="List">
      {list &&
        list.map(({ name, date }: ListItem) => (
          <li key={name} className="list-item">
            <div className="list-date">
              {format(date, "yyyy-mm-dd")}, {format(date, "HH:mm:ss")}
            </div>
            <div className="list-name">{name}</div>
          </li>
        ))}
    </ul>
  );
};
