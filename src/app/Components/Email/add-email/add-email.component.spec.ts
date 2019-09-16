import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
    import { async, ComponentFixture, TestBed } from '@angular/core/testing';
    
    import { AddEmailComponent } from './add-email.component';
    
    describe('AddEmailComponent', () => {
      let component: AddEmailComponent;
      let fixture: ComponentFixture<AddEmailComponent>;
    
      beforeEach(async(() => {
        TestBed.configureTestingModule({
          declarations: [ AddEmailComponent ],
          schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
        .compileComponents();
      }));
    
      beforeEach(() => {
        fixture = TestBed.createComponent(AddEmailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
    
      it('should create', () => {
        expect(component).toBeTruthy();
      });
    });
    