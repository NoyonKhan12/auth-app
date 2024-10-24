<template>
  <div class="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-6">Sign Up</h2>
    
    <div v-if="error" class="mb-4 p-4 bg-red-50 border border-red-200 text-red-800 rounded-md">
      {{ error }}
    </div>

    <div v-if="successMessage" class="mb-4 p-4 bg-green-50 border border-green-200 text-green-800 rounded-md">
      {{ successMessage }}
    </div>

    <form @submit.prevent="handleSubmit" v-if="!activationLink">
      <div class="mb-4">
        <label class="block mb-2 text-sm font-medium text-gray-700">Email</label>
        <input
          v-model="form.email"
          type="email"
          required
          class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          :class="{ 'border-red-500': formErrors.email }"
        />
        <span v-if="formErrors.email" class="text-sm text-red-500">{{ formErrors.email }}</span>
      </div>

      <div class="mb-4">
        <label class="block mb-2 text-sm font-medium text-gray-700">First Name</label>
        <input
          v-model="form.firstName"
          type="text"
          required
          class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          :class="{ 'border-red-500': formErrors.firstName }"
        />
        <span v-if="formErrors.firstName" class="text-sm text-red-500">{{ formErrors.firstName }}</span>
      </div>

      <div class="mb-4">
        <label class="block mb-2 text-sm font-medium text-gray-700">Last Name</label>
        <input
          v-model="form.lastName"
          type="text"
          required
          class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          :class="{ 'border-red-500': formErrors.lastName }"
        />
        <span v-if="formErrors.lastName" class="text-sm text-red-500">{{ formErrors.lastName }}</span>
      </div>

      <div class="mb-4">
        <label class="block mb-2 text-sm font-medium text-gray-700">Mobile Number</label>
        <input
          v-model="form.mobileNumber"
          type="tel"
          required
          class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          :class="{ 'border-red-500': formErrors.mobileNumber }"
        />
        <span v-if="formErrors.mobileNumber" class="text-sm text-red-500">{{ formErrors.mobileNumber }}</span>
      </div>

      <div class="mb-6">
        <label class="block mb-2 text-sm font-medium text-gray-700">Password</label>
        <div class="relative">
          <input
            v-model="form.password"
            :type="showPassword ? 'text' : 'password'"
            required
            class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            :class="{ 'border-red-500': formErrors.password }"
          />
          <button
            type="button"
            @click="togglePassword"
            class="absolute inset-y-0 right-0 px-3 flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-gray-500"
              :class="{ 'hidden': showPassword }"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-gray-500"
              :class="{ 'hidden': !showPassword }"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clip-rule="evenodd" />
              <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
            </svg>
          </button>
        </div>
        <span v-if="formErrors.password" class="text-sm text-red-500">{{ formErrors.password }}</span>
      </div>

      <button
        type="submit"
        :disabled="isLoading"
        class="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {{ isLoading ? 'Signing up...' : 'Sign Up' }}
      </button>
    </form>

    <div v-if="activationLink" class="mt-4">
      <div class="p-4 bg-blue-50 border border-blue-200 text-blue-800 rounded-md">
        <p class="mb-4">Please click the button below to activate your account:</p>
        <button
          @click="handleActivation"
          :disabled="isActivating"
          class="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ isActivating ? 'Activating...' : 'Activate Account' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const url = import.meta.env.VITE_API_URL || 'http://localhost:3000'; 


interface SignupForm {
  email: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  password: string;
}

export default defineComponent({
  name: 'SignupForm',
  setup() {
    const router = useRouter();
    const form = reactive<SignupForm>({
      email: '',
      firstName: '',
      lastName: '',
      mobileNumber: '',
      password: '',
    });

    const formErrors = reactive({
      email: '',
      firstName: '',
      lastName: '',
      mobileNumber: '',
      password: '',
    });

    const isLoading = ref(false);
    const isActivating = ref(false);
    const error = ref('');
    const successMessage = ref('');
    const activationLink = ref('');
    const showPassword = ref(false);

    const validateForm = () => {
      let isValid = true;
      Object.keys(formErrors).forEach(key => formErrors[key as keyof typeof formErrors] = '');

      if (!form.email) {
        formErrors.email = 'Email is required';
        isValid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        formErrors.email = 'Please enter a valid email';
        isValid = false;
      }

      if (!form.password) {
        formErrors.password = 'Password is required';
        isValid = false;
      } else if (form.password.length < 6) {
        formErrors.password = 'Password must be at least 6 characters';
        isValid = false;
      }

      if (!form.firstName.trim()) {
        formErrors.firstName = 'First name is required';
        isValid = false;
      }

      if (!form.lastName.trim()) {
        formErrors.lastName = 'Last name is required';
        isValid = false;
      }

      if (!form.mobileNumber) {
        formErrors.mobileNumber = 'Mobile number is required';
        isValid = false;
      } else if (!/^(?:\+8801|01)[3-9]\d{8}$/.test(form.mobileNumber)) {
        formErrors.mobileNumber = 'Please enter a valid mobile number';
        isValid = false;
      }

      return isValid;
    };

    const handleSubmit = async () => {
      if (!validateForm()) return;

      isLoading.value = true;
      error.value = '';
      successMessage.value = '';

      try {
        const response = await axios.post(`${url}/api/auth/register`, form);
        activationLink.value = response.data.activationLink;
        
        if (activationLink.value) {
          successMessage.value = 'Registration successful! Please activate your account.';
        } else {
          throw new Error('No activation token received');
        }
      } catch (err: string) {
        error.value = err.response?.data?.message || 'Registration failed. Please try again.';
        console.error('Signup error:', err);
      } finally {
        isLoading.value = false;
      }
    };

    const handleActivation = async () => {
      if (!activationLink.value) {
        error.value = 'Activation token is missing';
        return;
      }

      isActivating.value = true;
      error.value = '';

      try {
        await axios.post(activationLink.value);
        successMessage.value = 'Account activated successfully! You can now login.';
        activationLink.value = ''; 
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } catch (err: string) {
        error.value = err.response?.data?.message || 'Activation failed. Please try again.';
        console.error('Activation error:', err);
      } finally {
        isActivating.value = false;
      }
    };

    const togglePassword = () => {
      showPassword.value = !showPassword.value;
    };

    return {
      form,
      formErrors,
      error,
      successMessage,
      isLoading,
      isActivating,
      activationLink,
      handleSubmit,
      handleActivation,
      showPassword,
      togglePassword,
    };
  },
});
</script>