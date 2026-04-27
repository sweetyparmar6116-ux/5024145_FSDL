// ============================================================
// main.js — PaisaTrack Full Stack
// All data operations go through the API (no more localStorage
// for expenses). JWT token is kept in localStorage only.
// ============================================================

import {
  apiRegister,
  apiLogin,
  apiGetExpenses,
  apiAddExpense,
  apiDeleteExpense,
} from './api.js';

// ── State ──────────────────────────────────────────────────
let expenses = [];
let currentView = 'dashboard';

const BUDGET = 10000;

const CATEGORY_ICONS = {
  'Food & Dining':      'restaurant',
  'Travel & Transport': 'directions_bus',
  'Shopping':           'shopping_bag',
  'Rent & Utilities':   'home',
  'Education':          'school',
  'Health':             'local_hospital',
  'Entertainment':      'movie',
  'Recharge & Bills':   'phone_android',
  'General':            'receipt_long',
};

// ── Helpers ────────────────────────────────────────────────
function formatINR(amount) {
  return '₹' + Number(amount).toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function setLoading(on) {
  document.getElementById('loading-spinner').classList.toggle('hidden', !on);
}

function showAuthError(msg) {
  const el = document.getElementById('auth-error');
  el.textContent = msg;
  el.classList.remove('hidden');
}

function hideAuthError() {
  document.getElementById('auth-error').classList.add('hidden');
}

function showModalError(msg) {
  const el = document.getElementById('modal-error');
  el.textContent = msg;
  el.classList.remove('hidden');
}

function hideModalError() {
  document.getElementById('modal-error').classList.add('hidden');
}

// ── Auth Screen / App Shell toggle ─────────────────────────
function showAuth() {
  document.getElementById('auth-screen').classList.add('active');
  document.getElementById('app-shell').classList.remove('active');
}

function showApp(name) {
  document.getElementById('auth-screen').classList.remove('active');
  document.getElementById('app-shell').classList.add('active');
  document.getElementById('sidebar-name').textContent = name || 'User';
}

// ── Token helpers ──────────────────────────────────────────
function saveSession(token, name) {
  localStorage.setItem('pt_token', token);
  localStorage.setItem('pt_name', name);
}

function clearSession() {
  localStorage.removeItem('pt_token');
  localStorage.removeItem('pt_name');
}

function getSession() {
  return {
    token: localStorage.getItem('pt_token'),
    name: localStorage.getItem('pt_name'),
  };
}

// ── Auth Tabs ──────────────────────────────────────────────
const tabLogin    = document.getElementById('tab-login');
const tabRegister = document.getElementById('tab-register');
const loginForm   = document.getElementById('login-form');
const regForm     = document.getElementById('register-form');

tabLogin.addEventListener('click', () => {
  tabLogin.classList.add('active');
  tabRegister.classList.remove('active');
  loginForm.classList.remove('hidden');
  regForm.classList.add('hidden');
  hideAuthError();
});

tabRegister.addEventListener('click', () => {
  tabRegister.classList.add('active');
  tabLogin.classList.remove('active');
  regForm.classList.remove('hidden');
  loginForm.classList.add('hidden');
  hideAuthError();
});

// ── Login ──────────────────────────────────────────────────
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  hideAuthError();
  const email    = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;

  const btn = document.getElementById('login-btn');
  btn.textContent = 'Signing in...';
  btn.disabled = true;

  try {
    const { token, name } = await apiLogin(email, password);
    saveSession(token, name);
    await bootApp(name);
  } catch (err) {
    showAuthError(err.message);
  } finally {
    btn.textContent = 'Sign In';
    btn.disabled = false;
  }
});

// ── Register ───────────────────────────────────────────────
regForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  hideAuthError();
  const name     = document.getElementById('reg-name').value.trim();
  const email    = document.getElementById('reg-email').value.trim();
  const password = document.getElementById('reg-password').value;

  const btn = document.getElementById('register-btn');
  btn.textContent = 'Creating account...';
  btn.disabled = true;

  try {
    const { token, name: userName } = await apiRegister(name, email, password);
    saveSession(token, userName);
    await bootApp(userName);
  } catch (err) {
    showAuthError(err.message);
  } finally {
    btn.textContent = 'Create Account';
    btn.disabled = false;
  }
});

// ── Logout ─────────────────────────────────────────────────
function logout() {
  clearSession();
  expenses = [];
  showAuth();
}

document.getElementById('logout-btn').addEventListener('click', logout);
document.getElementById('mob-logout').addEventListener('click', logout);

// ── Boot: check session → load expenses → show app ─────────
async function bootApp(name) {
  showApp(name);
  setLoading(true);
  try {
    expenses = await apiGetExpenses();
  } catch {
    expenses = [];
  } finally {
    setLoading(false);
  }
  renderUI();
}

