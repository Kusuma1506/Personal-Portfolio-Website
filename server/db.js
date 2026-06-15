import mongoose from 'mongoose';

export async function connectDatabase() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.warn('MONGODB_URI is not set. Using local JSON project storage.');
    return false;
  }

  try {
    await mongoose.connect(uri);
    console.log('MongoDB connected');
    return true;
  } catch (error) {
    console.warn(`MongoDB unavailable: ${error.message}`);
    console.warn('Using local JSON project storage instead.');
    return false;
  }
}
