exports.Boss = {
  name: 'Boss',
  primaryKey: 'key',
  properties: {
    id: 'int',
    key: 'string?',
    name: 'string?'
  }
}

exports.BossCount = {
  name: 'BossCount',
  properties: {
    boss: 'Boss',
    count: 'int'
  }
}

exports.Brand = {
  name: 'Brand',
  primaryKey: 'ID',
  properties: {
    ID: 'int',
    name: 'string?',
    image: 'string?',
    frequentSkill: 'Skill'
  }
}

exports.CoopResult = {
  name: 'CoopResult',
  primaryKey: 'jobID',
  properties: {
    bossCounts: 'BossCount[]',
    dangerRate: 'float',
    endTime: 'date?',
    failureReason: 'string?',
    failureWave: 'int',
    grade: 'Grade',
    gradePoint: 'int',
    gradePointDelta: 'int',
    isClear: { type: 'bool', indexed: true },
    jobID: 'int',
    jobRate: 'int',
    jobScore: 'int',
    kumaPoint: 'int',
    myResult: 'Worker',
    otherResults: 'Worker[]',
    playTime: { type: 'date?', indexed: true },
    playerType: 'PlayerType',
    schedule: 'CoopSchedule',
    startTime: 'date?',
    waveDetails: 'WaveDetail[]'
  }
}

exports.CoopSchedule = {
  name: 'CoopSchedule',
  primaryKey: 'startTimeKey',
  properties: {
    endTime: 'date?',
    stage: 'CoopStage',
    startTime: 'date?',
    startTimeKey: 'int',
    weapons: 'CoopWeapon[]'
  }
}

exports.CoopStage = {
  name: 'CoopStage',
  primaryKey: 'name',
  properties: {
    image: 'string?',
    name: 'string?'
  }
}

exports.CoopWeapon = {
  name: 'CoopWeapon',
  primaryKey: 'id',
  properties: {
    id: 'int',
    image: 'string?',
    name: 'string?',
    thumbnail: 'string?'
  }
}

exports.EventType = {
  name: 'EventType',
  primaryKey: 'key',
  properties: {
    key: 'string?',
    name: 'string?'
  }
}

exports.Fes = {
  name: 'Fes',
  properties: {
    ID: 'int',
    myTheme: 'string?',
    myThemeKey: 'string?',
    otherTheme: 'string?',
    otherThemeKey: 'string?',
    myColorR: 'float',
    myColorG: 'float',
    myColorB: 'float',
    otherColorR: 'float',
    otherColorG: 'float',
    otherColorB: 'float',
    mode: 'string?',
    modeKey: 'string?',
    eventType: 'string?',
    eventTypeName: 'string?',
    eventTypeMultilineName: 'string?',
    eventTypeClassName: 'string?',
    contributionPoint: 'int',
    contributionPointTotal: 'int',
    myConsecutiveWin: 'int',
    otherConsecutiveWin: 'int',
    myAnotherName: 'string?',
    otherAnotherName: 'string?',
    uniformBonus: 'float'
  }
}

exports.Game = {
  name: 'Game',
  primaryKey: 'key',
  properties: {
    key: 'string?',
    mode: 'string?',
    rule: 'string?',
    type: { type: 'string?', indexed: true },
    modeKey: { type: 'string?', indexed: true },
    ruleKey: { type: 'string?', indexed: true }
  }
}

exports.Gear = {
  name: 'Gear',
  primaryKey: 'uniqueID',
  properties: {
    uniqueID: 'string?',
    ID: 'int',
    name: 'string?',
    image: 'string?',
    thumbnail: 'string?',
    rarity: 'int',
    kind: 'string?',
    brand: 'Brand'
  }
}

exports.Grade = {
  name: 'Grade',
  primaryKey: 'key',
  properties: {
    id: 'int',
    key: 'string?',
    longName: 'string?',
    name: 'string?'
  }
}

exports.Player = {
  name: 'Player',
  properties: {
    name: 'string?',
    principalID: { type: 'string?', indexed: true },
    rank: { type: 'int', indexed: true },
    udemae: { type: 'int', indexed: true },
    udemaeName: 'string?',
    udemaeIsX: 'bool',
    udemaeIsReached: 'bool',
    isCrown: 'bool',
    sPlusNumber: 'int',
    starRank: 'int',
    kill: { type: 'int', indexed: true },
    death: 'int',
    assist: 'int',
    special: 'int',
    ratio: { type: 'int', indexed: true },
    allKill: { type: 'int', indexed: true },
    allRatio: { type: 'int', indexed: true },
    sortScore: 'int',
    paintPoint: 'int',
    fesGrade: 'int',
    fesGradeName: 'string?',
    style: 'string?',
    species: 'string?',
    weapon: 'Weapon',
    headGear: 'Gear',
    clothesGear: 'Gear',
    shoesGear: 'Gear',
    headSkills: 'Skills',
    clothesSkills: 'Skills',
    shoesSkills: 'Skills'
  }
}

