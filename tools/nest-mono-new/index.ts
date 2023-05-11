// ts-node --project ./tools/tsconfig.json tools/nest-mono-new/index.ts funds
import { rmSync } from 'fs';
import { cmd, editPackageJson, editTSConfigJson, getRootTSConfigPath, removeFiles } from './helper';

const NEST_APPS = [`services/${process.argv[2]}/command`, `services/${process.argv[2]}/query`];
const TAG = '[Tooling/NestNew]';
const DEPTH = NEST_APPS[0].split('/').length - 1;

const TS_CONFIG = {
  extends: getRootTSConfigPath(DEPTH),
  compilerOptions: {
    baseUrl: './',
    outDir: './dist',
    paths: {
      '@app/*': ['./src/*'],
    },
  },
};

const DEPENDENCIES = {
  '@bank/sdk': 'workspace:*',
};

NEST_APPS.forEach((appPath) => {
  rmSync(appPath, { recursive: true, force: true });

  if (!appPath) {
    throw new Error(`${TAG} No Nest APP Path`);
  }

  cmd(`nest new ${appPath} --skip-git --skip-install --package-manager pnpm`).on('close', () => {
    editPackageJson(appPath, DEPENDENCIES);
    editTSConfigJson(appPath, TS_CONFIG);
    removeFiles(appPath);
    cmd(`pnpm install`);
  });
});
