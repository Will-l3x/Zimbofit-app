import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, Platform } from '@ionic/angular';
import { Subscription, combineLatest } from 'rxjs';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';
import { CategoryService } from './services/category.service';
import { ExerciseService } from './services/exercise.service';
import { OfflineService } from './services/offline.service';
import { PresenceService } from './services/presence.service';
import { ProgramService } from './services/program.service';
import { TrainerService } from './services/trainer.service';
import { UserLocationService } from './services/user-location.service';
import { UserService } from './services/user.service';
import { WorkoutService } from './services/workout.service';
import { Storage } from '@ionic/storage';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  user;
  offline;
  appPages = [
    {
      title: 'Dashboard',
      url: '/app/tabs/start',
      icon: 'play',
      requiresUser: true,
    },
    {
      title: 'Programs',
      url: '/app/tabs/programs',
      icon: 'fitness',
      count: 0,
    },
    {
      title: 'Trainers',
      url: '/app/tabs/trainers',
      icon: 'unlock',
      count: 0,
    },

    {
      title: 'Schedules',
      url: '/app/tabs/schedule',
      icon: 'calendar',
    },
    {
      title: 'Speakers',
      url: '/app/tabs/speakers',
      icon: 'contacts',
    },
    {
      title: 'Map',
      url: '/app/tabs/map',
      icon: 'map',
    },
    {
      title: 'About',
      url: '/app/tabs/about',
      icon: 'information-circle',
    },
  ];
  loggedIn = false;

  dataSubscription: Subscription;
  userSubscription: Subscription;
  offlineSubscription: Subscription;
  swUpdateSubscription: Subscription;

  constructor(
    private menu: MenuController,
    private platform: Platform,
    private router: Router,
    private storage: Storage,
    private userService: UserService,
    private presenceService: PresenceService,
    private offlineService: OfflineService,
    private programService: ProgramService,
    private workoutService: WorkoutService,
    private exerciseService: ExerciseService,
    private categoryService: CategoryService,
    private trainerService: TrainerService,
    private userLocationService: UserLocationService
  ) {
    this.user = this.userService.getCurrentUser().pipe(take(1)).toPromise();
    this.initializeApp();
  }

  async ngOnInit() {
    this.userSubscription = this.userService
      .getCurrentUser()
      .subscribe((user) => {
        // console.log(user);
        this.user = user;
        this.updateMenu();
      });

    this.presenceService.getCurrentUserPresence().subscribe((presence) => {
      // console.log(presence);
      this.offlineService.setStatus(presence !== 'online');
    });

    this.userLocationService.updateUserlocation();

    this.offlineSubscription = this.offlineService
      .isOffline()
      .subscribe((offline) => (this.offline = offline));
  }

  initializeApp() {
    // iOS only
    window.addEventListener('statusTap', () => {
      console.log('statusbar tapped');
    });

    // Display content under transparent status bar (Android only)
    StatusBar.setOverlaysWebView({ overlay: true });

    const setStatusBarStyleDark = async () => {
      await StatusBar.setStyle({ style: Style.Dark });
    };

    const setStatusBarStyleLight = async () => {
      await StatusBar.setStyle({ style: Style.Light });
    };

    const hideStatusBar = async () => {
      await StatusBar.hide();
      // Hide the splash (you should do this on app launch)
      await SplashScreen.hide();
    };

    const showStatusBar = async () => {
      await StatusBar.show();
    };
    this.platform.ready().then(() => {
      hideStatusBar();
    });
  }

  updateMenu() {
    const programs$ = this.programService.getPrograms();
    const workouts$ = this.workoutService.getWorkouts();
    const exercises$ = this.exerciseService.getExercises();
    const categories$ = this.categoryService.getCategories();
    const trainers$ = this.trainerService.getTrainers();

    this.dataSubscription = combineLatest([
      programs$,
      workouts$,
      exercises$,
      categories$,
      trainers$,
    ]).subscribe(([programs, workouts, exercises, categories, trainers]) => {
      this.appPages.forEach((page) => {
        if (page.title === 'Programs') {
          page.count = programs.length;
        } else if (page.title === 'Workouts') {
          page.count = workouts.length;
        } else if (page.title === 'Exercises') {
          page.count = exercises.length;
        } else if (page.title === 'Categories') {
          page.count = categories.length;
        } else if (page.title === 'Trainers') {
          page.count = trainers.length;
        }
      });
    });
  }

  onOfflineStatus() {
    this.offlineService.setStatus(this.offline);
  }

  logout() {
    this.userService.logout().then(() => this.router.navigateByUrl('/login'));
  }

  openTutorial() {
    this.menu.enable(false);
    this.storage.set('ion_did_tutorial', false);
    this.router.navigateByUrl('/tutorial');
  }

  ngOnDestroy() {
    if (this.offlineSubscription) {
      this.offlineSubscription.unsubscribe();
    }
    if (this.swUpdateSubscription) {
      this.swUpdateSubscription.unsubscribe();
    }
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
