export class LocalStorageMock {
  private store: Record<string, string>;
  constructor() {
    this.store = {};
  }
  clear() {
    this.store = {};
  }
  getItem(key: string) {
    return this.store[key] || null;
  }
  setItem(key: string, value: string) {
    this.store[key] = String(value);
  }
  removeItem(key: string) {
    delete this.store[key];
  }
  key(index: number) {
    return null;
  }
  get length() {
    return Object.keys(this.store).length;
  }
}
