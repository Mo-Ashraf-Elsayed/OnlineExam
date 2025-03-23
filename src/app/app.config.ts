import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { environment } from '../environment/environment';
import { baseURL } from 'elevate-auth-api';
import { provideToastr } from 'ngx-toastr';
import { errorInterceptor } from './core/interceptors/errors/error.interceptor';
import { successInterceptor } from './core/interceptors/success/success.interceptor';
import { provideStore } from '@ngrx/store';
import { tokenReducer } from './shared/store/token.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withHashLocation()),
    provideClientHydration(withEventReplay()),
    provideHttpClient(
      withFetch(),
      withInterceptors([successInterceptor, errorInterceptor])
    ),
    provideAnimations(),
    provideToastr(),
    {
      provide: baseURL,
      useValue: environment.baseURL,
    },
    provideStore({
      token: tokenReducer,
    }),
  ],
};
