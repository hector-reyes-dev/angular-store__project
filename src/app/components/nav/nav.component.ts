import { Component, OnInit, Input } from '@angular/core';

import { StoreService } from '../../services/store/store.service';
import { AuthService } from '../../services/auth/auth.service';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { User } from '../../models/user.model';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  @Input() userEmail = '';
  activeMenu = false;
  counter = 0;
  profile: User | null = null;
  categoriesList: Category[] = [];

  constructor(
    private storeService: StoreService,
    private authService: AuthService,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.storeService.myCart$.subscribe((products) => {
      this.counter = products.length;
    });

    this.getAllCategories();
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  login() {
    this.authService
      .loginAndGet('john@mail.com', 'changename')
      .subscribe((user) => {
        this.profile = user;
      });
  }

  getAllCategories() {
    this.categoriesService
      .getAll()
      .subscribe((data) => (this.categoriesList = data));
  }
}
