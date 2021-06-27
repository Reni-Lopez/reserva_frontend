import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCommerceComponent } from './new-commerce.component';

describe('NewCommerceComponent', () => {
  let component: NewCommerceComponent;
  let fixture: ComponentFixture<NewCommerceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCommerceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCommerceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
