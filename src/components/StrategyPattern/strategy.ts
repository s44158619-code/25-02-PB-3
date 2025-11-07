export interface IPaymentStrategy {
    pay(amount: number): string;
}

export class CreditCardStrategy implements IPaymentStrategy {
    pay(amount: number): string {
        return `[신용카드]로 ${amount}원을 결제했습니다.`;
    }
}

export class PaypalStrategy implements IPaymentStrategy {
    pay(amount: number): string {
        return `[페이팔]로 ${amount}원을 결제했습니다. (수수료 $1)`;
    }
}

export class PaymentContext {
    private strategy: IPaymentStrategy;

    constructor(strategy: IPaymentStrategy) {
        this.strategy = strategy;
    }

    setStrategy(strategy: IPaymentStrategy) {
        this.strategy = strategy;
    }

    executePayment(amount: number): string {
        return this.strategy.pay(amount);
    }
}