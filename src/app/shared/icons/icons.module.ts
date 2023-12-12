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
      )
      .addSvgIcon('search', this.setPath(`${this.path}/search.svg`))
      .addSvgIcon('file-pdf', this.setPath(`${this.path}/file-pdf.svg`))
      .addSvgIcon('delete-trash', this.setPath(`${this.path}/delete-trash.svg`))
      .addSvgIcon('edit', this.setPath(`${this.path}/edit.svg`))
      .addSvgIcon('refresh', this.setPath(`${this.path}/refresh.svg`))
      .addSvgIcon('user-white', this.setPath(`${this.path}/user-white.svg`))
      .addSvgIcon('plus-solid', this.setPath(`${this.path}/plus-solid.svg`))
      .addSvgIcon('icon-close', this.setPath(`${this.path}/icon-close.svg`));
  }

  private setPath(url: string): SafeResourceUrl {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
