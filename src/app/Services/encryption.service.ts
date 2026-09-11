import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {
  private secretKey = "dsgyQV9w3r4t5y6u7i8o9p0a1s2d3f4g5h6j7k8l9zxcvbnm,./;[]{}|!@#$%^&*()_+~`";
  constructor() { }

  private async getKey(): Promise<CryptoKey> {
    const enc = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      enc.encode(this.secretKey).slice(0, 32),
      { name: 'AES-GCM' },
      false,
      ['encrypt', 'decrypt']
    );
    return keyMaterial;
  }

  async encrypt(data: any): Promise<string> {
    const enc = new TextEncoder();
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const key = await this.getKey();

    const encrypted = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      key,
      enc.encode(JSON.stringify(data))
    );

    // Combine iv + encrypted and convert to base64
    const combined = new Uint8Array(iv.byteLength + encrypted.byteLength);
    combined.set(iv, 0);
    combined.set(new Uint8Array(encrypted), iv.byteLength);

    return btoa(String.fromCharCode(...combined));
  }

  async decrypt(cipherText: string): Promise<any> {
    const combined = Uint8Array.from(atob(cipherText), c => c.charCodeAt(0));
    const iv = combined.slice(0, 12);
    const encrypted = combined.slice(12);
    const key = await this.getKey();

    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      key,
      encrypted
    );

    const dec = new TextDecoder();
    return JSON.parse(dec.decode(decrypted));
  }

  async safeDecrypt(cipherText: string): Promise<any> {
    try {
      return await this.decrypt(cipherText);
    } catch (e) {
      console.error('Decryption failed', e);
      return null;
    }
  }
}

