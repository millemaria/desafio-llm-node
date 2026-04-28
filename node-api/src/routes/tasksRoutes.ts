import { Router, Request, Response } from "express";
import axios from "axios";
import { TasksRepository } from "../repositories/tasksRepository";

const router = Router();
const tasksRepository = new TasksRepository();

const SUPPORTED_LANGUAGES = ["pt", "en", "es"];

// POST: Cria uma tarefa e solicita resumo ao serviço Python
router.post("/", async (req: Request, res: Response) => {
  try {
    const { text, lang } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Campo "text" é obrigatório.' });
    }

    if (!lang) {
      return res.status(400).json({ error: 'Campo "lang" é obrigatório.' });
    }

    // Valida se o idioma é suportado
    if (!SUPPORTED_LANGUAGES.includes(lang)) {
      return res.status(400).json({ error: "Language not supported" });
    }

    // Cria a tarefa
    const task = tasksRepository.createTask(text, lang);

    // Solicita o resumo ao serviço Python
    const pythonUrl = process.env.PYTHON_LLM_URL || "http://localhost:8000";
    const response = await axios.post(`${pythonUrl}/summarize`, {
      text,
      lang,
    });

    const summary = response.data.summary;

    // Atualiza a tarefa com o resumo
    tasksRepository.updateTask(task.id, summary);

    return res.status(201).json({
      message: "Tarefa criada com sucesso!",
      task: tasksRepository.getTaskById(task.id),
    });
  } catch (error) {
    console.error("Erro ao criar tarefa:", error);
    return res
      .status(500)
      .json({ error: "Ocorreu um erro ao criar a tarefa." });
  }
});

// GET: Lista todas as tarefas
router.get("/", (req: Request, res: Response) => {
  const tasks = tasksRepository.getAllTasks();
  return res.json(tasks);
});

// GET: Retorna uma tarefa pelo ID
router.get("/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const task = tasksRepository.getTaskById(id);

  if (!task) {
    return res.status(404).json({ error: "Tarefa não encontrada." });
  }

  return res.json({
    id: task.id,
    text: task.text,
    summary: task.summary,
    lang: task.lang,
  });
});

// DELETE: Remove uma tarefa pelo ID
router.delete("/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const deleted = tasksRepository.deleteTask(id);

  if (!deleted) {
    return res.status(404).json({ error: "Tarefa não encontrada." });
  }

  return res.status(204).send();
});

export default router;
