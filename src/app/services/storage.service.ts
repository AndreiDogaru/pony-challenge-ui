import { Injectable, Inject } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';

const keys = {
  mazeId: 'pony-challenge_mazeId',
};

Injectable();
export class StorageService {
  constructor(@Inject(LocalStorageService) private localStorage: LocalStorageService) { }

  clear() { this.localStorage.clear(); }

  private save(key: string, object: any): void { this.localStorage.store(key, object); }
  private get(key: string): any { return this.localStorage.retrieve(key); }

  get mazeId(): string { return this.get(keys.mazeId); }
  set mazeId(mazeId: string) { this.save(keys.mazeId, mazeId); }

}
