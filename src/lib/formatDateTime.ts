export function formatDateTime(dateString: Date) {
  return {
    day: new Date(dateString).toLocaleDateString('es', {
      day: '2-digit',
    }),
    month: new Date(dateString).toLocaleDateString('es', {
      month: 'short',
    }),
    date: new Date(dateString).toLocaleDateString('es', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    }),
    time: new Date(dateString).toLocaleTimeString('es', {
      minute: '2-digit',
      hour: 'numeric',
      hour12: true,
    }),

    isToday: new Date(dateString).toDateString() === new Date().toDateString(),
  };
}
