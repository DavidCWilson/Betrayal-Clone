import { Injectable } from '@angular/core';
import { Character } from './character.model';
import { EventCard } from './event-card.model';
import { OmenCard } from './omen-card.model';
import { Haunt } from './haunt.model';
import { Room } from './room.model';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class GameService {
  staticRoomTiles: FirebaseListObservable<any[]>;

  constructor(private database: AngularFireDatabase) {
    this.staticRoomTiles = database.list('stationary-rooms');
  }

  getStaticRoomTiles(){
    return this.staticRoomTiles;
  }

  getRoomTiles(){
    return this.database.object('/rooms/')
  }

  getEventCardById(cardId: number) {
    return this.database.object('/event-cards/' + cardId)
  }

  getOmenCardById(cardId: number) {
    return this.database.object('/omen-cards/' + cardId)
  }

  getRoomTileById(cardId: number) {
    return this.database.object('/rooms/' + cardId)
  }

  getRandomNumber(min: number, max: number): number{
    return (Math.random() * (max - min +1) | 0) + min;
  }

  diceToRoll(num: number){
    var dieRoll: number = 0;
    for(var i=0; i<num; i++){
      dieRoll += this.getRandomNumber(0,2);
    }
    return dieRoll;
  }

  getEventCardEffects(cardId: string){
    var damageDone: any[] = [];
    if(Number(cardId) === 15){
      var roll: number = this.diceToRoll(2);
      if(roll === 4){
        damageDone.push("sanity", 1);
      }
      else if(roll === 3){
        damageDone.push("knowledge", 1);
      }
      else{//NOTE:STREATCH GOOOOAAAALLLS to add mental/physical damage
        damageDone.push("sanity", -1)
      }
      console.log(damageDone);
      return damageDone;
    }
  }

}
