<template>
  <div>
    <h2>3. 행위: 전략 (Strategy) 패턴</h2>
    <p>결제 방식(전략) 동적 교체하기</p>

    <div>
      결제 금액: <input v-model.number="amount" type="number" />
    </div>
    <div>
      <label><input type="radio" v-model="selectedStrategy" value="card" @change="setStrategy" /> 신용카드</label>
      <label><input type="radio" v-model="selectedStrategy" value="paypal" @change="setStrategy" /> 페이팔</label>
    </div>
    <button @click="handlePayment">결제하기</button>
    <p class="result-box"><strong>결제 결과:</strong> {{ result }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { PaymentContext, CreditCardStrategy, PaypalStrategy } from './strategy';

const cardStrategy = new CreditCardStrategy();
const paypalStrategy = new PaypalStrategy();

const paymentContext = ref(new PaymentContext(cardStrategy));

const amount = ref(10000);
const selectedStrategy = ref('card');
const result = ref('');

const setStrategy = () => {
  if (selectedStrategy.value === 'card') {
    paymentContext.value.setStrategy(cardStrategy);
  } else if (selectedStrategy.value === 'paypal') {
    paymentContext.value.setStrategy(paypalStrategy);
  }
};

const handlePayment = () => {
  result.value = paymentContext.value.executePayment(amount.value);
};
</script>

<style scoped>
.result-box {
  border: 1px solid #ccc;
  padding: 10px;
  margin-top: 15px;
  background-color: #f9f9f9;
}
div {
  margin-bottom: 10px;
}
label {
  margin-right: 15px;
}
</style>