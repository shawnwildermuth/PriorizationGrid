import Task from "./Task";
import { State, getStore } from "../store";

export default class Vote {
  constructor(public firstId: string, public secondId: string) {}

  choice: Boolean | null = null;

}
