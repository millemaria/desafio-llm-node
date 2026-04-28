import fs from "fs";
import path from "path";

export interface Task {
  id: number;
  text: string;
  summary: string | null;
  lang: string;
}

const DATA_DIR = path.resolve(__dirname, "../../data");
const DATA_FILE = path.join(DATA_DIR, "tasks.json");

export class TasksRepository {
  private tasks: Task[] = [];
  private currentId: number = 1;

  constructor() {
    this.loadFromFile();
  }

  /**
   * Carrega as tarefas do arquivo JSON.
   * Cria o diretório e o arquivo caso não existam.
   */
  private loadFromFile(): void {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }

      if (fs.existsSync(DATA_FILE)) {
        const raw = fs.readFileSync(DATA_FILE, "utf-8");
        this.tasks = JSON.parse(raw);

        // Define o próximo ID com base no maior ID existente
        if (this.tasks.length > 0) {
          this.currentId =
            Math.max(...this.tasks.map((t) => t.id)) + 1;
        }
      } else {
        this.saveToFile();
      }
    } catch {
      this.tasks = [];
      this.saveToFile();
    }
  }

  /**
   * Salva as tarefas no arquivo JSON.
   */
  private saveToFile(): void {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(this.tasks, null, 2), "utf-8");
  }

  createTask(text: string, lang: string): Task {
    const task: Task = {
      id: this.currentId++,
      text,
      summary: null,
      lang,
    };
    this.tasks.push(task);
    this.saveToFile();
    return task;
  }

  updateTask(id: number, summary: string): Task | null {
    const taskIndex = this.tasks.findIndex((t) => t.id === id);
    if (taskIndex > -1) {
      this.tasks[taskIndex].summary = summary;
      this.saveToFile();
      return this.tasks[taskIndex];
    }
    return null;
  }

  getTaskById(id: number): Task | null {
    return this.tasks.find((t) => t.id === id) || null;
  }

  getAllTasks(): Task[] {
    return this.tasks;
  }

  deleteTask(id: number): boolean {
    const taskIndex = this.tasks.findIndex((t) => t.id === id);
    if (taskIndex > -1) {
      this.tasks.splice(taskIndex, 1);
      this.saveToFile();
      return true;
    }
    return false;
  }
}