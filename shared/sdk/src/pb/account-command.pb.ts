/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export interface OpenAccountRequest {
  holder: string;
  type: string;
  email: string;
  openingBalance: number;
}

export interface OpenAccountResponse {
  status: number;
  error: string[];
  data: string;
}

export interface CloseAccountRequest {
  id: string;
}

export interface CloseAccountResponse {
  status: number;
  error: string[];
}

export const ACCOUNT_COMMAND_PACKAGE_NAME = "account_command";

export interface AccountCommandServiceClient {
  openAccount(request: OpenAccountRequest): Observable<OpenAccountResponse>;

  closeAccount(request: CloseAccountRequest): Observable<CloseAccountResponse>;
}

export interface AccountCommandServiceController {
  openAccount(
    request: OpenAccountRequest,
  ): Promise<OpenAccountResponse> | Observable<OpenAccountResponse> | OpenAccountResponse;

  closeAccount(
    request: CloseAccountRequest,
  ): Promise<CloseAccountResponse> | Observable<CloseAccountResponse> | CloseAccountResponse;
}

export function AccountCommandServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["openAccount", "closeAccount"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("AccountCommandService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("AccountCommandService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const ACCOUNT_COMMAND_SERVICE_NAME = "AccountCommandService";
