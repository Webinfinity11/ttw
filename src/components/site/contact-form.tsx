'use client';

import { useState } from 'react';
import { Check, Loader2, Send } from 'lucide-react';

export function ContactForm({ services }: { services: string[] }) {
  const [state, setState] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [form, setForm] = useState({ name: '', phone: '', service: services[0] ?? '', message: '' });

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setState('sending');
    // Demo-режим: позже здесь будет POST /api/leads.
    await new Promise((resolve) => setTimeout(resolve, 900));
    setState('sent');
  }

  if (state === 'sent') {
    return (
      <div className="flex h-full min-h-[380px] flex-col items-center justify-center rounded-none border border-stone-200 bg-white p-10 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-stone-100 text-stone-100">
          <Check className="h-7 w-7" />
        </span>
        <h3 className="mt-6 font-display text-2xl font-black">Спасибо, заявка отправлена</h3>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-graphite-500">
          Мы свяжемся с вами в рабочее время и предложим удобную дату замера.
        </p>
        <button onClick={() => setState('idle')} className="btn-outline mt-8">
          Отправить ещё одну
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-none border border-stone-200 bg-white p-8 lg:p-10">
      <h3 className="font-display text-3xl font-black tracking-tight">Оставить заявку</h3>
      <p className="mt-3 text-sm text-graphite-500">
        Ответим в рабочее время и договоримся о бесплатном замере.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="field-label">Имя</label>
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="field-input"
            placeholder="Как к вам обращаться"
          />
        </div>
        <div>
          <label className="field-label">Телефон</label>
          <input
            required
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="field-input"
            placeholder="+995 5__ __ __ __"
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="field-label">Услуга</label>
        <select
          value={form.service}
          onChange={(e) => setForm({ ...form, service: e.target.value })}
          className="field-input"
        >
          {services.map((service) => (
            <option key={service}>{service}</option>
          ))}
        </select>
      </div>

      <div className="mt-4">
        <label className="field-label">Комментарий</label>
        <textarea
          rows={4}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="field-input resize-none"
          placeholder="Площадь помещения, формат плитки, желаемые сроки"
        />
      </div>

      <button type="submit" disabled={state === 'sending'} className="btn-dark mt-6 w-full py-3.5">
        {state === 'sending' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Отправляем
          </>
        ) : (
          <>
            <Send className="h-4 w-4" /> Отправить заявку
          </>
        )}
      </button>

      <p className="mt-4 text-center text-xs text-graphite-300">
        Нажимая кнопку, вы соглашаетесь на обработку контактных данных.
      </p>
    </form>
  );
}
