import { AppService } from './appservice.service';
import { Component, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { MenuItem, PrimeNGConfig} from "primeng/api";
import { FormBuilder, FormGroup} from "@angular/forms";
import { Password } from 'primeng/password';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'workshop-fontend';

  date: Date;
  list_Menu: MenuItem[];
  list_Users: MenuItem[];
  list_Warn: MenuItem[];

  admin_name: string;
  user: string = "admin";
  pass: string = "cpe2564";
  //logIn_logOut: string;

  isLogin: boolean; //สถานะการ log in
  isRegisterAdmin_Form: boolean;
  isChangPassWord_Form: boolean;
  isSetTemperature_form: boolean;
  isLogout_form: boolean; //เช็คสถานะออกจากระบบ
  isDelect_Form: boolean;
  message_error_Login: string; //ข้อความแจ้งเตือนกรณี user หรือ pass ไม่ถูกต้อง
  message_error_Changpassword: string;
  message_error_Register: string;

  listAdmin: any;

  //items: any[];
  items: MenuItem[];

  formLogin: FormGroup;
  formRegister: FormGroup;
  formChanePassword: FormGroup;
  formTemperature: FormGroup;
  formDelect: FormGroup;

  constructor(@Inject(FormBuilder) fb: FormBuilder
    , private appService: AppService
    , private primengConfig: PrimeNGConfig
    , private router: Router
    , private activatedRoute: ActivatedRoute) {

    this.isLogin = false;
    this.isRegisterAdmin_Form = false;
    this.isChangPassWord_Form = false;
    this.isSetTemperature_form = false;
    this.isLogout_form = false;
    this.isDelect_Form = false;

    this.formLogin = fb.group({
      username: fb.control(''),
      password: fb.control(''),
      remember: fb.control(false)
    });

    this.formRegister = fb.group({
      username: fb.control(''),
      password: fb.control(''),
      confirmPassword: fb.control(''),
      type_admin: fb.control(null)
    });

    this.formChanePassword = fb.group({
      password: fb.control(''),
      confirmPassword: fb.control('')
    });

    this.formTemperature = fb.group({
      temperature: fb.control(37.0)
    })

    this.formDelect = fb.group({
      username: fb.control('')
    });

  }

  ngOnInit() {

    this.primengConfig.ripple = true;
    this.check_Login();

    this.list_Menu = [
      {
        label: "หน้าแรก",
        icon: "pi pi-fw pi-home",
        command: () => {
          this.display_Home();
        },
      },
      {
        label: "ตารางแสดงผล",
        icon: "pi pi-fw pi-table",
        command: () => {
          this.display_Table();
        },
      },
      {
        label: "ค้นหาข้อมูล",
        icon: "pi pi-fw pi-search",
        command: () => {
          this.display_SearchInformation();
        },
      },
      {
        label: "รายงาน",
        icon: "pi pi-fw pi-file-pdf",
        command: () => {
          this.display_Export();
        },
      },
    ];

    this.list_Warn = [
      {
        label: "รายการแจ้งเตือน",
      },
      {
        separator: true,
        items: [
          {
            label: "ตรวจพบอุณหภูิเกินที่กำหนด",
            icon: "pi pi-circle-on",
          },
          {
            label: "ตรวจพบอุณหภูิเกินที่กำหนด",
            icon: "pi pi-circle-on",
          },
        ],
      },
    ];
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   console.log("ngOnChanges: ", changes);
  // }

  register(): void {
    if (this.isLogin === false) {
      this.onLogin();
    } else {
      this.isRegisterAdmin_Form = true;
    }
  }

  changPassWord(): void {
    if (this.isLogin === false) {
      this.onLogin();
    } else {
      this.isChangPassWord_Form = true;
    }
  }

  setTemperature(): void {
    if (this.isLogin === false) {
      this.onLogin();
    } else {
      this.isSetTemperature_form = true;
    }
  }

  onLogout(): void {
    this.isLogin = false;
    this.check_Login();

    if (this.formLogin.value.remember === false) {
      // ถ้าไม่ติกให้จดจำฉันไว้ให้ username, password = ค่าว่าง
      this.formLogin.setValue({ username: '', password: '', remember: false });
    }
  }
  onLogin(): void {
    this.isLogout_form = true;
  }

  onSubmit_Login(): void {
    // alert("submit login")
    if (this.formLogin.value.username === '' && this.formLogin.value.password === '') {
      this.message_error_Login = "ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง.";
    } else {
      this.appService.login(this.formLogin.value).subscribe((response) => {
        this.isLogin = true;
        this.isLogout_form = false;
        this.message_error_Login = '';
        this.check_Login();
        // console.log(response);
      }, (error) => {
        console.log(error);
        this.message_error_Login = "ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง.";
      });
    }
  }

  onCancel_Login(): void {
    this.message_error_Login = "";
    this.isLogout_form = false;

    if (this.formLogin.value.remember === false) {
      //เคลียร์ค่า Username และ Password ในหน้า login
      this.formLogin.setValue({ username: '', password: '', remember: false });
    }
  }

  onDelect(): void {
    if (this.isLogin === false) {
      this.onLogin();
    } else {
      this.updateListAdmin();
    }
  }

  onSubmit_Delect(event: any): void {
    console.log('event ', event)
    let dataDelectAdmin = {
      username: event.username
    };
    if (event.type_admin === 'root') {
      alert('คุณไม่สามารถลบผู้ดูแลที่มีสิทธิ์เป็น root ได้');
    } else {
      this.appService.delectAdmin(dataDelectAdmin).subscribe((response) => {
        // console.log(response);
        this.updateListAdmin();
        this.isDelect_Form = true;
        alert('ลบผู้ดูแล ' + event.username + ' เรียบร้อยแล้ว');
      }, (error) => {
        console.log(error);
      });
    }
  }

  updateListAdmin(): void {
    this.appService.fetchAllAdmin().subscribe((response) => {
      // console.log(response);
      this.listAdmin = response;
      this.isDelect_Form = true;
    }, (error) => {
      console.log(error);
    });
  }

  check_Login(): void {
    //ตรวจสอบ form หน้า login ถ้าล็อกอินแสดงรูปแบบที่1 ไม่ล็อกอินแสดงรูปแบบที่2
    if (this.isLogin === false) {
      //เช็คว่ามีการ login หรือไม่
      this.admin_name = "Sign in";
      this.list_Users = [
        {
          label: "เพิ่มสมาชิก",
          icon: "pi pi-fw pi-user-plus",
          command: () => {
            this.register();
          },
        },
        {
          label: "เปลี่ยนรหัสผ่าน",
          icon: "pi pi-fw pi-lock",
          command: () => {
            this.changPassWord();
          },
        },
        {
          label: "ตั้งค่าอุณหภูมิ",
          icon: "pi pi-fw pi-sliders-h",
          command: () => {
            this.setTemperature();
          },
        },
        {
          label: "ลบสมาชิก",
          icon: "pi pi-fw pi-user-minus",
          command: () => {
            this.onDelect();
          },
        },
        {
          label: "เข้าสู่ระบบ",
          icon: "pi pi-fw pi-sign-in",
          command: () => {
            this.onLogin();
          },
        },
      ];
    } else {
      this.admin_name = this.formLogin.value.username;
      this.list_Users = [
        {
          label: "เพิ่มสมาชิก",
          icon: "pi pi-fw pi-user-plus",
          command: () => {
            this.register();
          },
        },
        {
          label: "เปลี่ยนรหัสผ่าน",
          icon: "pi pi-fw pi-lock",
          command: () => {
            this.changPassWord();
          },
        },
        {
          label: "ตั้งค่าอุณหภูมิ",
          icon: "pi pi-fw pi-sliders-h",
          command: () => {
            this.setTemperature();
          },
        },
        {
          label: "ลบสมาชิก",
          icon: "pi pi-fw pi-user-minus",
          command: () => {
            this.onDelect();
          },
        },
        {
          label: "ออกจากระบบ",
          icon: "pi pi-fw pi-sign-out",
          command: () => {
            this.onLogout();
          },
        },
      ];
    }
  }

  onChangPassword(): void {
    if (this.formChanePassword.value.password === "" || this.formChanePassword.value.confirmPassword === "") {
      this.message_error_Changpassword = "กรุณาใส่รหัสผ่าน.";
    } else if (this.formChanePassword.value.password === this.formChanePassword.value.confirmPassword) {
      this.isChangPassWord_Form = false;

      let dataChangePassword = {
        username: this.formLogin.value.username,
        password: this.formChanePassword.value.password
      };
      this.appService.changePassword(dataChangePassword).subscribe((response) => {
        console.log('change password:', dataChangePassword);
        console.log('response ', response);
        this.message_error_Changpassword = "";
        this.formChanePassword.setValue({ password: '', confirmPassword: '' });
      }, (error) => {
        console.log(error);
      })
    } else {
      this.message_error_Changpassword = "รหัสผ่านไม่ตรงกัน.";
      this.formChanePassword.setValue({ password: '', confirmPassword: '' });
    }
  }
  onCancel_ChangPassword(): void {
    this.isChangPassWord_Form = false;
    this.message_error_Changpassword = "";
    this.formChanePassword.setValue({
      password: '',
      confirmPassword: ''
    })
  }

  onSetTemPeraTure(): void {
    this.isSetTemperature_form = false;
  }

  onRegisterAdmin(): void {

    const dateTime = new Date();
    // console.log("time ",dateTime.toLocaleTimeString("en-GB", { timeZone: "Asia/Bangkok" }));
    // console.log("date ",dateTime.toLocaleDateString("en-GB", { timeZone: "Asia/Bangkok" }));

    let dataRegister = {
      date: dateTime.toLocaleDateString("en-GB", { timeZone: "Asia/Bangkok" }),
      time: dateTime.toLocaleTimeString("en-GB", { timeZone: "Asia/Bangkok" }),
      username: this.formRegister.value.username,
      password: this.formRegister.value.password,
      type_admin: this.formRegister.value.type_admin
    }

    if (this.formRegister.value.username === ''
      || this.formRegister.value.password === ''
      || this.formRegister.value.confirmPassword === '') {

      this.message_error_Register = "กรุณาใส่ชื่อผู้ใช้งานและรหัสผ่าน.";

    } else if (this.formRegister.value.password !== this.formRegister.value.confirmPassword) {
      this.message_error_Register = "กรุณาใส่รหัสผ่านให้ตรงกัน.";
    } else {
      // กดเพิ่มสมาชิก จะทำอะไรต่อ คำสั่ง
      this.appService.register(dataRegister).subscribe((response) => {
        this.isRegisterAdmin_Form = false;
        this.message_error_Register = "";
        console.log('response ', response)

        this.formRegister.setValue({
          username: '',
          password: '',
          confirmPassword: '',
          type_admin: null
        });

      }, (error) => {
        console.log(error);
        alert('มีชื่อผู้ใช้และรหัสผ่านนี้แล้ว.');
        this.formRegister.setValue({
          username: '',
          password: '',
          confirmPassword: '',
          type_admin: null
        });
      });
    }
  }

  onCancel_RegisterAdmin(): void {
    this.isRegisterAdmin_Form = false;
    this.message_error_Register = '';
    this.formRegister.setValue({
      username: '',
      password: '',
      confirmPassword: '',
      type_admin: null
    });
  }

  display_Home(): void {
    this.router.navigate(
      ["home"],
      { relativeTo: this.activatedRoute.parent });
  }
  display_Table(): void {
    this.router.navigate(
      ["display-table"],
      { relativeTo: this.activatedRoute.parent });
  }
  display_SearchInformation(): void {
    this.router.navigate(
      ["search-information"],
      { relativeTo: this.activatedRoute.parent });
  }
  display_Export(): void {
    this.router.navigate(
      ["export"],
      { relativeTo: this.activatedRoute.parent });
  }
}
