import { ChildProcess, exec } from 'child_process';
import { readFileSync, unlinkSync, writeFileSync } from 'fs';

export function removeFiles(appPath: string): void {
  unlinkSync(`${appPath}/.eslintrc.js`);
  unlinkSync(`${appPath}/.prettierrc`);
}

export function editTSConfigJson(appPath: string, tsConfig: any): void {
  writeFileSync(`${appPath}/tsconfig.json`, JSON.stringify(tsConfig, null, 2), 'utf8');
}

export function editPackageJson(appPath: string, dependencies: any): void {
  const packageJsonPath = `${appPath}/package.json`;
  const data = readFileSync(packageJsonPath, 'utf8');
  const parsedData = JSON.parse(data);

  parsedData.name = `@bank/${appPath.replace(/\//g, '-').replace('services-', '')}`;
  parsedData.version = '1.0.0';
  parsedData.private = true;
  parsedData.dependencies = dependencies;

  delete parsedData.author;
  delete parsedData.devDependencies;

  writeFileSync(packageJsonPath, JSON.stringify(parsedData, null, 2), 'utf8');
}

export function getRootTSConfigPath(depth: number): string {
  let prePath = '';

  for (let index = 0; index < depth + 1; index++) {
    prePath += '../';
  }

  return `${prePath}tsconfig.json`;
}

export function cmd(command: string): ChildProcess {
  return exec(command, (error, stdout, stderr) => {
    if (error) {
      throw new Error(`Exec Error: ${error.message}`);
    } else if (stderr) {
      throw new Error(`Stderr Error: ${stderr}`);
    }

    console.log(stdout);
  });
}
