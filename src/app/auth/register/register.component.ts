import {Component, OnInit} from '@angular/core';
import {Player} from '../../models/player.model';
import {User} from '../../models/user.model';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {PlayerValidators} from '../../player/player.validators';
import {FileInput, FileValidator} from 'ngx-material-file-input';
import {AuthService} from '../../shared/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  error: any;

  player: Player = new Player(-1, '', -1, '', '', '', new User(-1, '', '', ['player']));

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.createForm();
  }

  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('password').value !== c.get('confirmPassword').value) {
      return {invalid: true};
    }
  }

  createForm() {
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(6)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      pwd: new FormGroup({
          password: new FormControl(undefined, [Validators.required, Validators.minLength(4)]),
          confirmPassword: new FormControl(undefined)
        }, [this.passwordConfirming]
      ),
    });
  }

  get name() {
    return this.registerForm.get('name');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('pwd.password');
  }

  get confirmPassword() {
    return this.registerForm.get('pwd.confirmPassword');
  }


  onSubmit() {
    this.player.name = this.name.value;
    this.player.user.email = this.email.value;
    this.player.user.name = `${this.player.name}`;
    const pwd = this.password.value;
    this.authService.onRegister({player: this.player, pwd: this.password.value})
      .subscribe(data => {
          this.router.navigate(['/']);
        },
        error => {
          console.log('erreur en retour : ', error);
          this.error = error;
          this.loading = false;
        });
  }
}
