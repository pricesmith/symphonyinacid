var currentParaInd = 0, currentWordInd = 0;

var SCENE_TIMER = 0;
var tactLength = 480;



const Elem = () => randomElem(elements);
const Word = () => randomElem(words);
const Paragraph = () => randomElem(paragraphs);


function onEveryFrame() {

  if( SCENE!=1 && SCENE!=4 && SCENE!=11 ) removeGlitches(0.12);
  if( SCENE==11 ) removeGlitches(0.008);
  if( SCENE>=21 && SCENE<=23 ) removeGlitches(0.1); // additional

  if (SCENE==4) {
    if(chance(0.7)) Elem().setAttribute("decor", 0);
    removeGlitches(0.3);
  }
  else if (SCENE==5) {
    if(elements.length>0) for(let i=0; i<3; i++) Elem().setAttribute("decor", 0);
  }
  else if (SCENE==7) {
    for(let e of elements) {
      if(chance(0.2)) e.parentNode.style.removeProperty("background");
    }
  }
  else if (SCENE==8) {
    let SCENE_PROGRESS = SCENE_TIMER / tactLength;
    let end = elements.length * ( -0.1 + SCENE_PROGRESS * 2.4 );
    if (end > elements.length) end = elements.length;
    for(let i=0; i < end; i++) {
      elements[i].classList.add('selected');
    }
    SCENE_TIMER++;
  }
  else if (SCENE==13) {
    loadMediaPixels();
    for(let e of elements) if(chance(0.62)) e.style.background = colorRGBFromMedia(e);
  }
  else if (SCENE==15) {
    for(let e of elements) if(chance(0.05)) e.style.removeProperty("background");
  }
  else if (SCENE==16) {
    for(let i=0; i<words.length; i++) if(chance(0.14)) words[i].style.removeProperty("background");
  }
  else if (SCENE==17) {
    for(let w of words) {
      if(chance(0.05)) w.classList.add('selected');
      if(chance(0.01)) w.style.removeProperty("background");
    }
  }
  else if (SCENE==18) {
    loadMediaPixels();
    for(let e of elements) if(chance(0.35)) e.style.color = colorRGBFromMedia(e);
  }
  else if (SCENE==20) {
    loadMediaPixels();
    for(let e of elements) if(chance(0.9)) e.style.color = colorRGBFromMedia(e);
  }
  else if (SCENE==21) {
    loadMediaPixels();
    for(let e of elements) if(chance(0.33)) e.style.color = colorRGBFromMedia(e, 1.7, 0.75);
    if(elements.length>0) for(let i=0; i<30; i++) Elem().setAttribute("decor", 0);
    for(let i=0; i<words.length; i++) if(chance(0.4)) words[i].style.removeProperty("background");
  }
  else if (SCENE==22) {
    loadMediaPixels();
    for(let e of elements) if(chance(0.33)) e.style.background = colorRGBFromMedia(e, 1.1, 0.6);
    if(elements.length>0) for(let i=0; i<30; i++) Elem().setAttribute("decor", 0);
    for(let i=0; i<words.length; i++) if(chance(0.4)) words[i].style.removeProperty("background");
  }
  else if (SCENE==23) {
    loadMediaPixels();
    for(let e of elements) if(chance(0.4)) e.style.background = colorRGBFromMedia(e);
    if(elements.length>0) for(let i=0; i<10; i++) Elem().setAttribute("decor", 0);
  }
  else if (SCENE==24) {
    for(let i=0; i<words.length; i++) if(chance(0.01)) words[i].style.removeProperty("background");
    for(let i=0; i<150; i++) {
      let e = Elem();
      e.classList.add('selected');
      e.setAttribute("decor", 0);
    }
  }

}



let midiNames = [ 'SCENE', 'CHORD', 'POWERUP', 'KICK', 'CLAP', 'BASS1', 'BASS2', 'FX', 'DENSE' ];

