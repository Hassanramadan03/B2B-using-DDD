import { Injectable, Inject } from "@nestjs/common";
import { CACHE_MANAGER, CacheStore } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";
import { ConfigService } from "@nestjs/config";
@Injectable()
export class CacheService {
  private readonly defaultTTL; // Default TTL in seconds
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private configService: ConfigService
  ) {
    this.defaultTTL = this.configService.get<number>("CACHE_TTL");
  }
  async set<T>(key: string, value: T, ttl?: number) {
    await this.cacheManager.set(key, value, ttl || this.defaultTTL);
  }

  async get<T>(key: string): Promise<T | undefined> {
    return this.cacheManager.get<T>(key);
  }
}
