import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { StoreService } from '../../../services/store/store.service';
import { AuthService } from '../../../services/auth/auth.service';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { User } from '../../../models/user.model';
import { Category } from '../../../models/category.model';

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
    private categoriesService: CategoriesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.storeService.myCart$.subscribe((products) => {
      this.counter = products.length;
    });

    this.getAllCategories();
    this.authService.user$.subscribe((data) => (this.profile = data));
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  login() {
    this.authService
      .loginAndGet('john@mail.com', 'changeme')
      .subscribe((user) => {
        this.router.navigate(['/profile']);
      });
  }

  logout() {
    this.authService.logout();
    this.profile = null;
    this.router.navigate(['/home']);
  }

  getAllCategories() {
    this.categoriesService
      .getAll()
      .subscribe((data) => (this.categoriesList = data));
  }
}
