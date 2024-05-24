import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';

@Component({
  selector: 'app-payment-dialog',
  templateUrl: './payment-dialog.component.html',
  styleUrls: ['./payment-dialog.component.scss'],
})
export class PaymentDialogComponent implements OnInit {
  public payPalConfig?: IPayPalConfig;
  public showSuccess: boolean = false;
  public showCancel: boolean = false;
  public showError: boolean = false;

  ngOnInit(): void {
    this.initConfig();
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  private resetStatus(): void {
    this.showSuccess = false;
    this.showCancel = false;
    this.showError = false;
  }

  private initConfig(): void {
    this.payPalConfig = {
      currency: 'USD',
      clientId: 'YOUR_CLIENT_ID',
      createOrderOnClient: (data) =>
        <ICreateOrderRequest>{
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'USD',
                value: this.data,
                breakdown: {
                  item_total: {
                    currency_code: 'USD',
                    value: this.data,
                  },
                },
              },
              items: [
                {
                  name: 'Item Name',
                  quantity: '1',
                  category: 'DIGITAL_GOODS',
                  unit_amount: {
                    currency_code: 'USD',
                    value: this.data,
                  },
                },
              ],
            },
          ],
        },
      advanced: {
        commit: 'true',
      },
      style: {
        label: 'paypal',
        layout: 'vertical',
      },
      onApprove: (data, actions) => {
        actions.order.get().then((details: any) => {});
      },
      onClientAuthorization: (data) => {
        this.showSuccess = true;
      },
      onCancel: (data, actions) => {
        this.showCancel = true;
      },
      onError: (err) => {
        this.showError = true;
      },
      onClick: (data, actions) => {
        this.resetStatus();
      },
    };
  }
}
