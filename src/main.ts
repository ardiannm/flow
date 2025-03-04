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

function ROUND(num: number): number {
  return 0
}

function ABS(num: number): number {
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
  if (ZVE < 1) {
    ZVE = 0
    X = 0
  } else {
    X = ROUNDDOWN(ZVE / KZTAB)
  }
  if (STKL < 5) {
    UPTAB24()
  } else {
    MST5_6()
  }
}

function UPANTEIL() {
  if (LZZ === 1) {
    ANTEIL1 = JW
  } else if (LZZ === 2) {
    ANTEIL1 = ROUND(JW / 12)
  } else if (LZZ === 3) {
    ANTEIL1 = ROUND((JW * 7) / 360)
  } else {
    ANTEIL1 = ROUND(JW / 360)
  }
}

function UPVKV() {
  if (PKV > 0) {
    if (VSP2 > VSP3) {
      VKV = VSP2 * 100
    } else {
      VKV = VSP3 * 100
    }
  } else {
    VKV = 0
  }
}

function MVSP() {
  if (ZRE4VP > BBGKVPV) {
    ZRE4VP = BBGKVPV
  }
  if (PKV > 0) {
    if (STKL === 6) {
      VSP3 = 0
    } else {
      VSP3 = (PKPV * 12) / 100
      if (PKV === 2) {
        VSP3 = VSP3 - ZRE4VP * (KVSATZAG + PVSATZAG)
      }
    }
  } else {
    VSP3 = ZRE4VP * (KVSATZAN + PVSATZAN)
  }
  VSP = ROUNDUP(VSP3 + VSP1)
}

let Y = 0
let RW = 0

function UPTAB24() {
  if (X < GFB + 1) {
    ST = 0
  } else if (X < 17006) {
    Y = (X - GFB) / 10000
    RW = Y * 954.8
    RW = RW + 1400
    ST = ROUNDDOWN(RW * Y)
  } else if (X < 66761) {
    Y = (X - 17005) / 10000
    RW = Y * 181.19
    RW = RW + 2397
    RW = RW * Y
    ST = ROUNDDOWN(RW + 991.21)
  } else if (X < 277826) {
    ST = ROUNDDOWN(X * 0.42 - 10636.31)
  } else {
    ST = ROUNDDOWN(X * 0.45 - 18971.06)
  }
  ST = ST * KZTAB
}

function MST5_6() {
  ZZX = X
  if (ZZX > W2STKL5) {
    ZX = W2STKL5
    UP5_6()
    if (ZZX > W3STKL5) {
      ST = ROUNDDOWN(ST + (W3STKL5 - W2STKL5) * 0.42)
      ST = ROUNDDOWN(ST + (ZZX - W3STKL5) * 0.45)
    } else {
      ST = ROUNDDOWN(ST + (ZZX - W2STKL5) * 0.42)
    }
  } else {
    ZX = ZZX
    UP5_6()
    if (ZZX > W1STKL5) {
      VERGL = ST
      ZX = W1STKL5
      UP5_6()
      HOCH = ROUNDDOWN(ST + (ZZX - W1STKL5) * 0.42)
      if (HOCH < VERGL) {
        ST = HOCH
      } else {
        ST = VERGL
      }
    }
  }
}

function UP5_6() {
  X = ZX * 1.25
  UPTAB24()
  ST1 = ST
  X = ZX * 0.75
  UPTAB24()
  ST2 = ST
  DIFF = (ST1 - ST2) * 2
  MIST = ROUNDDOWN(ZX * 0.14)
  if (MIST > DIFF) {
    ST = MIST
  } else {
    ST = DIFF
  }
}

let VKVSONST = 0
let LSTSO = 0
let STS = 0
let SOLZS = 0
let BKS = 0
let WVFRBM = 0
let LSTOSO = 0

