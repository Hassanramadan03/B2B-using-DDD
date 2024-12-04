import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { redisStore } from "cache-manager-redis-yet";
import { CacheModule, CacheStore } from "@nestjs/cache-manager";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { CacheService } from "./cache.service";
@Module({
  imports: [
    ConfigModule,
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const store = await redisStore({
          socket: {
            host: "redis",
            port: parseInt(configService.get("REDIS_PORT")),
          },
        });

        return {
          store: store as unknown as CacheStore,
          ttl: 30000000, // 3 minutes (milliseconds)
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [CacheService],
  exports: [CacheModule, CacheService],
})
export class SharedCacheModule {}
