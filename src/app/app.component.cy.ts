import { provideAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { ConfirmDialogComponent } from './shared/components/confirm-dialog.component.ts/confirm-dialog.component.ts.component';
import { HeaderComponent } from './views/header/header.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule, provideRouter } from '@angular/router';
import { NavigationComponent } from './views/navigation/navigation.component';
import { ROUTES } from './routes';
import { importProvidersFrom } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

describe('AppComponent', () => {

    beforeEach(() => {
        cy.mount(AppComponent, {
            imports: [
                HeaderComponent,
                ConfirmDialogComponent,
                MatSidenavModule,
                NavigationComponent,
            ],
            providers: [
                importProvidersFrom([AngularFireModule.initializeApp(environment.firebaseConfig)]),
                provideAnimations(),
                provideRouter(ROUTES),
            ]
        });
    })


    it('Should have title', () => {
        cy.get('h1').should('have.text', 'My Home Manager');
    });

    // it('should create AppComponent', () => {
    //     expect(component).toBeTruthy();
    //   });
    
    //   it('should have sidenav-container with fixedInViewport option set to true', () => {
    //     const matSidenavContainer = fixture.debugElement.query(By.css('mat-sidenav-container'));
    //     expect(matSidenavContainer.attributes['fixedInViewport']).toBe('true');
    //   });
    
    //   it('should have sidenav with mode set to over', () => {
    //     const matSidenavContainer = fixture.debugElement.query(By.css('mat-sidenav'));
    //     expect(matSidenavContainer.attributes['mode']).toBe('over');
    //   });
    
    //   it('should have mat-sidenav-content created', () => {
    //     const matSidenavContent = fixture.debugElement.query(By.css('mat-sidenav-content'));
    //     expect(matSidenavContent).toBeTruthy();
    //   });
})