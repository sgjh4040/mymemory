import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MovieService } from 'src/app/services/movie.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
let CreatePage = class CreatePage {
    constructor(movieService, router, nav) {
        this.movieService = movieService;
        this.router = router;
        this.nav = nav;
    }
    ngOnInit() {
        this.reviewlistForm = new FormGroup({
            title: new FormControl('', [Validators.required])
        });
    }
    onSubmit() {
        this.movieService.writeReviewList(this.reviewlistForm.value).subscribe();
        // this.router.navigateByUrl('reviewbook/list')
        this.router.navigate(['reviewbook/list']);
        // this.nav.navigateBack(['/']).then(()=>{
        //   this.router.navigateByUrl('reviewbook/list')
        // });
    }
};
CreatePage = tslib_1.__decorate([
    Component({
        selector: 'app-create',
        templateUrl: './create.page.html',
        styleUrls: ['./create.page.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [MovieService, Router, NavController])
], CreatePage);
export { CreatePage };
//# sourceMappingURL=create.page.js.map