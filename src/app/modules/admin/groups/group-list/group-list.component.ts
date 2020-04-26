import { Component, OnInit, OnDestroy } from '@angular/core';
import { Group } from 'src/app/models/group';
import { GroupsService } from 'src/app/services/groups.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit, OnDestroy {

  groups: Group[];
  subGroups: Subscription;
  
  constructor( 
    private groupsService: GroupsService,
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.subGroups = this.groupsService.getGroups().subscribe(groups => {
      this.groups = groups;
    });
  }

  ngOnDestroy(): void {
    this.subGroups.unsubscribe();
  }

  addGroup() {
    this.router.navigate(['admin', 'groups', 'add']);
  }

  editGroup(group: Group) { 
    this.router.navigate(['admin', 'groups', 'edit', group.id]);
  }

  deleteGroup(group: Group) { 
    this.groupsService.deleteGroup(group.id);
  }

  confirmDelete(content, group: Group) {
    const ref = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.deleteGroup(group);
    }, (reason) => {
      
    });
    
  }
}
