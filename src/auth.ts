import { storage } from './storage'
console.log('will sign in...')

function success(response: Response, onSuccess: () => void) {
  response.json().then((json) => {
    storage.store('token', json.token)
    storage.store('email', json.email)
    onSuccess()
  })
}

function failure(response: Response, onFailure: () => void) {
  onFailure()
}

function isLoggedIn() {
  return Boolean(storage.get('token'))
}

function signOut(andThen: () => void = () => {}) {
  storage.remove('token')
  storage.remove('email')

  andThen()
}

function currentUser() {
  if (!isLoggedIn()) {
    return null
  }
  return {
    email: storage.get('email')
  }
}

async function signIn(
  email: string,
  password: string,
  onSuccess: () => void,
  onFailure: () => void
) {
  const body = {
    login: {
      email: email,
      password: password
    }
  }

  const response = await fetch('http://localhost:3000/sign_in', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then((response) => {
    if (response.ok) {
      success(response, onSuccess)
    } else {
      failure(response, onFailure)
    }
  })
}

export const auth = {
  signIn,
  isLoggedIn,
  currentUser,
  signOut
}
import { createStorage, type SimpleStorage } from './storage'
class Auth {
  private storage: SimpleStorage
  constructor(persistent = false) {
    this.storage = createStorage(persistent)
  }

  private getFallback(key: string): string | null {
    let transient = createStorage(false)
    let persistent = createStorage(true)
    return transient.get(key) || persistent.get(key)
  }
  success(response: Response, onSuccess: () => void) {
    response.json().then((json) => {
      this.storage.store('token', json.token)
      this.storage.store('email', json.email)
      onSuccess()
    })
  }
  failure(response: Response, onFailure: () => void) {
    onFailure()
  }
  currentUser() {
    if (!this.isLoggedIn()) {
      return null
    }
    return {
      email: this.getFallback('email')
    }
  }
  isLoggedIn() {
    return Boolean(this.getFallback('token'))
  }
  signOut(andThen = () => {}) {
    let transient = createStorage(false)
    let persistent = createStorage(true)
    transient.remove('token')
    transient.remove('email')
    persistent.remove('token')
    persistent.remove('email')
    andThen()
  }

  async signIn(email: string, password: string, onSuccess: () => void, onFailure: () => void) {
    const body = {
      login: {
        email: email,
        password: password
      }
    }
    fetch('http://localhost:3000/sign_in', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then((response) => {
      if (response.ok) {
        this.success(response, onSuccess)
      } else {
        this.failure(response, onFailure)
      }
    })
  }
}
export { Auth }