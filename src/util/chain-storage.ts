import { nanoid } from 'nanoid';
import { CipherMode, Operation, Options } from './store';
import { encipherOps, decipherOps } from './operations';

type SerializedOperation = {
  slug: string;
  options?: Options;
};

type SerializedChain = {
  version: 1;
  mode: CipherMode;
  operations: SerializedOperation[];
};

export function serializeChain(mode: CipherMode, operations: Operation[]): string {
  const chain: SerializedChain = {
    version: 1,
    mode,
    operations: operations.map((op) => ({
      slug: op.slug,
      options: op.options,
    })),
  };
  return JSON.stringify(chain, null, 2);
}

export function deserializeChain(json: string): { mode: CipherMode; operations: Operation[] } {
  const chain = JSON.parse(json) as SerializedChain;

  if (chain.version !== 1) {
    throw new Error('Unsupported chain file version');
  }

  const availableOps = chain.mode === 'encipher' ? encipherOps : decipherOps;

  const operations = chain.operations.map((serialized) => {
    const template = availableOps.find((op) => op.slug === serialized.slug);
    if (!template) {
      throw new Error(`Unknown operation: ${serialized.slug}`);
    }

    // Clone the operation with a new id and the saved options
    return {
      ...template,
      id: nanoid(),
      options: serialized.options ?? template.options,
    };
  });

  return { mode: chain.mode, operations };
}

export function saveChainToFile(mode: CipherMode, operations: Operation[]) {
  const json = serializeChain(mode, operations);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'cipher-chain.json';
  a.click();

  URL.revokeObjectURL(url);
}

export function loadChainFromFile(): Promise<{ mode: CipherMode; operations: Operation[] }> {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json,application/json';

    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) {
        reject(new Error('No file selected'));
        return;
      }

      try {
        const text = await file.text();
        const result = deserializeChain(text);
        resolve(result);
      } catch (err) {
        reject(err);
      }
    };

    input.click();
  });
}
