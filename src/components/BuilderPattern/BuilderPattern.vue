<template>
  <div>
    <h2>1. 생성: 빌더 (Builder) 패턴</h2>
    <p>PC 견적 만들기</p>

    <div classs="options">
      <div>
        <label>CPU:</label>
        <select v-model="selectedCpu">
          <option value="Intel i7">Intel i7</option>
          <option value="Ryzen 7">Ryzen 7</option>
        </select>
      </div>
      <div>
        <label>RAM:</label>
        <select v-model="selectedRam">
          <option value="16GB">16GB</option>
          <option value="32GB">32GB</option>
        </select>
      </div>
      <div>
        <label>Storage:</label>
        <select v-model="selectedStorage">
          <option value="1TB SSD">1TB SSD</option>
          <option value="2TB SSD">2TB SSD</option>
        </select>
      </div>
    </div>

    <button @click="buildComputer">견적 생성</button>

    <div v-if="computerSpec" class="result-box">
      <h3>완성된 견적:</h3>
      <pre>{{ computerSpec }}</pre>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

class Computer {
  public cpu: string | null = null;
  public ram: string | null = null;
  public storage: string | null = null;

  public getSpec(): string {
    return `CPU: ${this.cpu}\nRAM: ${this.ram}\nStorage: ${this.storage}`;
  }
}

interface IBuilder {
  setCPU(cpu: string): this;
  setRAM(ram: string): this;
  setStorage(storage: string): this;
  build(): Computer;
}

class ComputerBuilder implements IBuilder {
  private computer: Computer;

  constructor() {
    this.computer = new Computer();
  }

  setCPU(cpu: string): this {
    this.computer.cpu = cpu;
    return this;
  }
  setRAM(ram: string): this {
    this.computer.ram = ram;
    return this;
  }
  setStorage(storage: string): this {
    this.computer.storage = storage;
    return this;
  }
  build(): Computer {
    const result = this.computer;
    this.computer = new Computer();
    return result;
  }
}

const builder = new ComputerBuilder();
const selectedCpu = ref('Intel i7');
const selectedRam = ref('16GB');
const selectedStorage = ref('1TB SSD');
const computerSpec = ref('');

const buildComputer = () => {
  const computer = builder
      .setCPU(selectedCpu.value)
      .setRAM(selectedRam.value)
      .setStorage(selectedStorage.value)
      .build();

  computerSpec.value = computer.getSpec();
};

buildComputer();
</script>

<style scoped>
.result-box {
  border: 1px solid #ccc;
  padding: 10px;
  margin-top: 15px;
  background-color: #f9f9f9;
}
.options div {
  margin-bottom: 10px;
}
label {
  display: inline-block;
  width: 80px;
}
button {
  margin-top: 10px;
}
</style>