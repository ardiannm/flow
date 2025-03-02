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

function MPARA() {
  if (KRV < 1) {
    BBGRV = 96600
    RVSATZAN = 0.093
  }
  BBGKVPV = 66150
  KVSATZAN = KVZ / 2 / 100 + 0.07
  KVSATZAG = 0.0125 + 0.07
  if (PVS === 1) {
    PVSATZAN = 0.023
    PVSATZAG = 0.013
    if (PVS === KRV) {
      PVSATZAG = 0.013
    }
  } else {
    PVSATZAN = 0.018
    PVSATZAG = 0.018
  }
  if (PVZ === 1) {
    PVSATZAN = PVSATZAN + 0.006
  } else {
    PVSATZAN = PVSATZAN - PVA * 0.0025
  }
  W1STKL5 = 13432
  W2STKL5 = 33380
  W3STKL5 = 222260
  GFB = 11784
  SOLZFREI = 18130
}
