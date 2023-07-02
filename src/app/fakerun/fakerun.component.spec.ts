import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FakerunComponent } from './fakerun.component';

describe('FakerunComponent', () => {
  let component: FakerunComponent;
  let fixture: ComponentFixture<FakerunComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FakerunComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FakerunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
