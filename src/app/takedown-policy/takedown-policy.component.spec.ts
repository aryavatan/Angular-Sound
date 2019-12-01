import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TakedownPolicyComponent } from './takedown-policy.component';

describe('TakedownPolicyComponent', () => {
  let component: TakedownPolicyComponent;
  let fixture: ComponentFixture<TakedownPolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TakedownPolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TakedownPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
