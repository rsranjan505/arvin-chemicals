import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
// import { HeaderComponent } from "../header/header.component";
// import { FooterComponent } from "../footer/footer.component";

@Component({
  standalone: true,
  selector: 'app-main-layout',
  imports: [RouterOutlet],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {

}
