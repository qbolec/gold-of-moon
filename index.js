var plansza;
var staraPlansza;
var klawisze;

function restart(){
  klawisze={}
  plansza=[
    'Kzlppdpppkppppppkdpdkzzoz5555555555',
    'zzzzppzzzpkzzzzzkzpodzozzzzzz555555',
    'zzzkpzzkzzzkkzzpppppdzzozzzzzpzzzzz',
    'zLpdpppzppzzkzzpkpzzdzzzzzzzzpzzzzz',
    'zzzkpzzkzzzkkzzpppppdzzzzzzzzpzzzzz',
    'kzdppdzzzkzzzzzzkdpdkzzozzzzzpzpppz',
    'zzzzzzzzzzkzzzzzkzpodzozzpppzpzpppz',
    'zzzkzzzkzzzkkzzpppppdzzozpzpzpzpppz',
    'zopdzzzzdzzzkzzpkpzzdzzzzpzpzpzzpzz',
    'zzzzzzzzzzkzzzzzkzpodzozzppzzpzzpzz',
    'zzzkzzzkzzzkkzzpppppdzzozzpppppppzz',
    'zopdzzzzdzzzkzzpkpzzdzzzzzzzzzzzzzz',
    'zzzkzzzkzzzkkzzpppppdzzzzzzzzzzzzzw',
  ].map(s=>s.split(''));
}
restart();

const złoto_księżyca=document.getElementById('złoto_księżyca');

złoto_księżyca.innerHTML=plansza.map(
  w=> '<tr>' + (w.map(c=>'<td></td>').join('')) + '</tr>'
).join('');


function get(w,k){
  return złoto_księżyca.rows[w].cells[k]
}
function setClass(w,k,klasa){
  get(w,k).className=/[_a-z]/i.test(klasa)?klasa:'_'+klasa;
}
function pokaż(plansza){
  plansza.forEach((wiersz,w)=>{
    for(let k=0;k<wiersz.length;++k){
      setClass(w,k,wiersz[k]);
    }
  });
}

pokaż(plansza);