// On page load: if token exists, auto-login
const { token, name: savedName } = getSession();
if (token) {
  bootApp(savedName);
} else {
  showAuth();
}

// ── Navigation ─────────────────────────────────────────────
function switchView(view) {
  currentView = view;
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.getElementById('view-' + view).classList.add('active');

  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.dataset.view === view);
  });
  document.querySelectorAll('.mob-nav-item[data-view]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.view === view);
  });
  renderUI();
}

document.querySelectorAll('.nav-link[data-view]').forEach(link => {
  link.addEventListener('click', (e) => { e.preventDefault(); switchView(link.dataset.view); });
});
document.querySelectorAll('.mob-nav-item[data-view]').forEach(btn => {
  btn.addEventListener('click', () => switchView(btn.dataset.view));
});
document.getElementById('view-all-btn').addEventListener('click', () => switchView('transactions'));

// ── Modal ──────────────────────────────────────────────────
const modal = document.getElementById('expense-modal');

function openModal() {
  modal.classList.remove('hidden');
  hideModalError();
  document.getElementById('expense-name').focus();
}

function closeModal() {
  modal.classList.add('hidden');
  document.getElementById('expense-form').reset();
  hideModalError();
}

['add-expense-btn', 'txn-add-btn', 'mobile-add-btn'].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('click', openModal);
});

document.getElementById('close-modal').addEventListener('click', closeModal);
modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

// ── Form Submit (Add Expense) ───────────────────────────────
document.getElementById('expense-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  hideModalError();

  const name     = document.getElementById('expense-name').value.trim();
  const amount   = parseFloat(document.getElementById('expense-amount').value);
  const category = document.getElementById('expense-category').value;

  if (!name || isNaN(amount) || amount <= 0) return;

  const btn = document.getElementById('submit-expense-btn');
  btn.textContent = 'Saving...';
  btn.disabled = true;

  const ts = Date.now();

  try {
    const saved = await apiAddExpense({
      name,
      amount,
      category,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      timestamp: ts,
    });
    expenses.unshift(saved);
    closeModal();
    renderUI();
  } catch (err) {
    showModalError(err.message || 'Failed to save. Try again.');
  } finally {
    btn.textContent = 'Record Kharcha';
    btn.disabled = false;
  }
});

// ── Delete Expense ─────────────────────────────────────────
window.deleteExpense = async (id) => {
  if (!confirm('Delete this entry?')) return;

  try {
    await apiDeleteExpense(id);
    expenses = expenses.filter(e => e.id !== id && e._id !== id);
    renderUI();
  } catch (err) {
    alert('Could not delete: ' + err.message);
  }
};

// ── Render ─────────────────────────────────────────────────
function renderUI() {
  if (currentView === 'dashboard') {
    renderDashboard();
  } else {
    renderTransactions();
  }
}

// ── Dashboard ──────────────────────────────────────────────
function renderDashboard() {
  const total = expenses.reduce((s, e) => s + e.amount, 0);

  document.getElementById('total-spent').textContent = formatINR(total);
  document.getElementById('expense-count-label').textContent =
    expenses.length === 0
      ? 'No expenses recorded yet'
      : `${expenses.length} transaction${expenses.length > 1 ? 's' : ''} recorded`;

  // Budget
  const pct = Math.min((total / BUDGET) * 100, 100);
  const budgetBar = document.getElementById('budget-bar');
  budgetBar.style.width = pct + '%';
  budgetBar.className = 'h-full rounded-full transition-all ' + (pct > 80 ? 'bg-error' : 'bg-secondary');
  document.getElementById('budget-pct').textContent = pct.toFixed(1) + '% of budget used';

  // Top category
  const catTotals = {};
  expenses.forEach(e => {
    catTotals[e.category] = (catTotals[e.category] || 0) + e.amount;
  });
  const topCat = Object.entries(catTotals).sort((a, b) => b[1] - a[1])[0];
  if (topCat) {
    document.getElementById('top-cat-name').textContent   = topCat[0];
    document.getElementById('top-cat-amount').textContent = formatINR(topCat[1]);
    document.getElementById('top-cat-icon').textContent   = CATEGORY_ICONS[topCat[0]] || 'receipt_long';
  } else {
    document.getElementById('top-cat-name').textContent   = '—';
    document.getElementById('top-cat-amount').textContent = formatINR(0);
    document.getElementById('top-cat-icon').textContent   = 'receipt_long';
  }

  renderBarChart();
  renderList(document.getElementById('expense-list'), expenses.slice(0, 5));
}

