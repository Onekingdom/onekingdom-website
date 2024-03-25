import React from "react";

export default function notfound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-red-500">404 Page Not Found</h1>
      <img src="https://i.imgflip.com/271pud.jpg" alt="Funny 404 Image" className="mt-8" />
      <p className="mt-4 text-lg text-gray-600">Oops, looks like you took a wrong turn!</p>
    </div>
  );
}
