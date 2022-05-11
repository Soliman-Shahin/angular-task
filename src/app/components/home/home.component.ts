import { Component, OnInit } from '@angular/core';
import { AdvertisementsService } from 'src/app/services/advertisements.service';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['id', 'file', 'type', 'from_time', 'to_time', 'update', 'delete'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  user$ = this.usersService.currentUserProfile$;

  constructor(
    private usersService: UsersService,
    private advertisementsServices: AdvertisementsService
  ) { }

  ngOnInit(): void {
    this.getAds();
  }

  getAds(): void {
    this.advertisementsServices.getAds().subscribe((data) => {
      if (data) {
        this.dataSource = data;
      }
    })
  }
}
