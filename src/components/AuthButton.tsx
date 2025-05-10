"use client";

export function AuthButton() {
  const handleLogin = () => {
    window.location.href = "/auth/login"; // Redirección a Auth0 Universal Login
  };

  return (
    <button
      onClick={handleLogin}
      className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition"
    >
      Iniciar sesión
    </button>
  );
}
