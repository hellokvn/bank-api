/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export interface DepositFundsRequest {
  id: string;
  amount: number;
}

export interface DepositFundsResponse {
  status: number;
  error: string[];
}

export interface WithdrawFundsRequest {
  id: string;
  amount: number;
}

export interface WithdrawFundsResponse {
  status: number;
  error: string[];
}

export interface TransferFundsRequest {
  fromId: string;
  toId: string;
  amount: number;
}

export interface TransferFundsResponse {
  status: number;
  error: string[];
}

export const FUNDS_COMMAND_PACKAGE_NAME = "funds_command";

export interface FundsCommandServiceClient {
  depositFunds(request: DepositFundsRequest): Observable<DepositFundsResponse>;

  withdrawFunds(request: WithdrawFundsRequest): Observable<WithdrawFundsResponse>;

  transferFunds(request: TransferFundsRequest): Observable<TransferFundsResponse>;
}

export interface FundsCommandServiceController {
  depositFunds(
    request: DepositFundsRequest,
  ): Promise<DepositFundsResponse> | Observable<DepositFundsResponse> | DepositFundsResponse;

  withdrawFunds(
    request: WithdrawFundsRequest,
  ): Promise<WithdrawFundsResponse> | Observable<WithdrawFundsResponse> | WithdrawFundsResponse;

  transferFunds(
    request: TransferFundsRequest,
  ): Promise<TransferFundsResponse> | Observable<TransferFundsResponse> | TransferFundsResponse;
}

export function FundsCommandServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["depositFunds", "withdrawFunds", "transferFunds"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("FundsCommandService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("FundsCommandService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const FUNDS_COMMAND_SERVICE_NAME = "FundsCommandService";
