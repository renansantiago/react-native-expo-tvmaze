import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="show/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="episode/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="person/[id]" options={{ headerShown: false }} />
      </Stack>
    </QueryClientProvider>
  );
}
