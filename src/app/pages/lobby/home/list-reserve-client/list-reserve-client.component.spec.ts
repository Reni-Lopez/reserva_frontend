import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReserveClientComponent } from './list-reserve-client.component';

describe('ListReserveClientComponent', () => {
  let component: ListReserveClientComponent;
  let fixture: ComponentFixture<ListReserveClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListReserveClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListReserveClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
