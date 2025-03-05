let AF = 0
let AJAHR = 0
let ALTER1 = 0
let F = 0
let JFREIB = 0
let JHINZU = 0
let JRE4 = 0
let JRE4ENT = 0
let JVBEZ = 0
let KRV = 0
let KVZ = 0
let LZZ = 0
let LZZFREIB = 0
let LZZHINZU = 0
let MBV = 0
let PKPV = 0
let PKV = 0
let PVA = 0
let PVS = 0
let PVZ = 0
let R = 0
let RE4 = 0
let SONSTB = 0
let SONSTENT = 0
let STERBE = 0
let STKL = 0
let VBEZ = 0
let VBEZM = 0
let VBEZS = 0
let VBS = 0
let VJAHR = 0
let ZKF = 0
let ZMVB = 0

// output paramters
let VBEZBSO = 0
let BBGRV = 0
let RVSATZAN = 0
let BBGKVPV = 0
let KVSATZAN = 0
let KVSATZAG = 0
let PVSATZAN = 0
let PVSATZAG = 0
let W1STKL5 = 0
let W2STKL5 = 0
let W3STKL5 = 0
let GFB = 0
let SOLZFREI = 0
let ZRE4J = 0
let ZVBEZJ = 0
let JLFREIB = 0
let JLHINZU = 0
let FVBZ = 0
let FVB = 0
let FVBZSO = 0
let FVBSO = 0
let J = 0
let VBEZB = 0
let HFVB = 0
let HFVBZSO = 0
let HFVBZ = 0
let ALTE = 0
let K = 0
let BMG = 0
let HBALTE = 0
let ZRE4 = 0
let ZRE4VP = 0
let ZVBEZ = 0
let VFRB = 0
let ANP = 0
let WVFRB = 0
let ZVE = 0
let LSTJAHR = 0
let ST = 0
let ZTABFB = 0
let KFB = 0
let JBMG = 0
let ZVBE = 0
let KZTAB = 0
let SAP = 0
let EFA = 0
let VSP = 0
let JW = 0
let LSTLZZ = 0
let ANTEIL1 = 0
let VKV = 0
let VKVLZZ = 0
let SOLZJ = 0
let SOLZMIN = 0
let SOLZLZZ = 0
let BK = 0
let VSP1 = 0
let VSP2 = 0
let VHB = 0
let VSPN = 0
let X = 0
let VSP3 = 0
let ZZX = 0
let ZX = 0
let VERGL = 0
let HOCH = 0
let ST1 = 0
let ST2 = 0
let DIFF = 0
let MIST = 0
let VFRBS1 = 0
let WVFRBO = 0
let VFRBS2 = 0
let SOLZSZVE = 0
let SOLZSBMG = 0

function MPARA() {
  if (KRV < 1) {
    BBGRV = 10
    RVSATZAN = 7
    if (PVS === 1) {
      PVSATZAN = 100
      PVSATZAG = 178
    }
  }
  BBGKVPV = 6
  KVSATZAN = KVZ / 2 / 100 + 0.07
  KVSATZAG = 0.0125 + 0.07
  if (PVS === 1) {
    PVSATZAN = 24
    PVSATZAG = 13
  } else {
    PVSATZAN = 19
    PVSATZAG = 184
  }
  SOLZSZVE = 184
}

MPARA()
