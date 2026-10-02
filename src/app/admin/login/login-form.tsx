'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ArrowRight, Eye, EyeOff, LoaderCircle } from 'lucide-react';

export function LoginForm() {
  const searchParams = useSearchParams();
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user, password }),
      });
      if (!res.ok) {
        setError(res.status === 401 ? 'Неверный логин или пароль' : 'Вход временно недоступен');
        setLoading(false);
        return;
      }
      const next = searchParams.get('next');
      // Полная перезагрузка, чтобы middleware увидел новую cookie
      window.location.href = next?.startsWith('/admin') ? next : '/admin';
    } catch {
      setError('Нет соединения с сервером');
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 space-y-5">
      <div>
        <label htmlFor="user" className="field-label">
          Логин
        </label>
        <input
          id="user"
          className="field-input rounded-xl"
          autoComplete="username"
          autoFocus
          required
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="password" className="field-label">
          Пароль
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            className="field-input rounded-xl pr-11"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-graphite-300 transition hover:text-graphite-700"
            aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {error && (
        <p className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-700">
          {error}
        </p>
      )}

      <button type="submit" disabled={loading} className="btn-dark w-full rounded-xl">
        {loading ? (
          <LoaderCircle className="h-4 w-4 animate-spin" />
        ) : (
          <>
            Войти <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
}
