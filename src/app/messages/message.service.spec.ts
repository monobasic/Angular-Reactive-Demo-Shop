import { TestBed, inject } from '@angular/core/testing';

import { MessageService } from './message.service';
import { ToastrService } from 'ngx-toastr';

describe('MessageService Setup', () => {
    let messageService: MessageService;
    let toastrServiceSpy: jasmine.SpyObj<ToastrService>;

    beforeEach(() => {
        const spy = jasmine.createSpyObj('ToastrService', [
            'success',
            'error'
        ]);

        TestBed.configureTestingModule({
            providers: [
                MessageService,
                { provide: ToastrService, useValue: spy }
            ]
        });

        messageService = TestBed.get(MessageService);
        toastrServiceSpy = TestBed.get(ToastrService);
    });

    it('should be created', () => {
        expect(messageService).toBeTruthy();
    });

    it('init messages array', () => {
        expect(messageService.messages).toEqual([]);
    });

    it('add("hello world")', () => {
        messageService.add('hello world');
        expect(messageService.messages).toEqual(['hello world']);

        // These are failing, but why?
        expect(toastrServiceSpy.success.calls.count()).toBe(1, 'toastrServiceSpy "success" method was called once');
        expect(toastrServiceSpy.success).toHaveBeenCalled();
    });
});
