import { NgModule } from '@angular/core';

import { ParallelSignatureSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [ParallelSignatureSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [ParallelSignatureSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class ParallelSignatureSharedCommonModule {}
