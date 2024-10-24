<template>
    <div class="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h1 class="text-3xl font-bold mb-4">Welcome to Dashboard</h1>
      <p class="text-gray-600">
        This is a random text to show that you've successfully logged in.
        
      </p>
      <button
        @click="logout"
        class="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import router from '@/router';
  
  export default defineComponent({
    name: 'DashboardPage',
    setup() {
      const logout = () => {
        localStorage.removeItem('accessToken');
        router.push('/login');
      };
  
      return {
        logout,
      };
    },
  });
  </script>