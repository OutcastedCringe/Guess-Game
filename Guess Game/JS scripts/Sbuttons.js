import musicSide from "./addAPI";
export default class MediaSelection {
    startAPI();
    selector(){ 
    const maidButton = document.getElementById('maidButton');
    maidButton.addEventListener('click', () => { 
      const bandMaid = '0zeTrQ5TA2WSGbxCVjIduu?si=f03f31f288794383'; 
      player
        .pause()
        .then(() => {
          return player.play({
            context_uri: `spotify:playlist:${bandMaid}`,
          });
        })
        .then(() => {
          console.log(`Playing bandMaid with ID: ${bandMaid}`);
        })
        .catch((error) => {
          console.error('Error playing playlist:', error);
        });
    });
  };
}
export  class GamePlayer {
    constructor() {

    }
}