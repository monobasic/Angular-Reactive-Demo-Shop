import { TestBed, inject } from '@angular/core/testing';

import { MessageService } from './message.service';
import { ToastrService } from 'ngx-toastr';

describe('MessageService Setup', () => {

    beforeEach(() => {
        const toastrServiceSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);

        TestBed.configureTestingModule({
            providers: [
                MessageService,
                { provide: ToastrService, useValue: toastrServiceSpy }
            ]
        });
    });

    it('should be created', inject([MessageService], (service: MessageService) => {
        expect(service).toBeTruthy();
    }));

    it('init messages array', inject([MessageService], (service: MessageService) => {
        expect(service.messages).toEqual([]);
    }));
});
