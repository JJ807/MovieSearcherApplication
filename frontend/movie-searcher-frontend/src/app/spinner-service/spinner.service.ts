import {Injectable} from '@angular/core';
import {Overlay, OverlayRef} from "@angular/cdk/overlay";
import {ComponentPortal} from "@angular/cdk/portal";
import {defer, NEVER} from "rxjs";
import {catchError, finalize, share} from "rxjs/operators";
import {SpinnerComponent} from "../home/spinner/spinner.component";

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  constructor(private overlay: Overlay) {
  }

  private overlayRef: OverlayRef | undefined;

  public readonly spinner$ = defer(() => {
    this.show();
    return NEVER.pipe(
      finalize(() => {
        this.hide();
      })
    );
  }).pipe(share());

  public show(): void {
    // Hack avoiding `ExpressionChangedAfterItHasBeenCheckedError` error
    Promise.resolve(null).then(() => {
      this.overlayRef = this.overlay.create({
        positionStrategy: this.overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically(),
        hasBackdrop: true,
      });
      this.overlayRef.attach(new ComponentPortal(SpinnerComponent));
    });
  }

  public hide(): void {
    if (this.overlayRef) {
      this.overlayRef.detach();
      this.overlayRef = undefined;
    }
  }
}
