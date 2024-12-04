import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  BadGatewayException,
  CallHandler,
} from "@nestjs/common";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        console.log(err);
        // Customize the error response format here
        const errorMessage = {
          timestamp: new Date().toISOString(),
          path: context.switchToHttp().getRequest().url,
          error: "Bad Gateway" + err,
          message: err  || "Internal Server Error",
        };
        return throwError(() => new BadGatewayException(errorMessage));
      })
    );
  }
}
