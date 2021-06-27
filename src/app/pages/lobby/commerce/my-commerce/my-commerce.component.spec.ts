import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCommerceComponent } from './my-commerce.component';

describe('MyCommerceComponent', () => {
  let component: MyCommerceComponent;
  let fixture: ComponentFixture<MyCommerceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyCommerceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCommerceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
