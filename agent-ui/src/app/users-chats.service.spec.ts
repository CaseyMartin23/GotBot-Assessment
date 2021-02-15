import { TestBed } from '@angular/core/testing';

import { UsersChatsService } from './users-chats.service';

describe('UsersChatsService', () => {
  let service: UsersChatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersChatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