function react(C, N) {

  N++;

  let midiName = midiNames[C-1];

  let START = C == 1;
  let CHORD = C == 2;
  let POWERUP = C == 3;
  let KICK = C == 4;
  let CLAP = C == 5;
  let BASS = C == 6 || C == 7;
  let BASS1 = C == 6;
  let BASS2 = C == 7;
  let FX = C == 8;
  let DENSE = C == 9;


  // if (!START) console.log(midiName, N);


  if (START) {

    SCENE = N;
    console.log("SCENE", SCENE);    
    container.setAttribute("scene", SCENE);
    container.style.removeProperty("font-size");
    container.style.removeProperty("background");
    SCROLL_SPD = 0;

  }


  // DEVIDED IN SCENES

  if (SCENE==1) {
    if (POWERUP) {
      if (N==1) container.setAttribute("layout", 21);
      if (N==2) container.setAttribute("layout", 22);
      if (N==3) container.setAttribute("layout", 23);
      if (N==4) container.setAttribute("layout", 24);
      if (N==5) container.setAttribute("layout", 25);
      if (N==6) {
        let elem = container.getElementsByClassName('name')[0];
        elem.parentElement.removeChild(elem);
        for(let i=0; i<20; i++) glitchesWord(0);
      }
      if (N==7||N==8) {
        let elem = container.getElementsByClassName('hidden')[0];
        elem.classList.remove('hidden');
      }
    }
    if (FX||(DENSE && N==5)) {
      glitchesWord();
      glitchesWord();
      glitchesWord();
    }
    if (FX||DENSE||BASS) {
      glitchesWord();
    }


  } else if (SCENE==2) {
    if (START) {
      newText();
    }
    if (BASS1) {
    }
    if (BASS) {
      glitchesWords(1);
    }
    if (KICK) {
      randomLayout(21,30);
    }
    if (BASS2) {
      for(let i=0; i<5; i++) Elem().setAttribute("decor", randoml(7));
    }
    if (FX) {
      glitchesChars();
      Elem().setAttribute("glitch", 5);
    }
    if (DENSE) {
    }


  } else if (SCENE==3) {
    if (START) {
      resetStyle();
      currentWordInd = 0;
    }
    if (KICK||START) {
      newText();
      randomBg();
    }
    if (CLAP) {
      randomLayout(0,8);
    }
    if (BASS1) {
      randomBorders(0,4);
    }
    if (BASS2) {
      glitchesWords(1);
    }
    if (DENSE) {
      glitchesChars();
      glitchesChars();
      glitchesChars();
    }
    if (FX) {
      glitchesChars();
    }
    

  } else if (SCENE==4) {
    if (START) {
      newText();
    }
    if (KICK) {
      randomLayout(0,8);
      randomBg();
    }
    if (CLAP) {
      glitchesWords(1);
    }
    if (BASS1) {
      randomBorders(0,4);
    }
    if (BASS2) {
      glitchesWords(1);
    }
    if (DENSE) {
      if(N!=5) for(let i=0; i<4; i++) Elem().setAttribute("decor", randoml(10));
    }
    if (FX) {
      glitchesChars();
    }
    

  } else if (SCENE==5) {
    if (START) {
      resetStyle();
      newText();
    }
    if (KICK) {
      randomLayout(0,8);
      randomBg();
    }
    if (CLAP) {
      glitchesWords(0.3);
    }
    if (BASS1) {
      randomBorders(0,4);
    }
    if (BASS2) {
      glitchesWords(1);
    }
    if (DENSE) {
      if(N==3||N==4) {
        glitchesChars();
        for(let i=0; i<5; i++) Elem().setAttribute("decor", randoml(10));
      }
    }
    if (FX) {
      glitchesChars();
    }
    

  } else if (SCENE==6) {
    if (START) {
      resetStyle();
      newText();
    }
    if (KICK) {
      randomBg();
      randomLayout(0,8);
      for(let i=0; i<20; i++) {
        Elem().style.minWidth = chance(0.4) ? 0 : randoml( chance(0.2) ? vw * 36 : vw * 15 );
      }
    }
    if (CLAP) {
      glitchesWords(0.7);
    }
    if (BASS1) {
      randomBorders(0,4);
    }
    if (BASS2) {
      glitchesWords(1);
    }
    if (DENSE) {
      if(N==3||N==4) {
        Elem().setAttribute("decor", randoml(10));
      }
    }
    if (FX) {
      glitchesChars();
    }
    
    

  } else if (SCENE==7) {
    if (START) {
      newText();
      resetStyle();
    }
    if (CLAP) {
      glitchesWords(0.05);
    }
    if (BASS1) {
      randomLayout(7,9);
    }
    if (BASS2) {

      let d = chance(0.5);
      let r = d ? 10 : 20;

      for(let c=0; c<20; c++) {
        let c = randomColor();
        let n = randoml(r);
        for(let j=0; j<elements.length; j++) {
          if(d) {
            if( j%r==n ) elements[j].parentNode.style.background = c;
          } else {
            if( j>=(r*n) && j<(r*(n+1)) ) elements[j].parentNode.style.background = c;
          }
        }
      }

    }
    if (FX) {
      glitchesWords(random(0.1,0.2));
      glitchesChars();
    }
    if (DENSE) {
      for(let i=0; i<elements.length; i++) if(chance(0.2)) elements[i].setAttribute("decor", chance(0.7) ? 0 : randoml(7));
    }
    if (KICK) {
      randomBg();

      container.style.fontSize = ( 0.5 + random(3) ) * fontSize;

      for(let e of elements) {
        if(chance(0.8)) e.style.minHeight = chance(0.97) ? 0 : randoml( 0.1 * H );
      }

      for(let e of elements) {
        if(chance(0.8)) e.style.minWidth = chance(0.97) ? 0 : randoml( 0.15 * W );
      }


    }
    if (POWERUP) {
      if(N==1) container.style.background = "#777777";
      if(N==2) container.style.background = "#FFFF00";
      if(N==3) container.style.background = "#0000FF";
      if(N==4) container.style.background = "#FF0000";
      if(N==5) container.style.background = "#00FFFF";
      if(N==6) container.style.background = "#FFFFFF";
      if(N==7) container.style.background = "#FFFFFF";
    }
    

  } else if (SCENE==8) {
    if (START) {
      scrollTop();
      resetStyle();
      newText();
      SCROLL_SPD = paragraphs[0].offsetHeight / H * 0.195;
      SCENE_TIMER = 0;
    }
    if (POWERUP) {
      glitchesWords(1);
    }
    if (FX) {
      glitchesChars();
    }
    

  } else if (SCENE==9) {
    if (START) {
      scrollTop();
    }
    if (POWERUP) {
      if (N>=1&&N<=3) {
        newText();
        randomLayout(0,8);
      }
      if (N>=1&&N<=4) {
        randomBorders(0,4);
      }
      if (N==1) { scrollTop(); container.style.background = "#ff0000"; }
      if (N==2) { container.style.background = "#ffff00"; }
      if (N==3) { container.style.background = "#0000ff"; }
      if (N==4) {
        newText(true); 
        randomLayout(0,6);
        container.style.background = "#888888";
        if(container.getAttribute('layout')==4) container.setAttribute('layout', 0);
      }
    }
    if (DENSE) {
      glitchesChars();
      glitchesChars();
      glitchesChars();
      glitchesChars();
      Elem().setAttribute("decor", randoml(7));
    }
    if (FX) {
      glitchesChars();
    }
    

  } else if (SCENE==10) {
    if (START) {
      scrollTop();
      newText();
    }
    if (START||KICK) {
      container.style.width = random(0.25,0.85) * W;
      randomBg();
    }
    if (KICK) {
      glitchesParagraphs(0.3);
    }
    if (FX||START) {
      glitchesWords(0.06);
    }
    if (BASS2) {
      randomLayout(0,8);
      randomBorders(0,4);
    }
    if (DENSE) {
      glitchesWords(0.02);
      if(N==2) {
        glitchesParagraphs(0.2);
      }
    }
    if(POWERUP) {
      container.style.transitionDuration = "4.5s";
      container.style.width = W;
    }
    if (FX) {
      glitchesChars();
    }
    


  } else if (SCENE==11||SCENE==12) {

    if (START) {
      container.style.removeProperty("transition");
      newText();
      scrollTo(0.3);
      if(SCENE==11) {
        container.style.removeProperty("width");
        main.style.removeProperty("background");
      }
      resetStyle();
    }

    if (KICK||START) {

      if (SCENE==12) randomBg();

      let c = randomColor();
      for( let i = 0; i<paragraphs.length; i++) paragraphs[i].style.background = c;

      glitchesWords(0.25);

      let selectionsCount = SCENE == 11 ? 300 : 3;
      for( let i = 0; i<selectionsCount; i++) Paragraph().classList.remove("selected");
      for( let i = 0; i<selectionsCount; i++) Paragraph().classList.add("selected");

      for( let e of elements) e.style.removeProperty("background");

      let w;
      for(let i=0; i<paragraphs.length*0.8; i++) {
        if(SCENE==11) w = (3+randoml(7)) * 0.1 * W;
        if(SCENE==12) w = (3+randoml(5)) * 0.1 * W;
        Paragraph().style.width = w;
      }
    }
    if (KICK) {
      SCROLL_SPD = randomScrollSpd(0.5);
      if(chance(0.3)) randomLayout(0,8); else randomLayout(7,15);
      glitchesParagraphs(0.5);
    }
    if (DENSE) {
      glitchesWords(0.01);
    }
    if (POWERUP) {
      if(N==1) {
        randomBg();
        for( let p of paragraphs) p.style.background = randomColor();
        for( let w of words) if(chance(0.01)) w.style.background = randomColor();
      } else {
        container.style.removeProperty("background");
        for(let w of words) w.style.removeProperty("background");
      }
    }
    if (FX) {
      glitchesWords(0.2);
      glitchesParagraphs(0.2);
      glitchesChars();
    }
    

    

  } else if (SCENE==13) {
    if (START) {
      scrollTop();
      newText();
      currentMedia = 0;
      resetStyle();
    }
    if (START || KICK) {
      randomLayout(7,15);
      for(let i=0; i<50; i++) Elem().style.minWidth = (chance(0.2) ? 6 : (chance(0.2) ? 15 : 1.5 ) ) * fontSize;
      for( let i = 0; i<words.length*0.8; i++) Word().classList.remove("selected");
      for( let i = 0; i<words.length*0.1; i++) Word().classList.add("selected");
    }
    if (BASS) {
      randomBg();
      glitchesChars();
    }
    if (FX) {
      glitchesWords(0.7);
      glitchesChars();
      glitchesChars();
    }
    

  } else if (SCENE==14) {
    if (START) {
      scrollTop();
      clr();
      resetStyle();
      currentParaInd = 0;
      currentWordInd = 0;
    }
    if (KICK||START) {
      insert( printWord( texts[FULL][currentParaInd][currentWordInd] ) );
      elements = list("font");
      container.style.background = randomElem(['#999999','#777777','#aaaaaaa','#cccccc', '#ff0000', '#0000ff', '#ffffff']);
      currentWordInd++;
      if(currentWordInd>=texts[FULL][currentParaInd].length) {
        currentParaInd++;
        currentWordInd=0;
        insert( "<br>" );
      }
      for(let e of elements) e.setAttribute("decor", 0);
    }
    if (FX) {
      glitchesChars();
      for(let i=0; i<2; i++) Elem().setAttribute("decor", randoml(7));
    }
    if (BASS) {
      glitchesWords(0.7);
    }
    if (DENSE) {
      if(N==7) glitchesWords(0.3);
    }
    

  } else if (SCENE==15) {
    if (START) {
      newText();
      container.style.fontSize = 1.6 * fontSize;
    }
    if (BASS) {
      glitchesWords(0.4);
      let c = randomColor();
      for(let e of elements) if(chance(0.2)) e.style.background = c;
    }
    if (POWERUP) {
      if(N==2) glitchesParagraphs(0.4);
    }
    if (BASS2) {
    }
    if (DENSE) {
      randomBg();
      for(let e of elements) {
        if(chance(0.05)) e.style.removeProperty("background");
      }
    }    
    if (FX) {
      glitchesChars();
    }

  } else if (SCENE==16) {
    if (START) {
      newText();
    }
    if (KICK) {
      randomBg();
      for(let i=0; i<40; i++) Elem().setAttribute("decor", randoml(7));
      glitchesChars();
      let c = randomColor();
      let r = random(0.1,0.5);
      for(let i=0; i<words.length; i++) if(chance(r)) words[i].style.background = c;
    }
    if (CLAP) {
      glitchesWords(0.12);
      glitchesChars();
    }
    if (BASS2) {
      glitchesParagraphs(0.35);
    }
    if (FX) {
      glitchesChars();
    }
    if (DENSE) {
    }
    

  } else if (SCENE==17) {
    if (START) {
      newText();
      resetStyle();
      SCROLL_SPD = 8;
    }
    if (KICK) {
      randomColumns();
      randomBg();
    }
    if (POWERUP) {
      SCROLL_SPD = 0;
    }
    if (FX||START) {
      let r = random(0.1,0.9);
      for(let w of words) if(chance(r)) w.style.background = randomColor();
    }
    


  } else if (SCENE==18) {
    if (START) {
      scrollTop();
      newText();
      currentMedia = 2;
      randomBg();
      randomColumns();
      mediaRandomFrame();
    }
    if (KICK) {
      randomBg();
      randomColumns();
      mediaRandomFrame();
    }
    if (BASS) {
      glitchesWords(0.05);
      glitchesParagraphs(0.4);
    }
    if (FX) {
      glitchesChars();
      glitchesChars();
      glitchesChars();
    }
    if (DENSE) {
      let e = Word(); 
      if(e) e.remove();
    }





  } else if (SCENE==19) {
    if (START) {
      randomBg();
      resetStyle();
      newText();
      setTimeout( function() {
        let nth = 2+randomn(8);
        for(let i=0; i<elements.length; i++) {
          elements[i].style.minWidth = (8 * fontSize) * ( i % nth == 0 ? 1.5 : 1 );
        }
      }, 30 );
    }
    if (KICK) {
      randomBg();
      glitchesParagraphs(0.5);
    }
    if (BASS2) {
    }
    if (FX) {
      glitchesWords(0.01);
    }




  } else if (SCENE==20) {
    if (START) {
      currentMedia = 0;
    }
    if (KICK) {
      randomBg();
      let nth = 2+randomn(8);
      for(let i=0; i<elements.length; i++) {
        elements[i].style.minWidth = (8 * fontSize) * ( i % nth == 0 ? 1.5 : 1 );
      }
      randomShortPalette();
    }
    if (BASS2) {
      let c = randomColor();
      let nth = 4+randomn(20);
      for(let i=0; i<elements.length; i++) if(i%nth) elements[i].style.background = c;
    }
    if (FX) {
      glitchesWords(0.08);
    }
    if (DENSE) {
      let nth = 4+randomn(20);
      for(let i=0; i<elements.length; i++) if(i%nth) elements[i].style.removeProperty("background");
    }
    




  } else if (SCENE==21||SCENE==22) {
    if (START) {
      if(SCENE==21) {
        container.style.removeProperty('background');
        resetStyle();
        newText();
        scrollTop();
        currentMedia = 3;
      } else {
        for(let e of elements) e.style.removeProperty('color');
      }
      mediaRandomFrame();
    }
    if (KICK) {
      randomShortPalette();

      let p = random(0.5,0.9);
      if(chance(0.6)) {
        let c = randomColor();
        if(SCENE==21) {
          for(let e of elements) if(chance(p)) e.style.color = c;
        } else {
          for(let e of elements) if(chance(p)) e.style.background = c;
          randomColumns();        
        }
      } else {
        if(SCENE==21) {
          for(let e of elements) if(chance(p)) e.style.color = randomColor();
        } else {
          for(let e of elements) if(chance(p)) e.style.background = randomColor();
          randomColumns();        
        }
      }

      let c = randomColor();
      let r = random(0.4,0.8);
      let pp = random(0.2,0.8);
      for(let i=0; i<words.length; i++) if(chance(r)) words[i].style.background = chance(pp) ? c : randomColor();

      mediaRandomFrame();
    }
    if (BASS) {
      glitchesParagraphs(0.2);
    }
    if (FX) {
      glitchesChars();
      for(let i=0; i<10; i++) Elem().setAttribute("decor", randoml(7));
    }
        

  } else if (SCENE==23) {
    if (START) {
      scrollTop();
      currentMedia = 1;
      newText();
    }
    if (KICK||START) {
      randomColumns();
      mediaRandomFrame();
      randomShortPalette();
      let c = randomColor();
      for(let e of elements) if(chance(0.7)) e.style.background = chance(0.4) ? c : randomColor();
    }
    if (BASS) {
      glitchesParagraphs(0.02);
    }
    if (FX) {
      glitchesWords(0.1);
      glitchesChars();
    }
    if (DENSE) {
      for(let i=0; i<2; i++) Elem().setAttribute("decor", randoml(6));
    }



  } else if (SCENE==24) {
    if (START) {
      container.style.columns = 1;
      let c = randomColor();
      for(let i=0; i<120; i++) Elem().setAttribute("decor", randoml(6));
      for(let e of elements) if(chance(0.9)) e.style.background = chance(0.2) ? c : randomColor();
    }
    if (FX) {
      glitchesChars();
    }




  } else if (SCENE==25) {
    if (START) {
      newText();
      scrollTo(0);
      resetStyle();
    }
    if (POWERUP) {
      if (N==1) {
        elements[0].remove();
      }
    }
    if (FX) {
      glitchesChars();
    }
      

  } else if (SCENE==26) {
    if (START) {
      clr();
      resetStyle();
      body.classList.remove('started');
      body.classList.remove('playing');
      document.getElementById('play').remove();
      document.getElementById('replay').style.display = 'block';
    }
    
  }

}


