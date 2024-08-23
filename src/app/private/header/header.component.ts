
// angular import
import { Component, Output, EventEmitter, HostListener, Input } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { NgbCollapseModule, NgbDropdownModule, NgbModule, NgbNav, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgScrollbar, NgScrollbarModule } from 'ngx-scrollbar';
import { NgbNavOutlet } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../services/user.service';

// project import


import { IconModule, IconService } from '@ant-design/icons-angular';

import {
  BellOutline,
  SettingOutline,
  GiftOutline,
  MessageOutline,
  PhoneOutline,
  CheckCircleOutline,
  LogoutOutline,
  EditOutline,
  UserOutline,
  ProfileOutline,
  WalletOutline,
  QuestionCircleOutline,
  LockOutline,
  CommentOutline,
  UnorderedListOutline,
  ArrowRightOutline,
  GithubOutline,
  MenuUnfoldOutline, 
  MenuFoldOutline, 
  SearchOutline 
} from '@ant-design/icons-angular/icons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbComponent } from '../../privates/shared/components/breadcrumb/breadcrumb.component';
import { CardComponent } from '../../privates/shared/components/card/card.component';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from '../../services/http.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgClass,NgbNav,NgScrollbar,NgbNavOutlet,CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BreadcrumbComponent,
    NgbDropdownModule,
    NgbNavModule,
    NgbModule,
    NgbCollapseModule,
    NgScrollbarModule,
    CardComponent,
    IconModule,RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  user: any;
  // public props
  @Output() NavCollapse = new EventEmitter();
  @Output() NavCollapsedMob = new EventEmitter();
  @Input() styleSelectorToggle!: boolean;
  @Input() navCollapsed!: boolean;
  @Output() Customize = new EventEmitter();
  windowWidth: number;
  screenFull: boolean = true;
  userProfile: any;


  //navCollapsed!: any;
  navCollapsedMob;

  // Constructor
  constructor(private iconService: IconService, private route: Router,   private httpService: HttpService,
    private toastr: ToastrService,
    private userService: UserService
    ) {
    this.windowWidth = window.innerWidth;
    this.navCollapsedMob = false;
    this.windowWidth = window.innerWidth;
    this.iconService.addIcon(
      ...[
        CheckCircleOutline,
        GiftOutline,
        MessageOutline,
        SettingOutline,
        PhoneOutline,
        LogoutOutline,
        UserOutline,
        EditOutline,
        ProfileOutline,
        QuestionCircleOutline,
        LockOutline,
        CommentOutline,
        UnorderedListOutline,
        ArrowRightOutline,
        BellOutline,
        GithubOutline,
        WalletOutline,
        MenuUnfoldOutline, 
        MenuFoldOutline, 
        SearchOutline
      ]
    );
  }

  
  @HostListener('window:resize', ['$event'])
  // eslint-disable-next-line
  onResize(event: any): void {
    this.windowWidth = event.target.innerWidth;
    this.navCollapseMob();
  }



  ngOnInit(): void {
    this.userService.userProfileObservable.subscribe({
      next: (userProfile)=>{
        this.userProfile = userProfile;
      },
      error: (err) => console.error('Error occured:',err)
    });
  }

  // public method
  navCollapse() {
    if (this.windowWidth >= 1025) {
      this.navCollapsed = !this.navCollapsed;
      this.NavCollapse.emit();
    }
  }
logout(){
  localStorage.removeItem("token");
  this.route.navigate(['/login']);
}
  navCollapseMob() {
    if (this.windowWidth < 1025) {
      this.NavCollapsedMob.emit();
    }
  }
  profile = [
    {
      icon: 'edit',
      title: 'Edit Profile',
      url:'/profile/update-profile'
    },
    {
      icon: 'user',
      title: 'View Profile',
      url:'/profile'
    },
    {
      icon: 'lock',
      title: 'Change Password',
      url:'/profile/change-password'
    },
 
    {
      icon: 'wallet',
      title: 'Billing'
    }
  ];

  setting = [
    {
      icon: 'question-circle',
      title: 'Support'
    },
    {
      icon: 'user',
      title: 'Account Settings'
    },
    {
      icon: 'lock',
      title: 'Privacy Center'
    },
    {
      icon: 'comment',
      title: 'Feedback'
    },
    {
      icon: 'unordered-list',
      title: 'History'
    }
  ];

}
