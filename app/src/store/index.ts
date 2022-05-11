import { reactive, watch, watchEffect } from 'vue';
import Vote from '../models/Vote';
import Task from '../models/Task';

type State = {
  tasks: Array<Task>,
  votes: { [key:string]: Vote[]}
};

const THESTORE = "THESTORE";
let storeLoaded = false;
const theStore = reactive({
  state: {
    tasks: new Array<Task>(),
    votes: { }
  } as State,
  clear() {
    this.state.tasks.length = 0;
    Object.keys(this.state.votes).forEach(key => delete this.state.votes[key]);
    for (let x = 0; x < 5; ++x) {
      this.add();
    }
  },
  createVotes (task: Task)  {
    const pos = task.id;
    const newVotes = new Array<Vote>();
    for (let x = 1; x < pos; ++x) newVotes.push(new Vote(task, this.state.tasks[x]));
    this.state.votes[task.id.toString()] = newVotes;
  },
  remove(item: Task) {
    this.state.tasks.splice(this.state.tasks.indexOf(item), 1);
    delete this.state.votes[item.id];
  },
  add() {
    const ids = this.state.tasks.map((i) => i.id);
    const lastItem = ids.length > 0 ? Math.max(...ids) : 0;
    const newTask = new Task(lastItem ? lastItem + 1 : 1);
    this.state.tasks.push(newTask);
    this.createVotes(newTask);
  }
});

watch(() => theStore, () => {
  localStorage.setItem(THESTORE, JSON.stringify(theStore.state));
}, { deep: true})

export function getStore() {
  const testing = true;
  if (!storeLoaded) {
    const json = localStorage.getItem(THESTORE);
    if (json && json.length > 0 && !testing)
    {
      // Load from Local Storage
      const stored = JSON.parse(json);
      theStore.state  = stored;
    } else {
      // Load default
      theStore.clear();
    }
  }
  storeLoaded = true;
  return theStore;
}
