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

function MRE4JL() {
  if (LZZ === 1) {
    ZRE4J = RE4 / 100
    ZVBEZJ = VBEZ / 100
    JLFREIB = LZZFREIB / 100
    JLHINZU = LZZHINZU / 100
  } else if (LZZ === 2) {
    ZRE4J = (RE4 * 12) / 100
    ZVBEZJ = (VBEZ * 12) / 100
    JLFREIB = (LZZFREIB * 12) / 100
    JLHINZU = (LZZHINZU * 12) / 100
  } else if (LZZ === 3) {
    ZRE4J = (RE4 * 360) / 7 / 100
    ZVBEZJ = (VBEZ * 360) / 7 / 100
    JLFREIB = (LZZFREIB * 360) / 7 / 100
    JLHINZU = (LZZHINZU * 360) / 7 / 100
  } else {
    ZRE4J = (RE4 * 360) / 100
    ZVBEZJ = (VBEZ * 360) / 100
    JLFREIB = (LZZFREIB * 360) / 100
    JLHINZU = (LZZHINZU * 360) / 100
  }
  if (AF === 0) {
    F = 1
  }
}

function TAB1(num: number) {
  return num
}

function TAB2(num: number) {
  return num
}

function TAB3(num: number) {
  return num
}

function ROUNDUP(num: number, digits: number = 0): number {
  return 0
}

function MRE4() {
  if (ZVBEZJ === 0) {
    FVBZ = 0
    FVB = 0
    FVBZSO = 0
    FVBSO = 0
  } else {
    if (VJAHR < 2006) {
      J = 1
    } else if (VJAHR < 2058) {
      J = VJAHR - 2004
    } else {
      J = 54
    }
    if (LZZ === 1) {
      VBEZB = VBEZM * ZMVB + VBEZS
      HFVB = ROUNDUP((TAB2(J) / 12) * ZMVB)
      FVBZ = ROUNDUP((TAB3(J) / 12) * ZMVB)
    } else {
      VBEZB = VBEZM * 12 + VBEZS
      HFVB = TAB2(J)
      FVBZ = TAB3(J)
    }
    FVB = ROUNDUP((VBEZB * TAB1(J)) / 100, 2)
    if (FVB > HFVB) {
      FVB = HFVB
    }
    if (FVB > ZVBEZJ) {
      FVB = ZVBEZJ
    }
    FVBSO = ROUNDUP(FVB + (VBEZBSO * TAB1(J)) / 100, 2)
    if (FVBSO > TAB2(J)) {
      FVBSO = TAB2(J)
    }
    HFVBZSO = (VBEZB + VBEZBSO) / 100 - FVBSO
    FVBZSO = ROUNDUP(FVBZ + VBEZBSO / 100)
    if (FVBZSO > HFVBZSO) {
      FVBZSO = ROUNDUP(HFVBZSO)
    }
    if (FVBZSO > TAB3(J)) {
      FVBZSO = TAB3(J)
    }
    HFVBZ = VBEZB / 100 - FVB
    if (FVBZ > HFVBZ) {
      FVBZ = ROUNDUP(HFVBZ)
    }
  }
  MRE4ALTE()
}

function MRE4ALTE() {}

MPARA()
MRE4JL()
MRE4()
