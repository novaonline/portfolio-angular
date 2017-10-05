import { VisualStatusService } from './services/visual-status-service/visual-status.service';
import { ContentService } from './services/content-service/content.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from './components/navigation/navigation.component';
import { VisualStatusComponent } from './components/visual-status/visual-status.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardComponent } from './components/card/card.component';
import { ContentComponent } from './components/content/content.component';
import { VisualResolvePipe } from './pipes/visual-resolve.pipe';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: ":content", component: ContentComponent },
  { path: "**", component: HomeComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationComponent,
    VisualStatusComponent,
    CardComponent,
    ContentComponent,
    VisualResolvePipe
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [VisualStatusService, ContentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
