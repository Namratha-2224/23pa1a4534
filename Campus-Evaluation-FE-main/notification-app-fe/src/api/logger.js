export function timestamp() {
  return new Date().toISOString();
}

export function logApiStart(action, details = {}) {
  console.log(`[API START] ${timestamp()} - ${action}`, details);
}

export function logApiSuccess(action, details = {}) {
  console.log(`[API SUCCESS] ${timestamp()} - ${action}`, details);
}

export function logApiFailure(action, error, details = {}) {
  console.error(`[API FAILURE] ${timestamp()} - ${action}`, { error, ...details });
}

export function logUiAction(action, details = {}) {
  console.log(`[UI ACTION] ${timestamp()} - ${action}`, details);
}