function MSONST() {
  LZZ = 1
  if (ZMVB === 0) {
    ZMVB = 12
  }
  if (SONSTB === 0 && MBV === 0) {
    VKVSONST = 0
    LSTSO = 0
    STS = 0
    SOLZS = 0
    BKS = 0
  } else {
    MOSONST()
    UPVKV()
    VKVSONST = VKV
    ZRE4J = (JRE4 + SONSTB) / 100
    ZVBEZJ = (JVBEZ + VBS) / 100
    VBEZBSO = STERBE
    MRE4SONST()
    MLSTJAHR()
    WVFRBM = (ZVE - GFB) * 100
    if (WVFRBM < 0) {
      WVFRBM = 0
    }
    UPVKV()
    VKVSONST = VKV - VKVSONST
    LSTSO = ST * 100
    STS = (LSTSO - LSTOSO) * F
    if (STS < 0) {
      STS = -ROUNDDOWN(ABS(STS))
    } else {
      STS = ROUNDDOWN(ABS(STS))
    }
    STSMIN()
  }
}

function MOSONST() {
  ZRE4J = JRE4 / 100
  ZVBEZJ = JVBEZ / 100
  JLFREIB = JFREIB / 100
  JLHINZU = JHINZU / 100
  MRE4()
  MRE4ABZ()
  ZRE4VP = ZRE4VP - JRE4ENT / 100
  MZTABFB()
  VFRBS1 = (ANP + FVB + FVBZ) * 100
  MLSTJAHR()
  WVFRBO = (ZVE - GFB) * 100
  if (WVFRBO < 0) {
    WVFRBO = 0
  }
  LSTOSO = ST * 100
}

function MRE4SONST() {
  MRE4()
  FVB = FVBSO
  MRE4ABZ()
  ZRE4VP = ZRE4VP + MBV / 100 - JRE4ENT / 100 - SONSTENT / 100
  FVBZ = FVBZSO
  MZTABFB()
  VFRBS2 = (ANP + FVB + FVBZ) * 100 - VFRBS1
}

function STSMIN() {
  if (STS < 0) {
    if (MBV === 0) {
    } else {
      LSTLZZ = LSTLZZ + STS
      if (LSTLZZ < 0) {
        LSTLZZ = 0
      }
      SOLZLZZ = ROUNDDOWN(SOLZLZZ + (STS * 5.5) / 100, 2)
      if (SOLZLZZ < 0) {
        SOLZLZZ = 0
      }
      BK = BK + STS
      if (BK < 0) {
        BK = 0
      }
    }
    STS = 0
    SOLZS = 0
  } else {
    MSOLZSTS()
  }
  if (R > 0) {
    BKS = STS
  } else {
    BKS = 0
  }
}

function MSOLZSTS() {
  if (ZKF > 0) {
    SOLZSZVE = ZVE - KFB
  } else {
    SOLZSZVE = ZVE
  }
  if (SOLZSZVE < 1) {
    SOLZSZVE = 0
    X = 0
  } else {
    X = ROUNDDOWN(SOLZSZVE / KZTAB)
  }
  if (STKL < 5) {
    UPTAB24()
  } else {
    MST5_6()
  }
  SOLZSBMG = ROUNDDOWN(ST * F)
  if (SOLZSBMG > SOLZFREI) {
    SOLZS = ROUNDDOWN((STS * 5.5) / 100, 2)
  } else {
    SOLZS = 0
  }
}

// Zuweisung von Werten für bestimmte Sozialversicherungsparameter
MPARA()

// Ermittlung des Jahresarbeitslohns nach § 39b Absatz 2 Satz 2 EStG
MRE4JL()

VBEZBSO = 0

// Ermittlung der Freibeträge nach § 39b Absatz 2 Satz 3 EStG
MRE4()

// Abzug der Freibeträge nach § 39b Absatz 2 Satz 3 und 4 EStG vom Jahresarbeitslohn
MRE4ABZ()

// Ermittlung der Jahreslohnsteuer auf laufende Bezüge
MBERECH()

// Berechnung sonstiger Bezüge ohne Vergütung für mehrjährige Tätigkeit
MSONST()