exports.PlayerType = {
  name: 'PlayerType',
  primaryKey: 'key',
  properties: {
    key: 'string?',
    species: 'string?',
    style: 'string?'
  }
}

exports.Result = {
  name: 'Result',
  primaryKey: 'no',
  properties: {
    no: 'int',
    stage: 'Stage',
    game: 'Game',
    player: 'Player',
    startTime: { type: 'date?', indexed: true },
    elapsedTime: 'float',
    win: { type: 'bool', indexed: true },
    udemae: 'int',
    udemaeName: 'string?',
    udemaeIsX: 'bool',
    udemaeIsReached: 'bool',
    sPlusNumber: 'int',
    xRanking: 'int',
    xPower: 'float',
    myCount: 'float',
    otherCount: 'float',
    winMeter: 'float',
    weaponPaintPoint: 'int',
    myMembers: 'Player[]',
    otherMembers: 'Player[]',
    leaguePoint: 'float',
    leagueMaxPoint: 'float',
    leagueTeamEstimatePoint: 'float',
    leagueOtherEstimatePoint: 'float',
    gachiEstimatePower: 'float',
    gachiEstimateXPower: 'float',
    fesPoint: 'int',
    fesPower: 'float',
    fesMaxPower: 'float',
    fesTeamEstimatePower: 'float',
    fesOtherEstimatePower: 'float',
    fes: 'Fes',
    skillLogs: 'SkillLog[]',
    version: 'int',
    rank: 'int',
    starRank: 'int',
    fesGrade: 'int',
    fesGradeName: 'string?'
  }
}

exports.Skill = {
  name: 'Skill',
  primaryKey: 'ID',
  properties: {
    ID: 'int',
    name: 'string?',
    image: 'string?'
  }
}

exports.SkillLog = {
  name: 'SkillLog',
  properties: {
    skill: 'Skill',
    multiply: { type: 'int', indexed: true }
  }
}

exports.Skills = {
  name: 'Skills',
  properties: {
    main: 'Skill',
    subs: 'Skill[]'
  }
}

exports.Special = {
  name: 'Special',
  primaryKey: 'ID',
  properties: {
    ID: 'int',
    name: 'string?',
    imageA: 'string?',
    imageB: 'string?'
  }
}

exports.Stage = {
  name: 'Stage',
  primaryKey: 'ID',
  properties: {
    ID: 'int',
    name: 'string?',
    image: 'string?'
  }
}

exports.SubWeapon = {
  name: 'SubWeapon',
  primaryKey: 'ID',
  properties: {
    ID: 'int',
    name: 'string?',
    imageA: 'string?',
    imageB: 'string?'
  }
}

exports.WaterLevel = {
  name: 'WaterLevel',
  primaryKey: 'key',
  properties: {
    key: 'string?',
    name: 'string?'
  }
}

exports.WaveDetail = {
  name: 'WaveDetail',
  properties: {
    eventType: 'EventType',
    goldenIkuraNum: 'int',
    goldenIkuraPopNum: 'int',
    ikuraNum: 'int',
    quotaNum: 'int',
    waterLevel: 'WaterLevel'
  }
}

exports.Weapon = {
  name: 'Weapon',
  primaryKey: 'ID',
  properties: {
    ID: 'int',
    name: 'string?',
    image: 'string?',
    thumbnail: 'string?',
    special: 'Special',
    sub: 'SubWeapon'
  }
}

exports.Worker = {
  name: 'Worker',
  properties: {
    bossKillCounts: 'BossCount[]',
    deadCount: 'int',
    goldenIkuraNum: { type: 'int', indexed: true },
    helpCount: { type: 'int', indexed: true },
    ikuraNum: 'int',
    name: 'string?',
    pid: { type: 'string?', indexed: true },
    special: 'Special',
    specialCount0: 'int',
    specialCount1: 'int',
    specialCount2: 'int',
    weaponList: 'CoopWeapon[]'
  }
}

