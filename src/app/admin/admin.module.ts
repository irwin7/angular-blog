import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AdminLoginComponent } from "./admin-login/admin-login.component";
import { AdminLayoutComponent } from "./shared/components/admin-layout/admin-layout.component";
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { CreatePageComponent } from './create-page/create-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AuthService } from "./shared/services/auth.service";
import { SharedModule } from "./shared/shared.module";
import { AuthGuard } from "./shared/services/auth.guard";
import { PostsService } from "../shared/posts.service";

@NgModule({
  declarations: [
    AdminLayoutComponent,
    DashboardPageComponent,
    CreatePageComponent,
    EditPageComponent,
    AdminLoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '', component: AdminLayoutComponent, children: [
          { path: 'login', component: AdminLoginComponent },
          { path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuard] },
          { path: 'create', component: CreatePageComponent, canActivate: [AuthGuard] },
          { path: 'post/:id/edit', component: EditPageComponent, canActivate: [AuthGuard] },
        ]
      }
    ])
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    PostsService
  ]
})
export class AdminModule { }