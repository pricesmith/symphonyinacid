function keyPressed() {

  if(key=="f") toggleFullscreen();

  if(key=='q') randomLayout(0,30);
  if(key=='w') react(4,0);
  if(key=='e') react(5,0);
  if(key=='r') { react(6,0); react(7,0); }
  if(key=='t') { react(8,0); react(9,0); }

  if(key==' ') togglePlay();
  
  if(key=="s") screenshot();
  if(keyCode === UP_ARROW) backToStart();
  if(keyCode === DOWN_ARROW) restartScene();
  if(keyCode === LEFT_ARROW) prevScene();
  if(keyCode === RIGHT_ARROW) nextScene();

}
