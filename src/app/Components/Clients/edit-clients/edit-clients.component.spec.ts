import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditClientsComponent } from './edit-clients.component';

describe('EditClientsComponent', () => {
  let component: EditClientsComponent;
  let fixture: ComponentFixture<EditClientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditClientsComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
