import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TakedownProcedureComponent } from './takedown-procedure.component';

describe('TakedownProcedureComponent', () => {
  let component: TakedownProcedureComponent;
  let fixture: ComponentFixture<TakedownProcedureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TakedownProcedureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TakedownProcedureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
