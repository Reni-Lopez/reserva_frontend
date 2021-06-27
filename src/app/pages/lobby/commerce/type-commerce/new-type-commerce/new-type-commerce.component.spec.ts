import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTypeCommerceComponent } from './new-type-commerce.component';

describe('NewTypeCommerceComponent', () => {
  let component: NewTypeCommerceComponent;
  let fixture: ComponentFixture<NewTypeCommerceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTypeCommerceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTypeCommerceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