document.body.addEventListener('keydown',(e)=>{
  if(e.repeat || e.key===undefined)return;
  if(e.key=='r')restart();
  if(!(e.key in klawisze)){
    klawisze[e.key]={razy:0}  
  }
  klawisze[e.key].razy += 1;
  klawisze[e.key].wciśnięty=true;
  console.log('down',e.key,klawisze[e.key]);
});
document.body.addEventListener('keyup',(e)=>{
  klawisze[e.key].wciśnięty=false;
  console.log('up',e.key,klawisze[e.key]);
});
function pasuje(wiersz,kolumna,wzor){
  const szerokosc=wzor[0].length;
  const wysokosc=wzor.length;
  for(let w=0;w<wysokosc;++w){
    for(let k=0;k<szerokosc;++k){
      if(staraPlansza[w+wiersz][k+kolumna]!=wzor[w][k]){
        return false;
      }
    }
  }
  return true;
}
function wstaw(wiersz,kolumna,wzor){
  
  const szerokosc=wzor[0].length;
  const wysokosc=wzor.length;
  
  //console.log(`znalazlem ${kolumna} ${wiersz} ${szerokosc} ${wysokosc}`)
  for(let w=0;w<wysokosc;++w){
    const w2=w+wiersz;
    for(let k=0;k<szerokosc;++k){
      const k2=k+kolumna;
      //console.log(`zamieniam ${plansza[w2][k2]} na ${wzor[w][k]}`)
      if(plansza[w2][k2]!=wzor[w][k]){
        plansza[w2][k2]=wzor[w][k];
        staraPlansza[w2][k2]='*';
      }
    }
  }
}
function zamien(stare,nowe){
  const szerokosc=stare[0].length;
  const wysokosc=stare.length;
  for(let w=0;w+wysokosc<=plansza.length;w++){
    for(let k=0;k+szerokosc<=plansza[w].length;++k){
      if(pasuje(w,k,stare)){
        wstaw(w,k,nowe)
      }
    }
  }
}
function użyjZasady(zasada){
  const k=zasada.klawisz;
  if(k === undefined || (k in klawisze && (klawisze[k].wciśnięty || klawisze[k].razy>0))){
    zamien(zasada.przed,zasada.po);
  }
}
function zużyjWciśnięcie(){
  for(k in klawisze){
    if(0<klawisze[k].razy){
      klawisze[k].razy--;
    }
  }
}
function zamienLitere(stara,nowa,t){
  return t.map(napis=> napis.replace(stara,nowa) )
}
function zamienZasady(zasady,stara,nowa,wsad){
  return zasady.map(z=>({
    klawisz:wsad?wsad[z.klawisz]:z.klawisz,
    przed:zamienLitere(stara,nowa,z.przed),
    po:zamienLitere(stara,nowa,z.po),
  }));
}
const zasadyChodzeniaLudzika=[
  {
    klawisz:'ArrowUp',
    przed:[
      '?',
      'L',
    ],
    po:[
      'L',
      'p'
    ]
  },
  {
    klawisz:'ArrowDown',
    przed:[
      'L',
      '?',
    ],
    po:[
      'p',
      'L'
    ]
  },
  {
    klawisz:'ArrowRight',
    przed:[
      'L?',
    ],
    po:[
      'pL',
    ]
  },
  {
    klawisz:'ArrowLeft',
    przed:[
      '?L',
    ],
    po:[
      'Lp',
    ]
  },
];
const zasadyLudzika=[
  ...zamienZasady(zasadyChodzeniaLudzika,'?','p'),
  ...zamienZasady(zasadyChodzeniaLudzika,'?','z'),
  ...zamienZasady(zasadyChodzeniaLudzika,'?','d'),
  {
    klawisz:'ArrowRight',
    przed:[
      'Lkp',
    ],
    po:[
      'pLk',
    ]
  },
  {
    klawisz:'ArrowLeft',
    przed:[
      'pkL',
    ],
    po:[
      'kLp',
    ]
  },
  {
    klawisz:'ArrowUp',
    przed:[
      'w',
      'L',
    ],
    po:[
      'w',
      'p'
    ]
  },
  {
    klawisz:'ArrowDown',
    przed:[
      'L',
      'w',
    ],
    po:[
      'p',
      'w'
    ]
  },
  {
    klawisz:'ArrowRight',
    przed:[
      'Lw',
    ],
    po:[
      'pw',
    ]
  },
  {
    klawisz:'ArrowLeft',
    przed:[
      'wL',
    ],
    po:[
      'wp',
    ]
  },
];
const wsad =  {
  ArrowUp:'w',
  ArrowDown:'s',
  ArrowRight:'d',
  ArrowLeft:'a',
}
const zasadyDrugiegoLudzika=zamienZasady(zasadyLudzika,'L','l',wsad);
const zasadySturlania=[
  {
    przed:[
      '?p',
      '%p',
    ],
    po:[
      'pp',
      '%?',
    ],
  },
  {
    przed:[
      'p?',
      'p%',
    ],
    po:[
      'pp',
      '?%',
    ],
  },
]
const zasadySpadania=[
  {
    przed:[
      '?',
      'p',
    ],
    po:[
      'p',
      '?',
    ],
  },
  ...zamienZasady(zasadySturlania,'%','k'),
  ...zamienZasady(zasadySturlania,'%','d'),
];
const zasadyKamieni =  [
  {
    przed:[
      'k',
      'p',
    ],
    po:[
      'p',
      'K',
    ]
  },
  {
    przed:[
      'K',
      'p',
    ],
    po:[
      'p',
      'K',
    ]
  },
  ...zamienZasady(zasadySpadania,'?','k'),
  {
    przed:['K'],
    po:['k'],
  }
];
const zasadyDiamentów =  [
  ...zamienZasady(zasadySpadania,'?','d'),
];
const smieszneZasady = [
  {
    klawisz:'d',
    przed:["lL"],
    po:["pP"],
  },
  {
    klawisz:'a',
    przed:["Ll"],
    po:["Pp"],
  },
  {
    klawisz:'ArrowLeft',
    przed:["lL"],
    po:["Pp"],
  },
  {
    klawisz:'ArrowRight',
    przed:["Ll"],
    po:["pP"],
  },
  {
    klawisz:'ArrowLeft',
    przed:['pP'],
    po:['Ll'],
  },
  {
    klawisz:'ArrowRight',
    przed:['Pp'],
    po:['lL'],
  },
  {
    klawisz:'a',
    przed:['pP'],
    po:['lL'],
  },
  {
    klawisz:'d',
    przed:['Pp'],
    po:['Ll'],
  },
];
const zasadyChodzeniaPotwora=[
  {
    przed:['?o'],
    po:['Qp'],
  },
  {
    przed:[
      '?',
       'O',
    ],
    po:[
      'o',
      'p',
    ],
  },
  {
    przed:['q?'],
    po:['pO'],
  },
  {
    przed:[
      'Q',
      '?',
    ],
    po:[
      'p',
      'q',
    ],
  },
];
const zasadyPotwora = [
  ...zamienZasady(zasadyChodzeniaPotwora,'?','p'),
  ...zamienZasady(zasadyChodzeniaPotwora,'?','l'),
  ...zamienZasady(zasadyChodzeniaPotwora,'?','L'),
  {
    przed:['o'],
    po:['O'],
  },
  {
    przed:['O'],
    po:['q'],
  },
  {
    przed:['q'],
    po:['Q'],
  },
  {
    przed:['Q'],
    po:['o'],
  },
];
const wody=[1,2,3,4,5];
const max_wody=wody[wody.length-1];
const concat= s=>[].concat.apply([],s);
const zasadySpadaniaWody=[
  ...concat(wody.map(g=>[
    {
      przed:[
        ''+g,
        'p'
      ],
      po:[
        'p',
        ''+g
      ]
    },  
  ])),
  ...concat(wody.map(a=>wody.filter(b=>a<b).map(b=>({
    przed:[
      ''+b,
      ''+a,
    ],
    po:[
      ''+a,
      ''+b,    
    ],
  })))),
];
const zasadyRozlewaniaWody=[
  ...wody.filter(g=>3<=g).map(g=>({
    przed:[
      'p'+g+'p',    
    ],
    po:[
      '1'+(g-2)+'1',    
    ]
  })),
  ...wody.filter(g=>2<=g).map(g=>({
    przed:[
      ''+g+'p',    
    ],
    po:[
      ''+Math.ceil(g/2)+Math.floor(g/2), 
    ]
  })),
  ...wody.filter(g=>2<=g).map(g=>({
    przed:[
      'p'+g,    
    ],
    po:[
      ''+Math.floor(g/2)+Math.ceil(g/2),    
    ]
  })),
  
  // ...wody.filter(g=>1<=g).map(g=>({
  //   przed:[
  //     ''+(g-1||'p')+g+(g+1),    
  //   ],
  //   po:[
  //     ''+g+g+g,    
  //   ]
  // })),
];
const zasadyUsrednianiaWody= [
  ...concat(wody.filter(g=>g%2).map(g=>[
    {
      przed:[''+g+(g+1)],
      po:[''+(g+1)+g],
    },
    {
      przed:[''+g+(g-1)],
      po:[''+(g-1)+g],
    },
  ])),
  ...concat(wody.map(a=>concat(wody.filter(b=>a<b-1||b<a-1).map(b=>([
    {
      przed:[
        ''+a+b,  
      ],
      po:[
        ''+Math.ceil((a+b)/2)+Math.floor((a+b)/2),  
      ]
    },                                                              ]))))),
   // ...wody.filter(g=>g<max_wody).map(g=>({
   //    przed:[''+g+g],
   //    po:[''+(g-1||'p')+(g+1)],
   // })),
  ...concat(wody.reverse().map(a=>concat(wody.filter(b=>a<b-1||b<a-1).map(b=>([    
    {
      przed:[
        ''+a,
        ''+b,  
      ],
      po:[
        ''+Math.floor((a+b)/2), 
        ''+Math.ceil((a+b)/2), 
      ]
    },                                                                ]))))),
];
const zasadyFalowaniaWody=[
  ...wody.filter(g=>g<max_wody).map(g=>({
     przed:[
       ''+g,
       ''+g,
     ],
     po:[
       ''+(g-1||'p'),
       ''+(g+1),
     ],
  })),   
  {
    przed:[
      '1',
      '2',
    ],
    po:[
      'p',
      '3',
    ],
  },
];
const zasadyTryskaniaWody=[
  ...concat(wody.filter(g=>g>1).map(g=>[
    {
      przed:[
        'p',
        ''+g
      ],
      po:[
        '1',
        ''+(g-1),
      ],
    },
  
  ])),
];
const zasadyWody=[
  ...zasadySpadaniaWody,
  ...zasadyRozlewaniaWody,
  ...zasadyUsrednianiaWody,      
  ...zasadyFalowaniaWody,
  ...zasadyTryskaniaWody,
];
const zasady = [
  ...zasadyKamieni,
  ...zasadyDiamentów,
  ...zasadyLudzika,
  ...zasadyDrugiegoLudzika,
  ...smieszneZasady,
  ...zasadyPotwora,
  ...zasadyWody,
];
function skopiujPlanszę(){
  staraPlansza=plansza.map(w=>w.slice());
}
function klatka(){
  skopiujPlanszę();
  zasady.forEach(użyjZasady);
  zużyjWciśnięcie();
  pokaż(plansza)
}
setInterval(klatka,200);


document.getElementById('restart').addEventListener('click',restart);