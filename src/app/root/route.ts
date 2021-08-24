// tslint:disable: object-literal-shorthand
import { NavigationGuard } from '../shared/services/navigation-guard.service';
import { HomePageComponent } from './component/home-page/home-page.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';

export const authFailedRedirection: any = [
    {
        redirectTo: '/login',
    }
];

export const routes = [
    // {
    //     path: '',
    //     component: HomePageComponent
    // },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
        // children: [{
        //     path: '',
        //     redirectTo: 'courses',
        //     pathMatch: 'full'
        // }]
    },
    {
        path: 'login',
        loadChildren: () => import('../login/login.module').then(m => m.LoginModule),
        canActivate: [NavigationGuard],
        data: {
            authFailedRedirection: authFailedRedirection
        }
    },
    {
        path: 'home',
        component: HomePageComponent,
        canActivate: [NavigationGuard],
        data: {
            authFailedRedirection: authFailedRedirection
        }
    },
    {
        path: '404',
        component: PageNotFoundComponent
    },
    {
        path: '**',
        redirectTo: '/404'
    }
];

