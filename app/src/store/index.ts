import { reactive, watch, watchEffect } from "vue";
import Vote from "../models/Vote";
import Task from "../models/Task";
import { instanceToPlain, plainToInstance, Type } from "class-transformer";
import "reflect-metadata";

export class State {
  @Type(() => Task)
  tasks = new Array<Task>();
  @Type(() => String)
  highlightedIds = new Array<String>();
  @Type(() => Vote)
  votes: { [key: string]: Vote[] } = {};
};

const THESTORE = "THESTORE";
let storeLoaded = false;
const theStore = reactive({
  state: {
    tasks: new Array<Task>(),
    highlightedIds: [],
    votes: {},
  } as State,
  clear() {
    this.state.tasks.length = 0;
    Object.keys(this.state.votes).forEach(
      (key) => delete this.state.votes[key]
    );
  },
  createDefault() {
    this.clear();
    const sample = [
      "First", "Second", "Third", "Fourth", "Fifth"
    ];
    for (let x = 0; x < 5; ++x) {
      this.add(sample[x]);
    }
  },
  createVotes(task: Task) {
    const pos = this.state.tasks.indexOf(task);
    const newVotes = new Array<Vote>();
    for (let x = 0; x < pos; ++x) {
      newVotes.push(new Vote(this.state.tasks[x].id, task.id));
    }
    this.state.votes[task.id.toString()] = newVotes;
  },
  move(item: Task, direction: number) {
    const taskIndex = this.state.tasks.indexOf(item);
    if (taskIndex >= 0) {
      const newIndex = taskIndex + direction;
      const oldTask = this.state.tasks[newIndex];
      const itemId = item.id;
      this.state.tasks[newIndex] = item;
      this.state.tasks[taskIndex] = oldTask;
      this.createVotes(item);
      this.createVotes(oldTask);
    }
  },
  refreshVotes() {
    this.state.tasks.forEach(t => this.createVotes(t));
  },
  remove(item: Task) {
    this.state.tasks.splice(this.state.tasks.indexOf(item), 1);
    delete this.state.votes[item.id];
    this.refreshVotes();
  },
  add(taskName: string = "") {
    const ids = this.state.tasks.map((i) => i.id);
    const lastItem = ids.length > 0 ? Math.max(...ids.map(i => Number(i))) : 0;
    const newTask = new Task((lastItem ? lastItem + 1 : 1).toString());
    newTask.title = taskName;
    this.state.tasks.push(newTask);
    this.createVotes(newTask);
  },
  replace(rows: string[] | null = null) {
    if (rows) {
      this.clear();
      for (let row of rows) {
        if (row) this.add(row);
      }
    }
  },
  isHighlighted(id: String) {
    const index = this.state.highlightedIds.indexOf(id);
    return index !== -1;
  },
});

watch(
  () => theStore,
  () => {
    localStorage.setItem(THESTORE, JSON.stringify(instanceToPlain(theStore.state)));
  },
  { deep: true }
);

let isLoading = false;

export function getStore() {
  const testing = false;
  if (!storeLoaded) {
    const json = localStorage.getItem(THESTORE);
    if (json && json.length > 0 && !testing) {
      // Load from Local Storage
      const stored = JSON.parse(json);
      const state = plainToInstance(State, stored);
      theStore.state = state;
    } else {
      // Load default
      theStore.createDefault();
    }
  }
  //theStore.refreshVotes();
  storeLoaded = true;
  return theStore;
}
