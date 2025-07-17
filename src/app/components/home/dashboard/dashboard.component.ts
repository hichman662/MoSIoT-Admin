import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions, ChartType } from "chart.js";
import { Session } from 'src/app/models/User/session';
import { User } from 'src/app/models/User/user';
import { UserService } from 'src/app/services/user.service';
import { SweetAlertsComponent } from '../../shared/sweet-alerts/sweet-alerts.component';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  users!:User[];
  sessions!:Session[];
  cargando:boolean = false;
  token!:string;

  public lineChartData!: ChartConfiguration<'line'>['data'];
  public lineChartOptions: ChartOptions<'line'> = { responsive: false };
  public lineChartLegend = true;
  public lineChartDataset = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  public pieChartOptions: ChartOptions<'pie'> = { responsive: false };
  public pieChartLabels:string[] = [];
  public pieChartDatasets!:any;
  public pieChartLegend = true;
  public pieChartPlugins = [];
  
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData!: ChartConfiguration<'bar'>['data'];
  public barChartOptions: ChartConfiguration<'bar'>['options'] = { responsive: false };

  constructor(private sweetAlert: SweetAlertsComponent, private userService: UserService) { }

  ngOnInit(): void {
    this.token = sessionStorage.getItem('token')!;
    if(this.token == null || this.token == ''){
      this.sweetAlert.loginRequired();
    }
    else{
      this.loadDashboard();
    
      this.barChartData = {
        labels: ['2020', '2021', '2022'],
        datasets: [
          { data: [0, 10, 25], label: 'Caregiver' },
          { data: [0, 20, 50], label: 'Patient' },
          { data: [0, 5, 10], label: 'Administrator' },
        ],
      };
    }
  }

  loadDashboard(){
    this.userService.getAllUsers().subscribe({
      next: result => {
        this.users = result;
      },
      error: error => {
        this.sweetAlert.readError("statistics data","error getting users statistics");
      },
      complete: () => {
        this.getSessions();
      }
    })
  }

  getSessions(){  
    let pieChartDatasetsArray:number[] = [];
    this.users.forEach(user => {
      this.pieChartLabels.push(user.Name);
      pieChartDatasetsArray.push(user.DameTiempoTotalSesiones);

      this.userService.getAllUserSessions(user.Id).subscribe({
        next: result => {
          this.sessions = result;
        },
        error: error => {
          this.sweetAlert.readError("sessions data","error getting user sessions statistics");
        },
        complete: () => {
          this.loadLineSessionDashboard();
        }
      })
    })

    this.pieChartDatasets = [ {
      data: pieChartDatasetsArray
    },];
  }

  loadLineSessionDashboard(){
    this.sessions.forEach(session =>{
      this.lineChartDataset[new Date(session.StartTime).getDay() - 1] += 1;
    })

    this.lineChartData = {
      labels: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ],
      datasets: [
        {
          data: this.lineChartDataset,
          label: 'Total Sessions',
          fill: true,
          tension: 0.5,
          borderColor: 'black',
          backgroundColor: 'hsl(0, 100%, 30%)'
        }
      ]
    };
  }

}
