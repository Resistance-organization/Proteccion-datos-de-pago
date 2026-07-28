// SCORM 1.2 utility — finds the LMS API in parent frames and wraps calls.
// Falls back gracefully to localStorage when running outside an LMS (dev mode).

const DEV_MODE_KEY = 'scorm_dev_data'

function findAPI(win) {
  let current = win
  let attempts = 0
  while (current && attempts < 10) {
    if (current.API) return { api: current.API, version: '1.2' }
    if (current.parent && current.parent !== current) {
      current = current.parent
    } else {
      break
    }
    attempts++
  }
  return null
}

let _api = null
let _initialized = false
let _devMode = false

function getDevData() {
  try {
    return JSON.parse(localStorage.getItem(DEV_MODE_KEY) || '{}')
  } catch {
    return {}
  }
}

function saveDevData(data) {
  localStorage.setItem(DEV_MODE_KEY, JSON.stringify(data))
}

export const scorm = {
  init() {
    const found = findAPI(window)
    if (!found) {
      console.warn('[SCORM] No LMS API found — usando modo desarrollo (localStorage)')
      _devMode = true
      _initialized = true
      return true
    }
    _api = found.api
    const result = _api.LMSInitialize('')
    _initialized = result === 'true' || result === true
    if (_initialized) {
      console.log('[SCORM] Inicializado con LMS (SCORM 1.2)')
    }
    return _initialized
  },

  setValue(key, value) {
    if (!_initialized) return
    if (_devMode) {
      const data = getDevData()
      data[key] = String(value)
      saveDevData(data)
      return
    }
    _api.LMSSetValue(key, String(value))
  },

  getValue(key) {
    if (!_initialized) return ''
    if (_devMode) {
      return getDevData()[key] || ''
    }
    return _api.LMSGetValue(key) || ''
  },

  commit() {
    if (!_initialized || _devMode) return
    _api.LMSCommit('')
  },

  finish() {
    if (!_initialized || _devMode) return
    _api.LMSCommit('')
    _api.LMSFinish('')
  },

  setStatus(status) {
    // status: 'not attempted' | 'incomplete' | 'completed' | 'passed' | 'failed'
    this.setValue('cmi.core.lesson_status', status)
    this.commit()
  },

  setScore(raw, min = 0, max = 100) {
    this.setValue('cmi.core.score.raw', raw)
    this.setValue('cmi.core.score.min', min)
    this.setValue('cmi.core.score.max', max)
    this.commit()
  },

  saveSuspendData(data) {
    try {
      this.setValue('cmi.suspend_data', JSON.stringify(data))
      this.commit()
    } catch {
      console.warn('[SCORM] No se pudo guardar suspend_data')
    }
  },

  loadSuspendData() {
    try {
      const raw = this.getValue('cmi.suspend_data')
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  },
}
