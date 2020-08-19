import {Component, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource, MatSnackBar} from '@angular/material';
import { HttpClient } from '@angular/common/http';
class RepoData {
  incomplete_results: boolean;
  items: [];
  total_count: number;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  displayedColumns = ['full_name', 'description', 'language', 'stargazers_count', 'updated_at'];
  dataSource: MatTableDataSource<RepoData>;
  total_count = 0;
  RepoItems: [];
  showLoader = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public http: HttpClient, private _snackBar: MatSnackBar) {

    this.dataSource = new MatTableDataSource(this.RepoItems);
  }

  // tslint:disable-next-line: use-life-cycle-interface
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    this.getRepoDataSource(filterValue);
  }

  GetFormattedDate(psDate: string) {
    const todayTime = new Date(psDate);
    const month = todayTime.getMonth();
    const day = todayTime.getDate();
    const year = todayTime.getFullYear();
    return day + '/' + month + '/' + year;
  }

  getRepoDataSource(filterValue: string) {
    this.showLoader = true;
    if (filterValue) {
      this.http.get('https://api.github.com/search/repositories?per_page=100&q=' + filterValue).
      subscribe(data => {
        if (data) {
          console.log(data);
          const Repos = Object.assign(new RepoData(), data);
          this.RepoItems = Repos.items;
          this.total_count = Repos.total_count;

          this.dataSource = new MatTableDataSource(this.RepoItems);
          setTimeout(() => this.dataSource.paginator = this.paginator);
          if (this.total_count === 0) {
            this._snackBar.open('No repositories found for this keyword', 'close', {
              duration: 2000
            });
          }
        }
        this.showLoader = false;
      });
    } else {
      this.dataSource = new MatTableDataSource([]);
      this.total_count = 0;
      this._snackBar.open('Enter search text to search', 'close', {
        duration: 2000
      });
      this.showLoader = false;
    }
  }
}
