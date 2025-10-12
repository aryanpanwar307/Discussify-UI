import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDiscussionComponent } from './discussion-create.component';

describe('DiscussionCreateComponent', () => {
  let component: CreateDiscussionComponent;
  let fixture: ComponentFixture<CreateDiscussionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateDiscussionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateDiscussionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
