import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDatasComponent } from './user-datas.component';

describe('UserDatasComponent', () => {
  let component: UserDatasComponent;
  let fixture: ComponentFixture<UserDatasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDatasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDatasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
