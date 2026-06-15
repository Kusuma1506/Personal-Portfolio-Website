import express from 'express';
import mongoose from 'mongoose';
import Project from '../models/Project.js';
import { addLocalProject, getLocalProjects } from '../storage/localProjectStore.js';

const router = express.Router();

function usesMongo() {
  return mongoose.connection.readyState === 1;
}

router.get('/', async (_req, res, next) => {
  try {
    const projects = usesMongo()
      ? await Project.find().sort({ featured: -1, createdAt: -1 })
      : await getLocalProjects();

    res.json(projects);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { title, category, description, techStack = [], imageUrl = '', liveUrl = '', repoUrl = '' } = req.body;

    if (!title || !category || !description) {
      return res.status(400).json({ message: 'Title, category, and description are required.' });
    }

    const projectInput = {
      title,
      category,
      description,
      techStack: Array.isArray(techStack) ? techStack : String(techStack).split(',').map((item) => item.trim()),
      imageUrl,
      liveUrl,
      repoUrl,
      featured: Boolean(req.body.featured)
    };

    const project = usesMongo()
      ? await Project.create(projectInput)
      : await addLocalProject(projectInput);

    res.status(201).json(project);
  } catch (error) {
    next(error);
  }
});

export default router;
