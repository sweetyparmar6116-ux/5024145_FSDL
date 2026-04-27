// ============================================================
// api.js — Centralized API helper for PaisaTrack
// All fetch calls to the backend go through here.
// ============================================================

const BASE = '/api';

function getToken() {
  return localStorage.getItem('pt_token');
}

function authHeaders() {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getToken()}`,
  };
}

// ── Auth ──────────────────────────────────────────────────
export async function apiRegister(name, email, password) {
  const res = await fetch(`${BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data; // { token, name, email }
}

export async function apiLogin(email, password) {
  const res = await fetch(`${BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data; // { token, name, email }
}

// ── Expenses ──────────────────────────────────────────────
export async function apiGetExpenses() {
  const res = await fetch(`${BASE}/expenses`, { headers: authHeaders() });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  // Normalise _id → id for frontend compatibility
  return data.map((e) => ({ ...e, id: e._id }));
}

export async function apiAddExpense({ name, amount, category, date, timestamp }) {
  const res = await fetch(`${BASE}/expenses`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ name, amount, category, date, timestamp }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return { ...data, id: data._id };
}

export async function apiDeleteExpense(id) {
  const res = await fetch(`${BASE}/expenses/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
}
