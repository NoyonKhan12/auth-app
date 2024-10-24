<template>
    <div class="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 class="text-2xl font-bold mb-6">Login</h2>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label class="block mb-2">Email</label>
          <input
            v-model="form.email"
            type="email"
            required
            class="w-full p-2 border rounded"
          />
        </div>
        <div class="mb-6">
          <label class="block mb-2">Password</label>
          <input
            v-model="form.password"
            type="password"
            required
            class="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          class="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import axios from 'axios';
  import router from '@/router';
  
  export default defineComponent({
    name: 'LoginForm',
    setup() {
      const form = ref({
        email: '',
        password: '',
      });
  
      const handleSubmit = async () => {
        try {
          const response = await axios.post('http://localhost:3000/api/auth/login', form.value);
          localStorage.setItem('accessToken', response.data.accessToken);
          router.push('/dashboard');
        } catch (error) {
          alert('Login failed. Please check your credentials.', error);
        }
      };
  
      return {
        form,
        handleSubmit,
      };
    },
  });
  </script>