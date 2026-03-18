import fs from "fs";

const FILE_PATH = "./memory.json";

export function getMemory(): string[] {
  if (!fs.existsSync(FILE_PATH)) return [];

  const data = fs.readFileSync(FILE_PATH, "utf-8");
  return JSON.parse(data);
}

export function saveMemory(titles: string[]) {
  fs.writeFileSync(FILE_PATH, JSON.stringify(titles, null, 2));
}