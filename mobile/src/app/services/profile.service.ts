import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication/authentication.service';
import { Profile } from '../models/profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private profile: Observable<Profile>;
  private profileDoc: AngularFirestoreDocument<Profile>;

  // private publishedProfile: Observable<Profile[]>;
  // private publishedProfileColl: AngularFirestoreCollection<Profile>;

  private publishProfileDoc: AngularFirestoreDocument<Profile>;


  constructor(
    private db: AngularFirestore,
    private afAuth: AngularFireAuth,
    private authService: AuthenticationService) {

  }


  getProfile() {
    const userId = this.authService.GetCurrentUser().uid;
    this.profileDoc = this.db.collection('users').doc(userId).collection('profiles').doc<Profile>('profile');
    this.profile = this.profileDoc.valueChanges();
    return this.profile;
  }

  // getPubblishedProfile() {
  //   //const userId = this.authService.GetCurrentUser().uid;
  //   this.publishedProfileColl = this.db.collection<Profile>('active_profiles');
  //   this.publishedProfile = this.publishedProfileColl.valueChanges();
  //   return this.publishedProfile;
  // }
  // updateProfile(profile: Profile) {
  //   return this.profileDoc.update(Object.assign({}, profile));
  // }
  deleteProfile(profile) {
    this.profileDoc.delete();
  }
  addProfile(profile: Profile) {
    return this.profileDoc.set(Object.assign({}, profile));
  }

  publishProfile(profile: Profile) {
    const userId = this.authService.GetCurrentUser().uid;
    this.publishProfileDoc = this.db.collection('active_profiles').doc(userId);
    return this.publishProfileDoc.set(Object.assign({}, profile));
  }

  unpublishProfile(profile: Profile) {
    const userId = this.authService.GetCurrentUser().uid;
    this.publishProfileDoc = this.db.collection('active_profiles').doc(userId);
    return this.publishProfileDoc.delete();
  }
}