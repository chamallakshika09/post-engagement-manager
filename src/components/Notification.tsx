const Notification = ({ message, type }: { message: string; type: 'success' | 'error' }) => {
  const notificationClass =
    type === 'success' ? 'bg-green-100 border-green-400 text-green-700' : 'bg-red-100 border-red-400 text-red-700';

  return (
    <div className={`border-l-4 p-4 fixed bottom-4 right-4 z-50 ${notificationClass}`} role="alert">
      <p className="font-bold">{type === 'success' ? 'Success' : 'Error'}</p>
      <p>{message}</p>
    </div>
  );
};

export default Notification;
