import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { ModalController } from '@ionic/angular';
let MoviePage = class MoviePage {
    constructor(movieService, modalController) {
        this.movieService = movieService;
        this.modalController = modalController;
        this.searchTerm = '';
        this.type = 'movie';
        this.selectmovie = null;
    }
    ngOnInit() {
    }
    searchChanged() {
        this.results = this.movieService.searchData(this.searchTerm, this.type);
    }
    ;
    backtoWritepage(movie) {
        this.selectmovie = movie;
        this.modalController.dismiss(this.selectmovie);
    }
    back() {
        this.modalController.dismiss();
    }
    onKeyPressed(event) {
        console.log('onKeyPress');
        console.log(event);
        if (event.keyCode == 13) {
            let activeElement = document.activeElement;
            activeElement.blur();
        }
    }
};
MoviePage = tslib_1.__decorate([
    Component({
        selector: 'app-movie',
        templateUrl: './movie.page.html',
        styleUrls: ['./movie.page.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [MovieService, ModalController])
], MoviePage);
export { MoviePage };
//# sourceMappingURL=movie.page.js.map