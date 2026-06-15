import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { randomUUID } from 'crypto';
import { defaultProjects } from '../data/defaultProjects.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataFile = path.join(__dirname, '..', 'data', 'projects.local.json');

async function ensureDataFile() {
  try {
    await fs.access(dataFile);
  } catch {
    await fs.mkdir(path.dirname(dataFile), { recursive: true });
    await fs.writeFile(dataFile, JSON.stringify(defaultProjects, null, 2));
  }
}

export async function getLocalProjects() {
  await ensureDataFile();
  const file = await fs.readFile(dataFile, 'utf8');
  return JSON.parse(file);
}

export async function addLocalProject(project) {
  const projects = await getLocalProjects();
  const nextProject = {
    ...project,
    id: randomUUID(),
    createdAt: new Date().toISOString()
  };

  projects.unshift(nextProject);
  await fs.writeFile(dataFile, JSON.stringify(projects, null, 2));
  return nextProject;
}
