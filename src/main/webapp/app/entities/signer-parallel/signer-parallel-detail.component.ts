import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISignerParallel } from 'app/shared/model/signer-parallel.model';

@Component({
    selector: 'jhi-signer-parallel-detail',
    templateUrl: './signer-parallel-detail.component.html'
})
export class SignerParallelDetailComponent implements OnInit {
    signer: ISignerParallel;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ signer }) => {
            this.signer = signer;
        });
    }

    previousState() {
        window.history.back();
    }
}
