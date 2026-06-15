import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    techStack: {
      type: [String],
      default: []
    },
    imageUrl: {
      type: String,
      default: ''
    },
    liveUrl: {
      type: String,
      default: ''
    },
    repoUrl: {
      type: String,
      default: ''
    },
    featured: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export default mongoose.models.Project || mongoose.model('Project', projectSchema);
