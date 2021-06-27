import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTypeCommerceComponent } from './list-type-commerce.component';

describe('ListTypeCommerceComponent', () => {
  let component: ListTypeCommerceComponent;
  let fixture: ComponentFixture<ListTypeCommerceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTypeCommerceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTypeCommerceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
