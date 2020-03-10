const USERNAME = 'zoltanSzokodi';
const PW = '159753';
const DB = 'MYtineraryDB';
const mongoURI = `mongodb+srv://${USERNAME}:${PW}@mytinerarycluster-9xuye.mongodb.net/${DB}?retryWrites=true&w=majority`;
const JWT_SECRET = 'myDirtyLittleSecret';
// const API_KEY = 'AIzaSyCoI5bJI5x0q_QC01Hj4UA2EV_y6CJuOgM';
const GOOGLE_CLIENT_ID = '527062282965-7nnpdm7497711a9atlbp2ps2gvdl5a0f.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '-UCGkXYSX8dkuPW2b4D2avbN';

module.exports = {
  mongoURI,
  JWT_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET
};