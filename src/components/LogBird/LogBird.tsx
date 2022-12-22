import { Content } from "../Content";
import { Deadline } from "../Deadline";
import { List } from "../List";
import { LogForm } from "../LogForm";

export const LogBird = () => {
  return (
    <Content>
      <h2>Log next bird</h2>
      <Deadline />
      <LogForm />
      <List />
    </Content>
  );
};