function randomShortPalette() {
  shortPalette = pickFewOf(palette, 3);  
}

function randomBg() {
  container.style.background = randomColor(container.style.background);
  randomShortPalette();
}

function randomColumns() {
  container.style.columns = findNew( container.style.columns, 1, W>H ? 6 : 4 );
}

function randomLayout(min, max) {
  if (min===undefined) min = 0;
  if (max===undefined) max = 10;
  container.setAttribute("layout", findNew( container.getAttribute("layout"), min, max ) ); 
}

function randomBorders(min, max) {
  if (min===undefined) min = 0;
  if (max===undefined) max = 4;
  container.setAttribute("borders", chance(0.5) ? findNew( container.getAttribute("borders"), min, max ) : 0 );  
}

function toggleClass(elem, classname, test) {
  if(test) elem.classList.add(classname); else elem.classList.remove(classname);
}

function resetStyle() {
  container.setAttribute("layout", 0);
  container.setAttribute("borders", 0);
  container.style.removeProperty('columns');
}

function randomScrollSpd(power) {
  return (chance(0.1) && SCROLL_SPD != 0) ? 0 : ( chance(0.3 + (SCROLL_SPD > 0 ? 0 : 0.7) ) ? 1 : -1 ) * random(power);
}


function addLink(count) {
  let elems = container.querySelectorAll('*[word="1"]');
  if (elems.length>0) {
    for(let i=0; i<count; i++) {
      let e = randomElem( elems );
      e.innerHTML = "<font>" + convertToLink(e.innerText) + "</font>";
    }
  }
}
function convertToLink(text) {
  return `<a href="https://www.google.com/search?q=${text}" target="_blank">${text}</a>`;
}

