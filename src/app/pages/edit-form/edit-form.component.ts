import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import {
  EditProductAction,
  UpdateProductAction,
} from '../../ngrx/storeproducts/actions/prodcuts.actions';
import {
  ProductsState,
  ProductStateEnum,
} from '../../ngrx/storeproducts/reducers/products.reducers';
import { Router, RouterLink } from '@angular/router';

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

  // un bollean qui permet d'afficher le form
  formBuild: boolean = false;

  productFormGroup?: FormGroup;
  readonly ProductStateEnum = ProductStateEnum;

  // le cas d'erreur
  state: ProductsState | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private _formebuilder: FormBuilder,
    private store: Store<any>,
    private router: Router
  ) {
    // recupere id depuis l'url
    this.productId = activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.store.dispatch(new EditProductAction(this.productId));
    this.store.subscribe((state) => {
      // alors que on essayer de prendre de puis mle module alors c'est config forEffect catalogueState
      this.state = state.catalogueState;

      // loaded pour remplire
      if (this.state?.dataState == ProductStateEnum.LOADED) {
        // verfifer est ce que à recupere ID
        if (this.state?.currectProductUpdate != null) {
          this.productFormGroup = this._formebuilder.group({
            // recuprere id depuis state l'attribut qu'on à essayer de passer currecntUpdateProduct

            id: [this.state.currectProductUpdate.id],
            name: [this.state.currectProductUpdate.name, Validators.required],
            price: [this.state.currectProductUpdate.price, Validators.required],
            quantity: [
              this.state.currectProductUpdate.quantity,
              Validators.required,
            ],
            selected: [
              this.state.currectProductUpdate.selected,
              Validators.required,
            ],
            available: [
              this.state.currectProductUpdate.available,
              Validators.required,
            ],
          });
          this.formBuild == true;
        }
      }
    });
  }

  /*
  ngOnInit(): void {
  this.store.dispatch(new EditProductAction(this.productId));

  this.store.subscribe((state) => {
    this.state = state.catalogueState;

    if (this.state?.dataState === ProductStateEnum.LOADED && this.state.currectProductUpdate != null) {
      const currentProduct = this.state.currectProductUpdate;

      // Dynamically create the form group
      const formGroupControls = {};
      for (let f in currentProduct) {
        if (currentProduct.hasOwnProperty(f)) {
          // @ts-ignore
          formGroupControls[f] = new FormControl(currentProduct[f], Validators.required);
        }
      }

      this.productFormGroup = this._formebuilder.group(formGroupControls);
    }
  });
}

  */

  onUpdateProduct() {
    this.submitted = true;
    if (this.productFormGroup?.invalid) return;
    this.store.dispatch(new UpdateProductAction(this.productFormGroup?.value));
    //console.log('hey there');
  }

  okUpdateProduct() {
    this.router.navigateByUrl('/products');
  }
}
