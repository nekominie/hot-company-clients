// Servicio de autenticación del Portal de Clientes (sesiones respaldadas por la API).

import { ref } from 'vue'

const API_BASE = (import.meta.env.VITE_API_BASE_URL ?? '/api').replace(/\/$/, '') + '/v1/client-auth'
const TOKEN_KEY = 'fisinor_client_token'

export interface ClientAccountInfo {
  id: string
  username: string
  email: string
  firstName: string | null
  lastNamePaternal: string | null
  lastNameMaternal: string | null
  phone: string | null
  partnerType: string | null
}

interface ClientAuthPayload {
  token: string
  expiresAt: string
  account: {
    id: string
    username: string
    email: string
    firstName: string | null
    lastNamePaternal: string | null
    lastNameMaternal: string | null
    phone: string | null
    partnerType: string | null
    createdAt: string
  }
}

const authToken = ref<string | null>(localStorage.getItem(TOKEN_KEY))
export const authAccount = ref<ClientAccountInfo | null>(null)

function mapAccount(raw: ClientAuthPayload['account']): ClientAccountInfo {
  return {
    id: raw.id,
    username: raw.username,
    email: raw.email,
    firstName: raw.firstName,
    lastNamePaternal: raw.lastNamePaternal,
    lastNameMaternal: raw.lastNameMaternal,
    phone: raw.phone,
    partnerType: raw.partnerType,
  }
}

function saveSession(token: string, account: ClientAccountInfo) {
  authToken.value = token
  authAccount.value = account
  localStorage.setItem(TOKEN_KEY, token)
}

export function clearSession() {
  authToken.value = null
  authAccount.value = null
  localStorage.removeItem(TOKEN_KEY)
}

async function apiFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers: Record<string, string> = {
    ...(init.headers as Record<string, string> | undefined),
  }
  if (authToken.value) {
    headers.Authorization = `Bearer ${authToken.value}`
  }
  if (init.body) {
    headers['Content-Type'] = 'application/json'
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers,
    credentials: 'include',
  })
  const payload = await response.json().catch(() => null)

  if (!response.ok) {
    const message =
      (payload && typeof payload === 'object' && 'message' in payload && String(payload.message)) ||
      (payload &&
        typeof payload === 'object' &&
        'errors' in payload &&
        flattenValidationErrors(payload.errors as Record<string, string[]>)) ||
      `Error ${response.status}`
    throw new Error(message)
  }

  return payload as T
}

function flattenValidationErrors(errors: Record<string, string[]>): string {
  const first = Object.values(errors)[0]
  return Array.isArray(first) ? first[0] : 'Revisa los datos del formulario.'
}

// --- Operaciones públicas ---

export async function registerClientAccount(payload: {
  username: string
  email: string
  password: string
  firstName?: string
  lastNamePaternal?: string
  lastNameMaternal?: string
  phone?: string
  partnerType?: string
}): Promise<void> {
  const auth = await apiFetch<ClientAuthPayload>('/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
  saveSession(auth.token, mapAccount(auth.account))
}

export async function loginClient(identifier: string, password: string): Promise<void> {
  const auth = await apiFetch<ClientAuthPayload>('/login', {
    method: 'POST',
    body: JSON.stringify({ identifier, password }),
  })
  saveSession(auth.token, mapAccount(auth.account))
}

export async function fetchCurrentAccount(): Promise<ClientAccountInfo | null> {
  // La sesión puede llegar por token Bearer (login local) o por la cookie
  // compartida entre los sitios FISINOR (p. ej. sesión iniciada en la tienda).
  try {
    const account = await apiFetch<ClientAccountInfo>('/me')
    authAccount.value = account
    return account
  } catch {
    clearSession()
    return null
  }
}

export async function logoutClient(): Promise<void> {
  try {
    await apiFetch<void>('/logout', { method: 'POST' })
  } catch {
    // aunque la API falle, la sesión local se descarta
  }
  clearSession()
}

// Nombre para mostrar: nombres + apellido paterno, con respaldo al username
export function displayNameOf(account: ClientAccountInfo | null): string {
  if (!account) return ''
  const composed = [account.firstName, account.lastNamePaternal]
    .filter((part) => part && part.trim().length > 0)
    .join(' ')
  return composed.length > 0 ? composed : account.username
}

export function initialsOf(account: ClientAccountInfo | null): string {
  if (!account) return '??'
  const source = displayNameOf(account)
  return source
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}
