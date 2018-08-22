import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '../../../../../node_modules/@angular/router';
import { UserAccount } from '../../../models/users';
import { NgbModal, ModalDismissReasons } from '../../../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { ToastrService } from '../../../../../node_modules/ngx-toastr';

@Component({
  selector: 'app-modal-create',
  templateUrl: './modal-create.component.html',
  styleUrls: ['./modal-create.component.css']
})
export class ModalCreateComponent implements OnInit {
  public error: string;
  public user: UserAccount;

  closeResult: string;

  constructor(private modalService: NgbModal, private authService: AuthService, private _router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.user = new UserAccount();
  }

  createThisUser() {
    this.authService.createUser(this.user.email, this.user.password, this.user.name)
    .then(() => {
      this.authService.authUser.subscribe((user) => { // nos suscribimos para conseguir el uid para la ruta.
        this._router.navigate([`/home`]);
    });
    })
    .catch((err) => {
      console.log(err);
      this.error = err.message;
      this.toastr.error(this.error);
    });
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  // Para tener el id en la ruta
  // ========================================================================
  // createThisUser() {
  //   this.authService.createUser(this.user.email, this.user.password, this.user.name)
  //   .then(() => {
  //     this.authService.authUser.subscribe((user) => { // nos suscribimos para conseguir el uid para la ruta.
  //       this._router.navigate([`/home/${user.uid}`]);
  //   });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     this.error = err.message;
  //     this.toastr.error(this.error);
  //   });
  // }

}