function perc(p) {
  return p * elements.length;
}


function clearEffects() {
  let e = Elem();
  e.style.minHeight = 0;
  e.style.minWidth = 0;
  e.style.color = "#000000";
  e.style.backgroundColor = "#000000";
  e.setAttribute("decor", 0);
  e.setAttribute("borders", 0);
}


function glitchesChars() {
  if (characters.length>0) {
    let int = randomElem(characters).getAttribute('int');
    let group = container.querySelectorAll(`font[int="${int}"]`);
    let g = chance(0.08) ? 5 : randoml(4);
    for(let e of group) e.setAttribute('glitch', g );
  }
}
function glitchesWords(perc) {
  if(words.length>0) {
    perc *= 2;
    let c = randomColor();
    let g = 1+randoml(3);
    for(let w of words) if (chance(perc)) w.setAttribute('glitch', g);
  }
}
function glitchesWord(n) {
  if(words.length>0) {
    let w = Word();
    w.setAttribute('glitch', n !== undefined ? n : findNew( w.getAttribute('glitch'), 0, 4 ) );
  }
}

function findNew(c, min, max) {
  c = parseInt(c);
  c = (+c === c && c > 0) ? c : 0;
  let result = c;
  while( result == c ) result = min + randoml(max-min);
  return result;
}

function glitchesParagraphs(perc) {
  perc *= 2;
  for(p of paragraphs) {
    if (chance(perc)) {
      let elems = p.querySelectorAll("[word]");
      let g = 1+randoml(3);
      if (elems.length>0) {
        for(let e of elems) e.setAttribute('glitch', g);
      }
    }
  }
}

function removeGlitches(perc) {
  perc *= 2;
  let elems = container.querySelectorAll('[glitch]:not([glitch="0"])');
  if (elems.length>0) {
    for(let e of elems) if (chance(perc)) e.setAttribute('glitch', 0);
  }
}

function scrollPage() {
  if (SCROLL_SPD) window.scroll(0, window.scrollY + SCROLL_SPD * vh);
}

function scrollTop() {
  window.scroll(0,0);
}

function scrollTo(sy) {
  window.scroll(0, body.scrollHeight * sy);
}
