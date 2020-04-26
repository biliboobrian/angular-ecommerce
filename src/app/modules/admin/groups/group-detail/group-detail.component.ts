import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GroupsService } from 'src/app/services/groups.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.css']
})
export class GroupDetailComponent implements OnInit {

  submitted = false;
  id = null;

  groupForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('')
  });

  constructor(
    private groupsService: GroupsService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.groupsService.getGroup(this.id).subscribe(group => {
        this.groupForm.patchValue(group);
      })
    }
  }

  saveGroup() {
    this.submitted = true;

    if (this.groupForm.valid) {
      if (this.id) {
        this.groupsService.updateGroup({ id: this.id, ...this.groupForm.value }).then(() => {
          this.router.navigate(['admin', 'groups']);
        });
      } else {
        this.groupsService.createGroup(this.groupForm.value).then(() => {
          this.router.navigate(['admin', 'groups']);
        });
      }

    }
  }

  back() {
    this.location.back();
  }

}
