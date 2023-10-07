import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class IconsModule {
  private path: string = '../../../assets/icons';

  constructor(
    private domSanitizer: DomSanitizer,
    public matIconRegistry: MatIconRegistry
  ) {
    matIconRegistry
      .addSvgIcon('user', this.setPath(`${this.path}/user.svg`))
      .addSvgIcon(
        'show-password',
        this.setPath(`${this.path}/show password.svg`)
      )
      .addSvgIcon(
        'hide password',
        this.setPath(`${this.path}/hide password.svg`)
      )
      .addSvgIcon('email', this.setPath(`${this.path}/email.svg`))
      .addSvgIcon('password', this.setPath(`${this.path}/password.svg`))
      .addSvgIcon(
        'passwordRequirementsChecked',
        this.setPath(`${this.path}/passwordRequirementsChecked`)
      )
      .addSvgIcon(
        'passwordRequirementsUnchecked',
        this.setPath(`${this.path}/passwordRequirementsUnchecked`)
      );
  }

  private setPath(url: string): SafeResourceUrl {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
