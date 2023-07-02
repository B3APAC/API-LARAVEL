import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactorielComponent } from './factoriel.component';

describe('FactorielComponent', () => {
  let component: FactorielComponent;
  let fixture: ComponentFixture<FactorielComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FactorielComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FactorielComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
