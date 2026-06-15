import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDatabase } from './db.js';
import Project from './models/Project.js';
import { defaultProjects } from './data/defaultProjects.js';

const connected = await connectDatabase();

if (!connected) {
  console.log('Set MONGODB_URI to seed MongoDB. Local fallback data is already available.');
  process.exit(0);
}

await Project.deleteMany({});
await Project.insertMany(defaultProjects);
await mongoose.disconnect();

console.log('Seeded portfolio projects.');
