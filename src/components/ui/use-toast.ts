// Simple toast implementation
export const toast = (options: { title?: string; description?: string; variant?: string; icon?: React.ReactNode }) => {
  console.log(`Toast: ${options.title} - ${options.description}`);
  // In a real implementation, this would show a toast notification
  alert(`${options.title}: ${options.description}`);
};