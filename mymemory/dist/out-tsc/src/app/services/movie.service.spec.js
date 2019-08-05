import { TestBed } from '@angular/core/testing';
import { MovieService } from './movie.service';
describe('MovieService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));
    it('should be created', () => {
        const service = TestBed.get(MovieService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=movie.service.spec.js.map