class RulesEngine {
  constructor() {
    this.rules = [];
  }

  checkRules(playOne, playTwo) {
    if (playOne === playTwo) return "draw";
    const rule = this.rules.find(
      rule => rule.play === playOne && rule.winAgaints === playTwo
    );
    return rule ? rule.play : playTwo;
  }

  addRules(play, winAgaints) {
    this.rules.push({
      play,
      winAgaints
    });
  }
}

export default RulesEngine;
