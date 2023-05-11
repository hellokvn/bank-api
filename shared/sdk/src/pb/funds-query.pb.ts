/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export interface GetBalanceRequest {
  id: string;
}

export interface GetBalanceResponse {
  status: number;
  error: string[];
  data: number;
}

export const FUNDS_QUERY_PACKAGE_NAME = "funds_query";

export interface FundsQueryServiceClient {
  getBalance(request: GetBalanceRequest): Observable<GetBalanceResponse>;
}

export interface FundsQueryServiceController {
  getBalance(
    request: GetBalanceRequest,
  ): Promise<GetBalanceResponse> | Observable<GetBalanceResponse> | GetBalanceResponse;
}

export function FundsQueryServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["getBalance"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("FundsQueryService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("FundsQueryService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const FUNDS_QUERY_SERVICE_NAME = "FundsQueryService";
