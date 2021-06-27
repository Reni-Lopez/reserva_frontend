import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOwmerComponent } from './list-owmer.component';

describe('ListOwmerComponent', () => {
  let component: ListOwmerComponent;
  let fixture: ComponentFixture<ListOwmerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOwmerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOwmerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
