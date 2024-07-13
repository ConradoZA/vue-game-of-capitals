import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useTheme } from 'vuetify';

export default defineStore('general', () => {
  const loading = ref<boolean>(false);

  const setLoading = (display: boolean): void => {
    loading.value = display;
  };

  const message = ref<string>('');

  function setMessage(msg = ''): void {
    message.value = msg;
  }

  const theme = useTheme();

  const toggleTheme = () =>
    (theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark');

  return { loading, message, setLoading, setMessage, theme, toggleTheme };
});
