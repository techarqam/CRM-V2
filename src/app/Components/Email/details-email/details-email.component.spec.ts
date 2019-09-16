import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
    import { async, ComponentFixture, TestBed } from '@angular/core/testing';
    
    import { DetailsEmailComponent } from './details-email.component';
    
    describe('DetailsEmailComponent', () => {
      let component: DetailsEmailComponent;
      let fixture: ComponentFixture<DetailsEmailComponent>;
    
      beforeEach(async(() => {
        TestBed.configureTestingModule({
          declarations: [ DetailsEmailComponent ],
          schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
        .compileComponents();
      }));
    
      beforeEach(() => {
        fixture = TestBed.createComponent(DetailsEmailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
    
      it('should create', () => {
        expect(component).toBeTruthy();
      });
    });
    