import { spawn } from 'child_process';

const commands = [
  { name: 'server', command: 'npm', args: ['run', 'server'] },
  { name: 'client', command: 'npm', args: ['run', 'client'] }
];

const children = commands.map(({ name, command, args }) => {
  const child = spawn(command, args, {
    shell: true,
    stdio: 'inherit',
    env: process.env
  });

  child.on('exit', (code) => {
    if (code && !shuttingDown) {
      console.error(`${name} exited with code ${code}`);
      shutdown(code);
    }
  });

  return child;
});

let shuttingDown = false;

function shutdown(code = 0) {
  shuttingDown = true;
  children.forEach((child) => {
    if (!child.killed) {
      child.kill();
    }
  });
  process.exit(code);
}

process.on('SIGINT', () => shutdown(0));
process.on('SIGTERM', () => shutdown(0));
