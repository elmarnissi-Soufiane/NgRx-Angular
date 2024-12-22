import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-form.component.html',
  styleUrl: './edit-form.component.css',
})
export class EditFormComponent implements OnInit {
  // recupere id depuis l'url
  productId: number;

  submitted: boolean = false;

  productFormGroup?: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductsService,
    private _formebuilder: FormBuilder
  ) {
    // recupere id depuis l'url
    this.productId = activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    let prodById = this.productService.getProdutById(this.productId);
    prodById.subscribe((data) => {
      console.log('data edit:', data);

      return (this.productFormGroup = this._formebuilder.group({
        id: [data.id, Validators.required],
        name: [data.name, Validators.required],
        price: [data.price, Validators.required],
        quantity: [data.quantity, Validators.required],
        selected: [data.selected, Validators.required],
        available: [data.available, Validators.required],
      }));
    });
  }

  onUpdateProduct() {
    this.submitted = true;
    let update = this.productService.updateProduct(
      this.productFormGroup?.value
    );
    update.subscribe((data) => {
      alert('updated  ');
    });
  }
}
