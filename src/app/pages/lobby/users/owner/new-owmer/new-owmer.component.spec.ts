import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOwmerComponent } from './new-owmer.component';

describe('NewOwmerComponent', () => {
  let component: NewOwmerComponent;
  let fixture: ComponentFixture<NewOwmerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewOwmerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewOwmerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
