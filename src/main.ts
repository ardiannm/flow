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

function TAB4(num: number) {
  return num
}

function TAB5(num: number) {
  return num
}

function ROUNDUP(num: number, digits: number = 0): number {
  return 0
}

function ROUNDDOWN(num: number, digits: number = 0): number {
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

function MRE4ALTE() {
  if (ALTER1 === 0) {
    ALTE = 0
  } else {
    if (AJAHR < 2006) {
      K = 1
    } else if (AJAHR < 2058) {
      K = AJAHR - 2004
    } else {
      K = 54
    }
    BMG = ZRE4J - ZVBEZJ
    ALTE = ROUNDUP(BMG * TAB4(K))
    HBALTE = TAB5(K)
    if (ALTE > HBALTE) {
      ALTE = HBALTE
    }
  }
}

function MRE4ABZ() {
  ZRE4 = ZRE4J - FVB - ALTE - JLFREIB + JLHINZU
  if (ZRE4 < 0) {
    ZRE4 = 0
  }
  ZRE4VP = ZRE4J
  ZVBEZ = ZVBEZJ - FVB
  if (ZVBEZ < 0) {
    ZVBEZ = 0
  }
}

function MBERECH() {
  MZTABFB()
  VFRB = (ANP + FVB + FVBZ) * 100
  MLSTJAHR()
  WVFRB = (ZVE - GFB) * 100
  if (WVFRB < 0) {
    WVFRB = 0
  }
  LSTJAHR = ST * F
  UPLSTLZZ()
  UPVKVLZZ()
  if (ZKF > 0) {
    ZTABFB = ZTABFB + KFB
    MRE4ABZ()
    MLSTJAHR()
    JBMG = ST * F
  } else {
    JBMG = LSTJAHR
  }
  MSOLZ()
}

MPARA()
MRE4JL()
MRE4()
MRE4ABZ()
MBERECH()

function MZTABFB() {
  ANP = 0
  if (ZVBEZ >= 0) {
    if (ZVBEZ < FVBZ) {
      FVBZ = ZVBEZ
    }
  }
  if (STKL < 6) {
    if (ZVBEZ > 0) {
      if (ZVBEZ - FVBZ < 102) {
        ANP = ROUNDUP(ZVBEZ - FVBZ)
      } else {
        ANP = 102
      }
    }
  } else {
    FVBZ = 0
    FVBZSO = 0
  }
  if (STKL < 6) {
    if (ZRE4 > ZVBEZ) {
      if (ZRE4 - ZVBEZ < 1230) {
        ANP = ROUNDUP(ANP + ZRE4 - ZVBE)
      } else {
        ANP = ANP + 1230
      }
    }
  }
  KZTAB = 1
  if (STKL === 1) {
    SAP = 36
    KFB = ZKF * 9540
  } else if (STKL === 2) {
    EFA = 4260
    SAP = 36
    KFB = ZKF * 9540
  } else if (STKL === 3) {
    KZTAB = 2
    SAP = 36
    KFB = ZKF * 9540
  } else if (STKL === 4) {
    SAP = 36
    KFB = ZKF * 4770
  } else if (STKL === 5) {
    SAP = 36
    KFB = 0
  } else {
    KFB = 0
  }
  ZTABFB = EFA + ANP + SAP + FVBZ
}

function MLSTJAHR() {
  UPEVP()
  ZVE = ZRE4 - ZTABFB - VSP
  UPMLST()
}

function UPLSTLZZ() {
  JW = LSTJAHR * 100
  UPANTEIL()
  LSTLZZ = ANTEIL1
}

function UPVKVLZZ() {
  UPVKV()
  JW = VKV
  UPANTEIL()
  VKVLZZ = ANTEIL1
}

function MSOLZ() {
  SOLZFREI = SOLZFREI * KZTAB
  if (JBMG > SOLZFREI) {
    SOLZJ = ROUNDDOWN((JBMG * 5.5) / 100, 2)
    SOLZMIN = ((JBMG - SOLZFREI) * 11.9) / 100
    if (SOLZMIN < SOLZJ) {
      SOLZJ = SOLZMIN
    }
    JW = SOLZJ * 100
    UPANTEIL()
    SOLZLZZ = ANTEIL1
  } else {
    SOLZLZZ = 0
  }
  if (R > 0) {
    JW = JBMG * 100
    UPANTEIL()
    BK = ANTEIL1
  } else {
    BK = 0
  }
}

function UPEVP() {
  if (KRV === 1) {
    VSP1 = 0
  } else {
    if (ZRE4VP > BBGRV) {
      ZRE4VP = BBGRV
    }
    VSP1 = ZRE4VP * RVSATZAN
  }
  VSP2 = 0.12 * ZRE4VP
  if (STKL === 3) {
    VHB = 3000
  } else {
    VHB = 1900
  }
  if (VSP2 > VHB) {
    VSP2 = VHB
  }
  VSPN = ROUNDUP(VSP1 + VSP2)
  MVSP()
}

function UPMLST() {
  throw new Error("Function not implemented.")
}

function UPANTEIL() {
  throw new Error("Function not implemented.")
}

function UPVKV() {
  throw new Error("Function not implemented.")
}

function MVSP() {
  throw new Error("Function not implemented.")
}
