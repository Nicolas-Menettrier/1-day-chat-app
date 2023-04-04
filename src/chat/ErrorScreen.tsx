import React from 'react';

const ErrorScreen: React.FC = () => (
  <div className="flex h-screen w-full items-center justify-center">
    <p className="text-2xl font-semibold text-red-600">
      Error: Something went wrong, please try again later.
    </p>
  </div>
);

export default ErrorScreen;
