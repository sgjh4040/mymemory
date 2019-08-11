import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ShareService } from 'src/app/services/share.service';
let MoviePage = class MoviePage {
    constructor(shareService) {
        this.shareService = shareService;
        this.searchTerm = '';
    }
    ngOnInit() {
    }
    searchChanged() {
        this.results = this.shareService.getreview(this.searchTerm);
    }
    ;
    addliker(id) {
        this.shareService.addliker(id).subscribe();
    }
};
MoviePage = tslib_1.__decorate([
    Component({
        selector: 'app-movie',
        templateUrl: './movie.page.html',
        styleUrls: ['./movie.page.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [ShareService])
], MoviePage);
export { MoviePage };
//# sourceMappingURL=movie.page.js.map