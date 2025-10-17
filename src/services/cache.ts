import { environment } from "../environments/environment";

interface CacheItem<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

export class CacheService {
  private cache = new Map<string, CacheItem<any>>();
  private readonly cacheDuration: number;
  private readonly maxCacheSize: number;
  private readonly cacheEnable: boolean;

  constructor(config?: {
    duration?: number;
    maxSize?: number;
    enable?: boolean;
  }) {
    this.cacheDuration = config?.duration ?? Number(environment.cache.duration ?? 300000);
    this.maxCacheSize = config?.maxSize ?? Number(environment.cache.maxSize ?? 100);
    this.cacheEnable = config?.enable ?? (environment.cache.enable);
  }

  get<T>(key: string): T | null {
    if (!this.cacheEnable) return null;

    const item = this.cache.get(key);
    if (!item) return null;

    const now = Date.now();
    if (now > item.expiresAt) {
      this.cache.delete(key);
      return null;
    }

    // Refresca LRU (lo elimina y vuelve a insertar al final)
    this.cache.delete(key);
    this.cache.set(key, item);

    return item.data as T;
  }

  set<T>(key: string, data: T, customDuration?: number): void {
    if (!this.cacheEnable) return;

    if (this.cache.size >= this.maxCacheSize) {
      // Borra el primer elemento (LRU simple)
      const firstKey = this.cache.keys().next().value;
      if (firstKey) this.cache.delete(firstKey);
    }

    const now = Date.now();
    const duration = customDuration ?? this.cacheDuration;

    this.cache.set(key, {
      data,
      timestamp: now,
      expiresAt: now + duration,
    });
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }

  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  deletePattern(pattern: RegExp): number {
    let deleted = 0;

    for (const key of this.cache.keys()) {
      if (pattern.test(key)) {
        this.cache.delete(key);
        deleted++;
      }
    }

    return deleted;
  }

  clear(): void {
    this.cache.clear();
  }

  clearExpired(): number {
    const now = Date.now();
    let cleared = 0;

    for (const [key, item] of this.cache.entries()) {
      if (now > item.expiresAt) {
        this.cache.delete(key);
        cleared++;
      }
    }

    return cleared;
  }

  getStats() {
    return {
      size: this.cache.size,
      maxSize: this.maxCacheSize,
      enabled: this.cacheEnable,
      duration: this.cacheDuration,
    };
  }

  generateKey(endpoint: string, params?: Record<string, any>): string {
    if (!params || Object.keys(params).length === 0) return endpoint;

    const sortedParams = Object.keys(params)
      .sort()
      .map((key) => `${key}=${params[key]}`)
      .join("&");

    return `${endpoint}?${sortedParams}`;
  }
}
