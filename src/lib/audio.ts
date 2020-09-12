interface sound_storage {
  [index: string]: HTMLAudioElement
}

export class audio {
  sounds: sound_storage = {};
  add(name: string, s: string) {
    this.sounds[name] = new Audio(s);
  }
  load() {
    let keys = Object.keys(this.sounds);
    let promises = keys.map((key) => {
      return new Promise((resolve, reject) => {
        this.sounds[key].addEventListener("canplaythrough", (e) => {
          resolve();
        })
      })
    })
    return Promise.all(promises);
  }
  play(name:string,volume:number){
    let a = this.sounds[name];
    a.pause()
    a.currentTime = 0;
    a.volume = volume;
    a.play();
  }
}