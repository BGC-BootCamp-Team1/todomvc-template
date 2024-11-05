import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { backToHomeGuard } from './back-to-home.guard';


describe('backToHomeGuard', () => {
  let guard: backToHomeGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(backToHomeGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});