import { useState } from "react";
import { useNavigate } from "react-router";
import { authClient } from "../lib/auth-client";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isLogin) {
        const { data, error } = await authClient.signIn.email({
          email,
          password,
        });
        if (error) throw new Error(error.message);
      } else {
        // Registrarse
        const { data, error } = await authClient.signUp.email({
          email,
          password,
          name,
        });
        if (error) throw new Error(error.message);
      }

      // If the action is succesfull we return to the landing page
      navigate("/");
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-bg-alt px-4 py-12">
      <div className="w-full max-w-md bg-bg p-8 rounded-xl border border-border shadow-sm">
        <h1 className="font-display text-3xl mb-2 text-center">
          {isLogin ? "Welcome back" : "Create an account"}
        </h1>
        <p className="text-text-muted text-sm text-center mb-6">
          {isLogin
            ? "Log in to book your classes."
            : "Join PULSO Studio today."}
        </p>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {!isLogin && (
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold mb-1"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-2 focus:outline-accent-2"
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-semibold mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-2 focus:outline-accent-2"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-2 focus:outline-accent-2"
            />
          </div>

          <button
            type="submit"
            className="mt-2 inline-flex items-center justify-center bg-accent text-text text-sm font-semibold px-4 py-2 rounded-lg transition-colors hover:bg-accent-2 hover:text-white"
          >
            {isLogin ? "Log in" : "Sign up"}
          </button>
        </form>

        <p className="text-center text-sm text-text-muted mt-6">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-text font-semibold hover:text-accent-2 transition-colors"
          >
            {isLogin ? "Sign up" : "Log in"}
          </button>
        </p>
      </div>
    </section>
  );
}
