/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export interface AccountData {
  id: string;
  holder: string;
  isActive: boolean;
}

export interface FindAllAccountsResponseData {
  accounts: AccountData[];
  total: number;
  count: number;
  page: number;
}

export interface FindAllAccountsRequest {
  page: number;
}

export interface FindAllAccountsResponse {
  status: number;
  error: string[];
  data: FindAllAccountsResponseData | undefined;
}

export interface FindAccountRequest {
  id: string;
}

export interface FindAccountResponse {
  status: number;
  error: string[];
  data: AccountData | undefined;
}

export const ACCOUNT_QUERY_PACKAGE_NAME = "account_query";

export interface AccountQueryServiceClient {
  findAccount(request: FindAccountRequest): Observable<FindAccountResponse>;

  findAllAccounts(request: FindAllAccountsRequest): Observable<FindAllAccountsResponse>;
}

export interface AccountQueryServiceController {
  findAccount(
    request: FindAccountRequest,
  ): Promise<FindAccountResponse> | Observable<FindAccountResponse> | FindAccountResponse;

  findAllAccounts(
    request: FindAllAccountsRequest,
  ): Promise<FindAllAccountsResponse> | Observable<FindAllAccountsResponse> | FindAllAccountsResponse;
}

export function AccountQueryServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["findAccount", "findAllAccounts"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("AccountQueryService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("AccountQueryService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const ACCOUNT_QUERY_SERVICE_NAME = "AccountQueryService";
