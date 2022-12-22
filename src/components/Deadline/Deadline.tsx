import format from "date-fns/format";
import { useBirdStreakStore } from "../../hooks/useBirdStreakStore";

export const Deadline = () => {
  const { deadline } = useBirdStreakStore.getState();

  return deadline ? <h3>Deadline: {format(deadline, "yyyy-mm-dd")}</h3> : null;
};