// ── Bar chart ──────────────────────────────────────────────
function renderBarChart() {
  const chartEl  = document.getElementById('bar-chart');
  const labelsEl = document.getElementById('bar-labels');
  chartEl.innerHTML  = '';
  labelsEl.innerHTML = '';

  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(d);
  }

  const dayNames  = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const fullNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

  const dayTotals = days.map(d => {
    const key = d.toDateString();
    return expenses
      .filter(e => new Date(e.timestamp).toDateString() === key)
      .reduce((s, e) => s + e.amount, 0);
  });

  const max = Math.max(...dayTotals, 1);

  days.forEach((d, i) => {
    const pct    = (dayTotals[i] / max) * 100;
    const isToday = i === 6;
    const amount  = dayTotals[i];
    const barColor = isToday ? '#0d47a1' : pct > 60 ? '#2a6b2c' : '#dff1fb';

    const wrap = document.createElement('div');
    wrap.className = 'bar-wrap';

    const tip = document.createElement('div');
    tip.className = 'bar-tooltip';
    tip.innerHTML = `
      <div class="tip-day">${fullNames[d.getDay()]}${isToday ? ' (Today)' : ''}</div>
      ${amount > 0
        ? `<div class="tip-amt">${formatINR(amount)}</div>`
        : `<div class="tip-none">No spending</div>`}
    `;

    const bar = document.createElement('div');
    bar.className = 'bar-bar';
    bar.style.height     = Math.max(pct, 4) + '%';
    bar.style.background = barColor;

    wrap.appendChild(tip);
    wrap.appendChild(bar);
    chartEl.appendChild(wrap);

    const label = document.createElement('span');
    label.textContent = dayNames[d.getDay()];
    labelsEl.appendChild(label);
  });
}

// ── Transactions ───────────────────────────────────────────
function renderTransactions() {
  const filter   = document.getElementById('category-filter').value;
  const filtered = filter === 'all' ? expenses : expenses.filter(e => e.category === filter);

  const total = filtered.reduce((s, e) => s + e.amount, 0);
  const count = filtered.length;
  const avg   = count > 0 ? total / count : 0;
  const max   = count > 0 ? Math.max(...filtered.map(e => e.amount)) : 0;

  document.getElementById('txn-total').textContent = formatINR(total);
  document.getElementById('txn-count').textContent = count;
  document.getElementById('txn-avg').textContent   = formatINR(avg);
  document.getElementById('txn-max').textContent   = formatINR(max);

  renderList(document.getElementById('all-expense-list'), filtered);
}

document.getElementById('category-filter').addEventListener('change', () => {
  if (currentView === 'transactions') renderTransactions();
});

// ── Shared List Renderer ───────────────────────────────────
function renderList(container, list) {
  container.innerHTML = '';

  if (list.length === 0) {
    container.innerHTML = `
      <div class="text-center p-10 bg-white rounded-xl border border-slate-100">
        <span class="material-symbols-outlined text-slate-300 text-5xl">receipt</span>
        <p class="text-slate-500 font-medium mt-2">Koi entry nahi mili!</p>
        <p class="text-sm text-slate-400">Click "Add Kharcha" to record a transaction.</p>
      </div>`;
    return;
  }

  list.forEach(expense => {
    const icon = CATEGORY_ICONS[expense.category] || 'receipt_long';
    const itemId = expense.id || expense._id;
    const el = document.createElement('div');
    el.className = 'group bg-white p-5 rounded-xl flex items-center justify-between hover:bg-surface-container-low transition-colors border border-slate-100/80 hover:border-slate-200';
    el.innerHTML = `
      <div class="flex items-center gap-4">
        <div class="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-surface-container-low flex items-center justify-center text-primary border border-slate-200 flex-shrink-0">
          <span class="material-symbols-outlined text-xl">${icon}</span>
        </div>
        <div>
          <h4 class="font-headline font-bold text-on-surface text-sm md:text-base">${expense.name}</h4>
          <p class="text-on-surface-variant text-xs">${expense.category} &bull; ${expense.date}</p>
        </div>
      </div>
      <div class="flex items-center gap-3 md:gap-4">
        <div class="text-right">
          <p class="text-error font-headline font-extrabold text-base md:text-lg">${formatINR(expense.amount)}</p>
          <p class="text-[10px] uppercase tracking-widest text-slate-400 hidden md:block">Verified</p>
        </div>
        <button onclick="deleteExpense('${itemId}')"
          class="text-slate-200 hover:text-error transition-colors p-1.5 rounded-full hover:bg-red-50 flex-shrink-0">
          <span class="material-symbols-outlined text-lg">delete</span>
        </button>
      </div>
    `;
    container.appendChild(el);
  });
}
