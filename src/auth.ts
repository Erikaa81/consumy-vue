import { createStorage, type SimpleStorage } from './storage';

class Auth {
  private storage: SimpleStorage;

  constructor(persistent = false) {
    this.storage = createStorage(persistent);
  }

  private getFallback(key: string): string | null {
    let transient = createStorage(false);
    let persistent = createStorage(true);
    return transient.get(key) || persistent.get(key);
  }

  currentUser() {
    if (!this.isLoggedIn()) {
      return null;
    }
    return {
      email: this.getFallback('email'),
      token: this.getFallback('token'),
      id: this.getFallback('user_id') // Adicionamos a obtenção do ID do usuário
    };
  }

  isLoggedIn() {
    return Boolean(this.getFallback('token'));
  }

  signOut(andThen = () => {}) {
    let transient = createStorage(false);
    let persistent = createStorage(true);
    transient.remove('token');
    transient.remove('email');
    persistent.remove('token');
    persistent.remove('email');
    andThen();
  }

  async signIn(email: string, password: string, onSuccess: () => void, onFailure: () => void) {
    const body = {
      login: {
        email: email,
        password: password
      }
    };

    fetch('http://localhost:3000/sign_in', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-API_KEY': 'T4EfcQqg3eqGJ1OoEUvEclb41oE=',
      },
      body: JSON.stringify(body)
    }).then((response) => {
      if (response.ok) {
        this.success(response, onSuccess);
      } else {
        this.failure(response, onFailure);
      }
    });
  }

  async register(email: string, password: string, password_confirmation: string): Promise<void> {
    const body = {
      user: {
        email: email,
        password: password,
        password_confirmation: password_confirmation
      }
    };

    try {
      const response = await fetch('http://localhost:3000/new', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-API_KEY': 'T4EfcQqg3eqGJ1OoEUvEclb41oE='
        },
        body: JSON.stringify(body)
      });

      if (response.ok) {
        const userData = await response.json();
      } else {
        throw new Error('Failed to register');
      }
    } catch (error) {
      console.error('Erro durante o registro:', error);
      throw new Error('Failed to register');
    }
  }

  private success(response: Response, onSuccess: () => void) {
    response.json().then((json) => {
      this.storage.store('token', json.token);
      this.storage.store('email', json.email);
      this.storage.store('user_id', json.id); 
      onSuccess();
    });
  }

  private failure(response: Response, onFailure: () => void) {
    onFailure();
  }
}

export { Auth };