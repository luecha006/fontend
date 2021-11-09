import { Component, OnInit, OnChanges, SimpleChanges } from "@angular/core";
import { Router } from "@angular/router";
import { MenuItem, PrimeNGConfig, SelectItem } from "primeng/api";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'workshop-primeng12';

  date: Date;
  list_Menu: MenuItem[];
  list_Users: MenuItem[];
  list_Warn: MenuItem[];

  admin_name: string;
  user: string = "admin";
  pass: string = "cpe2564";
  //logIn_logOut: string;

  isLogin: boolean; //สถานะการ log in
  isAddUser_Form: boolean;
  isChangPassWord_Form: boolean;
  isSetTemperature_form: boolean;
  isLogout_form: boolean; //เช็คสถานะออกจากระบบ
  remember_Me: boolean; //จดจำชื่อผู้ใช้งานนี้
  add_Username: string;
  add_Password: string;
  login_Username: string;
  login_Password: string;
  new_Password: string;
  new_Password1: string;
  new_Password2: string;
  message_error_Login: string; //ข้อความแจ้งเตือนกรณี user หรือ pass ไม่ถูกต้อง
  message_error_Changpassword: string;
  message_error_AddUser: string;
  start_Temperature: number;

  count: number = 0;
  //items: any[];
  items: MenuItem[];

  constructor(private primengConfig: PrimeNGConfig) {
    this.remember_Me = false;
    this.isLogin = false;
    this.start_Temperature = 37.5;
    this.add_Username = "";
    this.add_Password = "";
  }

  ngOnInit(): void {

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

  addUsers(): void {
    if (this.isLogin === false) {
      this.onLogin();
    } else {
      this.isAddUser_Form = true;
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
  }
  onLogin(): void {
    this.isLogout_form = true;
  }

  onClick_login(): void {
    if (
      this.login_Username === this.user &&
      this.login_Password === this.pass
    ) {
      this.isLogin = true;
      this.isLogout_form = false;
      this.message_error_Login = "";
    } else if (this.login_Username === "" && this.login_Password === "") {
      this.message_error_Login = "ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง.";
    } else {
      this.message_error_Login = "ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง.";
    }

    if (this.remember_Me === false) {
      this.login_Username = "";
      this.login_Password = "";
    }

    this.check_Login();
  }

  onCancel_Login(): void {
    this.message_error_Login = "";
    this.isLogout_form = false;

    if (this.remember_Me === false) {
      //เคลียร์ค่า Username และ Password ในหน้า login
      this.login_Username = "";
      this.login_Password = "";
    }
  }
  check_Login(): void {
    //ตรวจสอบ form หน้า login ถ้าล็อกอินแสดงรูปแบบที่1 ไม่ล็อกอินแสดงรูปแบบที่2
    if (this.isLogin === false) {
      //เช็คว่ามีการ login หรือไม่
      this.admin_name = "Sign in";
      console.log("isLogin == false");
      console.log("admin_name = log in");
      this.list_Users = [
        {
          label: "เพิ่มสมาชิก",
          icon: "pi pi-fw pi-user-plus",
          command: () => {
            this.addUsers();
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
          label: "เข้าสู่ระบบ",
          icon: "pi pi-fw pi-sign-in",
          command: () => {
            this.onLogin();
          },
        },
      ];
    } else {
      this.admin_name = "admin";
      console.log("isLogin == true");
      console.log("admin_name = admin");
      this.list_Users = [
        {
          label: "เพิ่มสมาชิก",
          icon: "pi pi-fw pi-user-plus",
          command: () => {
            this.addUsers();
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
          label: "ออกจากระบบ",
          icon: "pi pi-fw pi-sign-out",
          command: () => {
            this.onLogout();
          },
        },
      ];
    }
  }

  onClick_ChangPassword(): void {
    if (this.new_Password1 === "" || this.new_Password2 === "") {
      this.message_error_Changpassword = "กรุณาใส่รหัสผ่าน.";
    } else if (this.new_Password1 === this.new_Password2) {
      this.isChangPassWord_Form = false;
      this.new_Password = this.new_Password1;
      this.message_error_Changpassword = "";
    } else {
      this.message_error_Changpassword = "รหัสผ่านไม่ตรงกัน.";
      this.new_Password1 = "";
      this.new_Password2 = "";
    }
    this.new_Password1 = "";
    this.new_Password2 = "";
  }
  onCancel_ChangPassword(): void {
    this.isChangPassWord_Form = false;
    this.message_error_Changpassword = "";
    this.new_Password1 = "";
    this.new_Password2 = "";
  }

  onCleck_SetTemPeraTure(): void {
    this.isSetTemperature_form = false;
  }

  onCleck_AddUser(): void {
    if (this.add_Username === "" || this.add_Password === "") {
      this.message_error_AddUser = "กรุณาใส่ชื่อผู้ใช้งานและรหัสผ่าน.";
    } else {
      // this.add_Username = "";
      // this.add_Password = "";
      // กดเพิ่มสมาชิก จะทำอะไรต่อ คำสั่ง
      this.message_error_AddUser = "";
      this.isAddUser_Form = false;
    }
  }
  onCancel_AddUser(): void {
    this.message_error_AddUser = "";
    this.add_Username = "";
    this.add_Password = "";
    this.isAddUser_Form = false;
  }

  display_Home(): void {
    // this.router.navigate([{ outlets: { primary: "home" } }], {
    //   skipLocationChange: true,
    // });
  }
  display_Table(): void {
    // this.router.navigate([{ outlets: { primary: "display-table" } }], {
    //   skipLocationChange: true,
    // });
  }
  display_SearchInformation(): void {
    // this.router.navigate([{ outlets: { primary: "search-information" } }], {
    //   skipLocationChange: true,
    // });
  }
  display_Export(): void {
    // this.router.navigate([{ outlets: { primary: "export" } }], {
    //   skipLocationChange: true,
    // });
  }
}
