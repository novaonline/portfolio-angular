import { VisualStatusService } from './services/visual-status.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from './components/navigation/navigation.component';
import { VisualStatusComponent } from './components/visual-status/visual-status.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EducationComponent } from './components/education/education.component';
import { InterestComponent } from './components/interest/interest.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { ContactComponent } from './components/contact/contact.component';
import { CardComponent } from './components/card/card.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "education", component: EducationComponent },
  { path: "interest", component: InterestComponent },
  { path: "projects", component: ProjectsComponent },
  { path: "experience", component: ExperienceComponent },
  { path: "contact", component: ContactComponent },
  { path: "**", component: HomeComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProjectsComponent,
    NavigationComponent,
    VisualStatusComponent,
    EducationComponent,
    InterestComponent,
    ExperienceComponent,
    ContactComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
  ],
  providers: [VisualStatusService],
  bootstrap: [AppComponent]
})
export class AppModule { }
