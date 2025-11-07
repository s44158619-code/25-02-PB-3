<template>
  <div>
    <h2>2. 구조: 퍼사드 (Facade) 패턴</h2>
    <p>복잡한 API 호출을 단순한 메서드로 감싸기</p>

    <button @click="loadUser">유저 프로필 불러오기</button>
    <p>(F12 콘솔 창에서 내부 동작 확인)</p>

    <div v-if="userProfile" class="result-box">
      <h3>불러온 결과 (UI):</h3>
      <pre>{{ userProfile }}</pre>
      <p><strong>상태:</strong> {{ status }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

class AuthService {
  getToken(): string {
    console.log("1. [Auth] 인증 토큰 가져오기");
    return "FAKE_TOKEN";
  }
}

class ApiService {
  fetchUserData(token: string, userId: number): object {
    console.log(`2. [API] 서버에서 유저(${userId}) 데이터 요청`);
    return { name: "성윤오", id: userId, dept: "컴퓨터인공지능학부" };
  }
}

class CacheService {
  save(key: string, data: object) {
    console.log(`3. [Cache] ${key}로 캐시 저장`);
    localStorage.setItem(key, JSON.stringify(data));
  }
}

class UserFacade {
  private auth: AuthService;
  private api: ApiService;
  private cache: CacheService;

  constructor() {
    this.auth = new AuthService();
    this.api = new ApiService();
    this.cache = new CacheService();
  }

  public async getUserProfile(userId: number): Promise<object> {
    console.log("--- 퍼사드 메서드 호출됨 ---");
    try {
      const token = this.auth.getToken();
      const userData = this.api.fetchUserData(token, userId);
      this.cache.save(`user_${userId}`, userData);
      console.log("--- 퍼사드 작업 완료 ---");
      return userData;
    } catch (error) {
      console.error("퍼사드 에러:", error);
      throw error;
    }
  }
}

const facade = new UserFacade();
const userProfile = ref<object | null>(null);
const status = ref('대기 중');

const loadUser = async () => {
  status.value = "로딩 중...";
  userProfile.value = null;

  userProfile.value = await facade.getUserProfile(123);
  status.value = "로드 성공!";
};
</script>

<style scoped>
.result-box {
  border: 1px solid #ccc;
  padding: 10px;
  margin-top: 15px;
  background-color: #f9f9f9;
}
button {
  margin-top: 10px;
}
p {
  margin-top: 10px;
}
</style>